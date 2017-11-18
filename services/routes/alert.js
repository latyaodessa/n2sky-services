module.exports = function (router) {

    let request = require('request');

    // const PROD_HOST = "131.130.37.20";
    const PROD_HOST = "192.168.0.228";

    router.get('/alerts', function (req, res) {
        let endpoint = "http://" + PROD_HOST + ':9093/api/v1/alerts';
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