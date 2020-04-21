const Messages = require('../model/Message');

//to get all past messages for chat
//TODO: populate messages once you get the chat back
exports.getPastMessages = async (req, res) => {
    console.log('body for past chat request')
    console.log(req.body)
    const id = req.body.id
    const pagination = 10;
    const page = req.body.page;
    try {
        const chatMessages = await Messages.find({ chatId: id })
            .sort({ created : -1 })
            .skip((page - 1) * pagination)
            .limit(pagination)

        if (!chatMessages) {
            res.status(200).json({ msg: "No chat history with this user" })
        } else {
            const chatRev = chatMessages.reverse()
            res.status(200).json(chatRev)
            
            console.log('past chat from data base', chatMessages)
        }
    } catch (err) {
        console.log(err)
    }

    // message -> Chatroom id
    // when you load the messages you do
    // const Message = require('../model/Message');
    // Message.find({Chatroom})

}
