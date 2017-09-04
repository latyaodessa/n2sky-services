let express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    Promise = require('promise'),
    OSWrap = require('openstack-wrapper'),
    keystone = new OSWrap.Keystone('http://131.130.37.20/identity/v3'),
    monitoring = require('./monitoring/monitoring');

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








//// MONITORING


router.get('/monitoring/:query/:minus/:type/:step', function (req, res) {

    let monitoring_host = 'http://131.130.37.20:9090/api/v1/query_range?query=';
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
        res.send(body);
    })

});




app.listen(9091);
console.log("running n2sky services on 9091");