const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    token: {
        type: String,
    }
    /*,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
    */
})

const events = mongoose.model('event', eventSchema);

module.exports = events;