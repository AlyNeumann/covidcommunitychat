const moment = require('moment');
const Message = require('../model/Message');
const Chat = require('../model/Chat');


function formatMessage(username, message) {

    //its all getting here
    const currentDate = new Date()
    // console.log(currentDate)
    return {
        username: username,
        text: message,
        time: moment(currentDate).format('h:mm:a')
    }
}

function addMessage(message, user, to, roomId, chatIds) {
    // console.log('from message')
    // console.log(message, roomId)
    const id1 = chatIds[0];
    const id2 = chatIds[1];
    //TODO: take id2 and send push notification via service worker
    // use the "to" feild to send who the message is from
    const newMessage = new Message({ text: message, to: to, from: user.name, chatId: roomId, id1: id1, id2: id2 })
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
