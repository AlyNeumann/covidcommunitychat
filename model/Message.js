const mongoose = require('mongoose');

//ALY WROTE THIS YO
const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    chatId: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;