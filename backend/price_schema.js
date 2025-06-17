const mongoose = require('mongoose');

const price = new mongoose.Schema({
    name:{type:String},
    list:[{}]
})

const pri = mongoose.model('price', price);

module.exports = pri;