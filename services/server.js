let express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    fs = require('fs'),
    jsonfile = require('jsonfile');


let app = express();
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    // let allowedOrigins = ['http://131.130.37.20:9594', 'http://localhost:8888/'];
    // let origin = req.headers.origin;
    //
    // if(allowedOrigins.indexOf(origin) > -1){
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

let router = express.Router();
app.use('/api', router);
require('./routes')(router);


app.listen(9595);
console.log("running n2sky services on 9595");