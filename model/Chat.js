const mongoose = require('mongoose');

//ALY WROTE THIS YO
const ChatSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    messages: [{type: mongoose.Schema.ObjectId, ref: 'Message'}],
    created: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
