let express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    Promise = require('promise'),
    fs = require('fs'),
    jsonfile = require('jsonfile'),
    OSWrap = require('openstack-wrapper'),
    keystone = new OSWrap.Keystone('http://131.130.37.20/identity/v3'),
    monitoring = require('./monitoring/monitoring');

let usersDir = __dirname + '/data/users';

let app = express();
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

let router = express.Router();
app.use('/api', router);


let user = 'admin';
const HOST = 'http://131.130.37.20/';

let getToken = function getToken() {
    return new Promise((res, rej) => {
        keystone.getToken(user, 'password', function (error, token) {
            if (error) return rej(error);
            return res(token.token);
        });
    });
};

let getProjectToken = function getProjectToken(projectId) {
    return new Promise((res, rej) => {
        getToken().then(token => {
            keystone.getProjectToken(token, projectId, function (error, project_token) {
                if (error) return rej(error);
                res(project_token.token);
            })
        })
    });
};


router.get('/projects', function (req, res) {

    getToken().then(token => {
        let options = {
            url: HOST + 'identity/v3/auth/projects',
            headers: {
                'X-Auth-Token': token,
            }
        };
        request(options, function (er, response, body) {
            res.send(body);
        });
    })
        .catch(err => {
            res.send(err);
        })
});


router.get('/flavors/:id', function (req, res) {
    getProjectToken(req.params.id).then(token => {
        let options = {
            url: HOST + 'compute/v2.1/flavors/detail',
            headers: {
                'X-Auth-Token': token,
            }
        };
        request(options, function (er, response, body) {
            res.send(body);
        });
    })
        .catch(err => {
            res.send(err);
        })
});

router.get('/servers/:id', function (req, res) {
    getProjectToken(req.params.id).then(token => {
        let options = {
            url: HOST + 'compute/v2.1/servers/detail',
            headers: {
                'X-Auth-Token': token,
            }
        };
        request(options, function (er, response, body) {
            res.send(body);
        });
    })
        .catch(err => {
            res.send(err);
        })
});


router.get('/projects/:id', function (req, res) {

    getToken().then(token => {
        keystone.getProjectToken(token, req.params.id, function(error, project_token){
            if(error) res.send(error);

            res.send(project_token);
        })
    })
        .catch(err => {
            res.send(err);
        })
});



///// USER

router.post('/user/create/:userid', function (req, res) {
    let userDir = usersDir + '/' + req.params.userid;
    if (!fs.existsSync(userDir)){
        fs.mkdirSync(userDir);
    }
});


/// OPENSTACK DATA
router.get('/user/dashboard/openstack/:userid', function (req, res) {
    let userDir = usersDir + '/' + req.params.userid;
    fs.readFile(userDir + '/openstack.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            res.send(data);
            // obj = JSON.parse(data); //now it an object
            // obj.table.push({id: 2, square:3}); //add some data
            // json = JSON.stringify(obj); //convert it back to json
            // fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back
        }});
});

router.post('/user/dashboard/openstack/:userid', function (req, res) {
    let userDir = usersDir + '/' + req.params.userid;

    let json = JSON.stringify(metrics);

    fs.writeFile(userDir + '/openstack.json', json, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        res.send(null);
    });
});

router.put('/user/dashboard/openstack/:userid', function (req, res) {
    let userDir = usersDir + '/' + req.params.userid;
    let openStackPath = userDir + '/openstack.json';

    fs.readFile(openStackPath, 'utf8', function readFileCallback(err, data) {
        if (!err) {
            let metrics = JSON.parse(data);
            let isExist = false;
            for (let m = 0; m < metrics.length; m++) {
                if (metrics[m].metric === req.body.metric) {
                    metrics[m] = req.body;
                    isExist = true;
                }
            }
            if (!isExist) {
                metrics.push(req.body);
            }
            let json = JSON.stringify(metrics);
            fs.writeFile(openStackPath, json, 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
    res.send(null);
});

router.delete('/user/dashboard/openstack/:userid/:metric', function (req, res) {
    let userDir = usersDir + '/' + req.params.userid;
    let openStackPath = userDir + '/openstack.json';

    fs.readFile(openStackPath, 'utf8', function readFileCallback(err, data) {
        if (!err) {
            let metrics = JSON.parse(data);
            for (let m = 0; m < metrics.length; m++) {
                if (metrics[m].metric === req.params.metric) {
                    metrics.splice(m);
                }
            }
            let json = JSON.stringify(metrics);
            fs.writeFile(openStackPath, json, 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
    res.send(null);
});



//// MONITORING


router.get('/monitoring/:query/:minus/:type/:step', function (req, res) {

    let monitoring_host = 'http://localhost:9090/api/v1/query_range?query=';
    let formatted = monitoring.currentTimeStemp();
    let minusMinutes = monitoring.currentStampMinusTime(req.params.minus, req.params.type);

    let endpoint = monitoring_host + req.params.query + '&start=' + minusMinutes + '&end=' + formatted + '&step=' + req.params.step;

    let options = {
        url: endpoint,
        headers: {
            'Content-Type': 'application/json',
        }
    };


    request(options, function (er, response, body) {
        res.send(JSON.parse(body).data.result);
    })

});

router.get('/monitoring/metrics', function (req, res) {
    let endpoint = 'http://localhost:9090/api/v1/label/__name__/values'
    let options = {
        url: endpoint,
        headers: {
            'Content-Type': 'application/json',
        }
    };


    request(options, function (er, response, body) {
        res.send(JSON.parse(body).data);
    })
});


app.listen(9091);
console.log("running n2sky services on 9091");