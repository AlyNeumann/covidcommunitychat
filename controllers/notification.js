const webpush = require('web-push')
const dotenv = require('dotenv')
dotenv.config();
webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

//TODO: SAVE THE USER SUBSCRIPTION TO DATA BASE!!!!
exports.getNotificationSubscribe = async (req, res) => {
    // const subscription = req.body
    // console.log('web push request body')
    // console.log(req.body)
    console.log(req.body)
    console.log(req.userId)
    // const { _id } = req.user;
   
  
    // console.log(subscription)
    console.log('user subscribed')

    //check if User has subsciption
    //save subscription to User object 

    // const filter = { _id: id};
    // const update = await User.updateOne( filter, { $set: { subscription: subscription } })
    // if (update.nModified == 0) {
    //     res.status(200).json({ msg: "Error: subscription not saved" })
    // } else {
    //     res.status(200).json({ msg: "Successful" })
    // }
    //TODO: wrap this in an if statement checking for new messages
    //call user object 
    //call mesages object
    //filter messages for the user id (limit 5)
    //if message date > last_login, push notification!
  
    // const payload = JSON.stringify({
    //   title: 'Welcome!',
    //   body: 'You have new messages waiting in the chat!'
    //   //not supported yet
    // //   sound: "<URL String>"
    // })
  
    // webpush.sendNotification(subscription, payload)
    //   .then(result => console.log(result))
    //   .catch(e => console.log(e.stack))
  
    res.status(200).json({'success': true})

}

//TODO: need to get user id
exports.getMessageNotification = async (req, res) => {
    //TODO: this functions notifies when user has a new chat message
    //TODO: pull user subscription from their user id
    //use actions to make a button to link to chat - "actions": "<Array of Strings>",

    //call user subscription feild 
    //call user for last_login
    //call messages with user id
    //compare the time of the two and if messages are newer, send push notification!

    
    // const username = req.body.username
    // const subscription = req.body.subscription
    // const { id } = req.body
    // console.log(id)
    //filter to find the id in either id1 or id2
    //returns 5 most recent messages

    // try {
    //     const messages = await Messages.find({  $or: [
    //         { id1: id },
    //         { id2: id }
    //       ]})
    //         .sort({ created: -1 })
    //         .limit(5)
    //     if (messages == []) {
    //         res.status(200).json({ msg: "No messages" })
    //     } else {
    //         // messagesR = messages.reverse()
    //         res.status(200).json(messages)

    //         console.log('past messages', messages)
    //     }
    // } catch (err) {
    //     console.log(err)
    // }

    //   const payload = JSON.stringify({
    //   title: `Hi ${username}`,
    //   body: 'You have new messages waiting in the chat!'
    //   //not supported yet
    // //   sound: "<URL String>"
    // })
  
    // webpush.sendNotification(subscription, payload)
    //   .then(result => console.log(result))
    //   .catch(e => console.log(e.stack))


}