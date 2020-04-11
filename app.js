const express = require('express');
const app = express();
const http = require('http').createServer(app);
const dotenv = require('dotenv')
const io = require('socket.io')(http);
const mongoose = require('mongoose'); // library for mongodb
const formatMessage = require('./socket-io/messages');
const { userJoin, getCurrentUser } = require('./socket-io/users');
dotenv.config();
// const cors = require('cors');

// app.use(cors())

// CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log("Database connection established"))
    .catch(err => console.log(err));


const chatBot = 'Covid-19 Community Help Bot'

io.on('connection', socket => {
    console.log('Connected');

    //join chat room
    socket.on('joinRoom', ({ username, roomId }) => {
        console.log(username, roomId)

        const user = userJoin(socket.id, username, roomId)

        socket.join(user.roomId);
        console.log(user.roomId)

        //welcome message for user
        // const welcome = 'Welcome to the Covid-19 Community Help chat room!'
        socket.emit('message', formatMessage(chatBot, 'welcome'))

        //broadcast when a user connects
        const userConnected = `${user.username} has joined the chat`
        socket.broadcast
            .to(user.roomId)
            .emit('message', formatMessage(chatBot, userConnected))


    })


    //incoming messages from user
    socket.on('message', data => {
        const user = getCurrentUser(socket.id);
        console.log('Incoming Message : ')
        console.log(data)
        //take user _id for each message
        io.to(user.roomId).emit("message", formatMessage(user.username, data.message))
    });



    //disconnect from socket.io
    socket.on('disconnect', function (data) {
        const userDisconnected = "A user has left the chat";
        io.emit('message', formatMessage(chatBot, userDisconnected))
    });
});

http.listen(process.env.PORT, () => {
    console.log('Server listening on port 3000')
});