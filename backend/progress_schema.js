const mongoose = require('mongoose');

const progress = new mongoose.Schema({
    event:{type:String},
    list:[{}]
})

const pro = mongoose.model('progress', progress);
module.exports = pro;