const mongoose = require('mongoose');

//ALY WROTE THIS YO
const ServiceWorkerSchema = new mongoose.Schema({
    subscription: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const ServiceWorker = mongoose.model('ServiceWorker', ServiceWorkerSchema);

module.exports = ServiceWorker;