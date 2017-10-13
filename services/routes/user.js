module.exports = function (router) {

    let usersDir = __dirname + '/../data/users',
        fs = require('fs'),
        mongoose = require('mongoose'),
        config = require('./../config/database');

    let Dashboard = require('./../models/Dashboard');

    mongoose.connect(config.database, config.options);

    let db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("connected to mongo database");
    });


    router.post('/user/create/:userid', function (req, res) {
        let userDir = usersDir + '/' + req.params.userid;
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
        }
    });


/// OPENSTACK DATA
    router.get('/user/dashboard/openstack/:userid/:show', function (req, res) {
        let search_key = req.param('search');

        Dashboard.find({user:req.params.userid, show: req.params.show},function(err, ebooks) {
            if (err)
                res.send(err);

            res.json(ebooks);
        });
        // let userDir = usersDir + '/' + req.params.userid;
        // fs.readFile(userDir + '/openstack.json', 'utf8', function readFileCallback(err, data) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         res.send(data);
        //     }
        // });
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