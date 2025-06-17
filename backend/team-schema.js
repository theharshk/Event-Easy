const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    event_name: {
        type: String,
        unique:true
    },
    size: {
        type: Number
    },
    user: {
        type: [{id:Number,name:String,mail:String}]
    },
    leader: {
        type: String
    }
},{ versionKey: false })

const eventteam = mongoose.model('eventteam', eventSchema);

module.exports = eventteam;