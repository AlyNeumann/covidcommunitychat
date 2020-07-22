const Messages = require('../model/Message');
const Chat = require('../model/Chat');

//to get all past messages for chat
//TODO: populate messages once you get the chat back
exports.getPastMessages = async (req, res) => {
    console.log('body for past messages request')
    console.log(req.body)
    const id = req.body.id
    const pagination = 10;
    const page = req.body.page;
    try {
        const chatMessages = await Messages.find({ chatId: id })
            .sort({ created: -1 })
            .skip((page - 1) * pagination)
            .limit(pagination)

        if (!chatMessages) {
            res.status(200).json({ msg: "No chat history with this user" })
        } else {
            const chatRev = chatMessages.reverse()
            res.status(200).json(chatRev)

            // console.log('past chat from data base', chatMessages)
        }
    } catch (err) {
        console.log(err)
    }

}

exports.getUserChats = async (req, res) => {
    const { userId } = req.body
    console.log(userId)
    //take the id and filter for any chat.chatIds containing that id
    //send back the "to" & "chat id"
    //TODO: order these by most recent date updated
    try {
        const chats = await Chat.find({ chatIds: userId })
        if (!chats) {
            res.status(200).json({ msg: "No chat history" })
        } else {
            res.status(200).json(chats)

            console.log('past chats', chats)
        }
    } catch (err) {
        console.log(err)
    }
}

exports.getRecentMessage = async (req, res) => {
    const { id } = req.body
    console.log(id)
    //filter to find the id in either id1 or id2
    //returns 5 most recent messages

    try {
        const messages = await Messages.find({  $or: [
            { id1: id },
            { id2: id }
          ]})
            .sort({ created: -1 })
            .limit(5)
        if (messages == []) {
            res.status(200).json({ msg: "No messages" })
        } else {
            // messagesR = messages.reverse()
            res.status(200).json(messages)

            console.log('past messages', messages)
        }
    } catch (err) {
        console.log(err)
    }
}
