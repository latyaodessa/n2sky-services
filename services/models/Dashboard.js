let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

let Dashboard   = new Schema({
    "user" : String,
    "server": String,
    "metric": String,
    "delay": String,
    "delaytype": String,
    "step": String,
    "steptype": String,
    "violated": Boolean,
    "show": [String]

});
module.exports = mongoose.model('Dashboard', Dashboard);