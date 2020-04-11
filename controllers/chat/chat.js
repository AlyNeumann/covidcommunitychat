//TODO: these need to go inside the socket io functions

const Chat = require('../../model/Chat');
const Message = require('../../model/Message');

exports.getMessage= (req, res) => {
    //getting id, text, & time
    //TODO: destructure info from req
    const io = req.app.get('io');
    var message = new Message({ id, text, time})
    //save to database
    message.save().then(add => {
        //this is to push the new id ref to the User object 
        Chat.updateOne({ _id: req.id }, { $push: { messages: add } }).then(result => {
            // console.log(result);
            res.status(200).json({ message: 'New message added, niiiiiice' })
            io.emit('new message added')
        })
    }).catch(e => res.status(503).json({ error: "YOU FAILED!!!!!" }))
}
exports.getChat= (req, res) => {
    //getting id, messages ref, & time
    //TODO: destructure info from req
    var chat = new Chat({ id, messages, time })
    //save to database
    chat.save().then(result => {
       
            res.status(200).json({ message: 'New chat created, niiiiiice' })

        }).catch(e => res.status(503).json({ error: "YOU FAILED!!!!!" }))
}

exports.getMessages= (req, res) => {
    //needs chatroom id
    const chat = await Chat.find({_id: id})
    //question about _id in schema... 
    .populate("messages", "_id text created")
    if (!chat) {
        res.status(200).json({ msg: "You do not have any chat history with this user" })
    } else {
        res.status(200).json(chat)
    }
}