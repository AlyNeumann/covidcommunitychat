const mongoose = require('mongoose');

//ALY WROTE THIS YO
const ChatSchema = new mongoose.Schema({
    id: {
        type: Number,
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

// database

// 1. User - > List of Chat
// 2. Need
// 3. message -> 
// 4. Chat -> List message