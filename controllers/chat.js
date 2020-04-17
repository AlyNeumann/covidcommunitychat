const Chat = require('../model/Chat');

//to get all past messages for chat
//TODO: populate messages once you get the chat back
exports.getPastMessages = async (req, res) => {
    console.log(req.body)
    const id  = req.body.id

    const chat = await Chat.find({ id })
    .populate("messages", "_id text to from created")
    if (!chat) {
        res.status(200).json({ msg: "No chat history with this user" })
    } else {
        res.status(200).json(chat)
    }
}
