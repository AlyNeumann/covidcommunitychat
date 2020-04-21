const moment = require('moment');
const Message = require('../model/Message');
const Chat = require('../model/Chat');


function formatMessage(username, message) {

    //its all getting here
    console.log(username, message)
    return {
        username: username,
        text: message,
        time: moment().format('h:mm:a')
    }
}

function addMessage(message, user, viewedUser, roomId) {
    // console.log('from message')
    // console.log(message, roomId)
    const newMessage = new Message({ text: message, to: viewedUser.name, from: user.name, chatId: roomId })
    newMessage.save().then(add => {
        console.log(add)
        //this is to push the new id ref to the User object 
        Chat.updateOne({ id: roomId }, { $push: { messages: add } }).then(result => {
            // console.log(result);
            // res.status(200).json({ message: 'New message added, niiiiiice' })

        })
    })
}

module.exports = {
    formatMessage,
    addMessage
};

    //mongo object try REDIS to cache messages and send all together
