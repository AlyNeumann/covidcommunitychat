const mongoose = require('mongoose');

//ALY WROTE THIS YO
const ChatSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        min: 30
    },
    messages: [{type: mongoose.Schema.ObjectId, ref: 'Message'}],
    chatIds: {
        type: Array,
        required: true,
    },
    //string or array?
    names: {
        type: Array,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;

