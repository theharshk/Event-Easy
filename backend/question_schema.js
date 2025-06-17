const mongoose = require('mongoose');

const question = new mongoose.Schema({
    event: {
        type: String,
    },
    ques:{
        type:String
    },
    subject:{type:String},
    option:[{}],
    answer:[{}]
},{ versionKey: false })

const ques = mongoose.model('question', question);

module.exports = ques;