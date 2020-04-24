const mongoose = require('mongoose');

//ALY WROTE THIS YO
const ChatSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    messages: [{type: mongoose.Schema.ObjectId, ref: 'Message'}],
    chatIds: {
        type: Array,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;

