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

function addMessage(message, roomId, user, viewedUser) {
    console.log('from message')
    console.log(message, roomId)
    const newMessage = new Message({ text: message, to: user.name, from: viewedUser.name })
    newMessage.save().then(add => {
        console.log(add)
        //this is to push the new id ref to the User object 
        Chat.updateOne({ id: roomId }, { $push: { messages: add } }).then(result => {
            // console.log(result);
            // res.status(200).json({ message: 'New message added, niiiiiice' })

        })
    })
}

// //find the chat room & get its messages
// async function getMessages(){
//     //needs chatroom id
//     const chat = await Chat.find({_id: id})
//     //question about _id in schema... 
//     .populate("messages", "_id text created")
//     if (!chat) {
        
//     } else {
       
//     }
// }

module.exports = {
    formatMessage,
    addMessage
};

    //mongo object try REDIS to cache messages and send all together
