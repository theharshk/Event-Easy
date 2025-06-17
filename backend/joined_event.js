const mongoose = require('mongoose');

const joined = new mongoose.Schema({
    mail: {
        type: String,
    },
    name:{
        type:String
    },
    phase:{
        type:String
    }
},{ versionKey: false })

const join = mongoose.model('joined', joined);

module.exports = join;