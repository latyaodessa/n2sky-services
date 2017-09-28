module.exports = function (router) {

    let usersDir = __dirname + '/../data/users',
        fs = require('fs');

    router.post('/user/create/:userid', function (req, res) {
        let userDir = usersDir + '/' + req.params.userid;
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
        }
    });


/// OPENSTACK DATA
    router.get('/user/dashboard/openstack/:userid', function (req, res) {
        let userDir = usersDir + '/' + req.params.userid;
        fs.readFile(userDir + '/openstack.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.send(data);
                // obj = JSON.parse(data); //now it an object
                // obj.table.push({id: 2, square:3}); //add some data
                // json = JSON.stringify(obj); //convert it back to json
                // fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back
            }
        });
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


};