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
