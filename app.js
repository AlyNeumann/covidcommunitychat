const express = require('express');
const app = express();
const http = require('http').createServer(app);
const dotenv = require('dotenv')
const io = require('socket.io')(http);
const mongoose = require('mongoose'); // library for mongodb
const {
    formatMessage,
    addMessage,
    getMessages
} = require('./socket-io/messages');
const { joinRoom,
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./socket-io/users');
const {getPastMessages} = require('./controllers/chat');
dotenv.config();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log("Database connection established"))
    .catch(err => console.log(err));


const chatBot = 'Covid-19 Community Help Bot'

let currentRoomId = '';
let currentRoom = {};


io
    //TODO: open one io instance, but room id is passed with "join room"
    .on('connection', socket => {
        console.log('Connected');

        socket.on('joinRoom', ({ username, roomId }, callback) => {

           //TODO: error handling
            // const error = false;
            // if(error) {
            //     callback({ error: 'error' })
            // }
            console.log(username)
            //function here to sort roomId, filter rooms or create new room in mongo
            const room = joinRoom(roomId)
            const roomResult = room.then(result => {
                console.log(result)
                currentRoomId = result.id
                currentRoom = result
            })
            userJoin(socket.id, username);
            console.log(currentRoom);

            socket.join(roomResult.id)

            //messages array for new user joining give success message for now
            messagesArr = currentRoom.messages
            return socket.emit('success', ({ messagesArr }))
        })

        //welcome message to user from chatBot
        socket.emit('chatmessage', formatMessage(chatBot, 'welcome'))


        //incoming messages from user
        socket.on('chatmessage', ({ message, user, viewedUser }) => {
            //this is all working
            const username = user.name;
            const addedMessage = addMessage(message, currentRoomId, user, viewedUser)
            console.log(addedMessage)


            socket.emit('chatmessage', formatMessage(username, message))
        });


        //disconnect from socket.io
        socket.on('disconnect', function () {
            const userDisconnected = `user has left the chat`;
            io.emit('chatmessage', formatMessage(chatBot, userDisconnected))

        });
    })

app.post('/pastChat', getPastMessages)


http.listen(process.env.PORT, () => {
    console.log('Server listening on port 3000')
});