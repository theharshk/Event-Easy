const mongoose = require('mongoose');

const prices = new mongoose.Schema({
    name:{type:String},
    list:[{}]
})

const pric = mongoose.model('price_temp', prices);

module.exports = pric;