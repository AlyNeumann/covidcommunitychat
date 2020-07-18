const express = require('express');
const app = express();
const http = require('http').createServer(app);
const dotenv = require('dotenv')
const io = require('socket.io')(http);
// const webpush = require('web-push')
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
const { getPastMessages, getUserChats, getRecentMessage } = require('./controllers/chat');
const { getNotificationSubscribe } = require('./controllers/notification');
dotenv.config();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CONNECT WEB PUSH NOTIFICATIONS
// webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

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
    // open one io instance, but room id is passed with "join room"
    .on('connection', socket => {
        console.log('Connected');
        // console.log(io);

        socket.on('joinRoom', ({ username, roomId, chatIds, names }, callback) => {
            console.log('joining room now')
            //TODO: error handling
            // const error = false;
            // if(error) {
            //     callback({ error: 'error' })
            // }
            console.log(names)
            //function here to sort roomId, filter rooms or create new room in mongo
            const room = joinRoom(roomId, chatIds, names)
            //TODO: trouble with error handling...
            try{
                const roomResult = room.then(result => {
                    // console.log(result)
                    if(result.id !== undefined){
                        currentRoomId = result.id
                        currentRoom = result
                        userJoin(socket.id, username);
            
                        socket.join(roomResult.id)
                    }
                })
            }catch{err => {console.log(err)}}
          
            //messages array for new user joining give success message for now
            messagesArr = currentRoom.messages
            return socket.emit('success', ({ messagesArr }))
        })

        // //welcome message to user from chatBot
        // socket.emit('chatmessage', formatMessage(chatBot, 'welcome'))


        //incoming messages from user
        socket.on('chatmessage', ({ message, user, roomId, to, chatIdsArr }) => {
            //this is all working
            console.log('chat Ids')
            console.log(chatIdsArr)
            const chatIds = chatIdsArr
            const username = user.name;
            const addedMessage = addMessage(message, user, to, roomId, chatIds)
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
app.post('/userChats', getUserChats)
app.post('/recentMessages', getRecentMessage)
app.post('/notifications/subscribe', getNotificationSubscribe);


http.listen(process.env.PORT, () => {
    console.log('Server listening on port 3001')
});



