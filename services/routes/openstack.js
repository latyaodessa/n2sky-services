module.exports = function (router) {

    let Promise = require('promise'),
        request = require('request'),
        OSWrap = require('openstack-wrapper'),
        keystone = new OSWrap.Keystone('http://131.130.37.20/identity/v3');

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

    router.get('/projects/:id', function (req, res) {

        getToken().then(token => {
            keystone.getProjectToken(token, req.params.id, function (error, project_token) {
                if (error) res.send(error);

                res.send(project_token);
            })
        })
            .catch(err => {
                res.send(err);
            })
    });

    // TODO not working networks

    router.get('/networks', function (req, res) {

        getToken().then(token => {
            let options = {
                url: 'http://131.130.37.20:9696/v2.0/networks',
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


    //IMAGES

    router.get('/images', function (req, res) {

        getToken().then(token => {
            let options = {
                url: HOST + 'image/v2/images',
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

    router.get('/images/image/:id', function (req, res) {

        getToken().then(token => {
            let options = {
                url: HOST + 'image/v2/images/' + req.params.id,
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

    router.get('/images/image/:id/download', function (req, res) {

        getToken().then(token => {
            let options = {
                url: HOST + 'image/v2/images/' + req.params.id + '/file',
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

};
