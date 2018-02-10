module.exports = function (router) {

    let monitoring = require('./../monitoring/monitoring'),
        request = require('request');

    // const PROD_HOST = "131.130.37.20";
    const PROD_HOST = "192.168.0.105";


    router.get('/monitoring/:server/:query/:minus/:type/:step', function (req, res) {

        let monitoring_host = "http://" + req.params.server + ':9090/api/v1/query_range?query=';
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

    router.get('/monitoring/metrics/:host', function (req, res) {
        let host = req.params.host === "openstack" ? PROD_HOST : req.params.host;
        let endpoint = "http://" + host + ':9090/api/v1/label/__name__/values'
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

};