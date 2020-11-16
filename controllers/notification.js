const webpush = require('web-push')
const dotenv = require('dotenv')
const ServiceWorker = require('../model/ServiceWorker');
dotenv.config();
webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

//TODO: SAVE THE USER SUBSCRIPTION TO DATA BASE!!!!
exports.getNotificationSubscribe = async (req, res) => {
    // const subscription = req.body
    console.log('web push request body')

    console.log(req.body)
    const { userId, subscription } = req.body
    const username = "Joel"

    // const id = JSON.stringify(userId)
    console.log('subscription from get notification subscribe')
    console.log(JSON.stringify(subscription))
    console.log('userId from get notification subscribe')
    console.log(userId)

    //save subscription to Subscription Collection object 
    if(userId){
        try {
            const existingSubscription = await ServiceWorker.findOne({ id: userId })
            if (!existingSubscription) {
                const newSW = await new ServiceWorker({ subscription: JSON.stringify(subscription), id: userId })
                newSW.save().then(result => {
                    console.log('that worked!')
                })
                if (!newSW) {
                    res.status(200).json({ msg: "Error: subscription not saved" })
                } else {
                    res.status(200).json({ msg: "Successful" })
                    const payload = JSON.stringify({
                        title: `Hi ${username}`,
                        body: 'Thank you for registering for our notifications!'
                        //not supported yet
                        //   sound: "<URL String>"
                    })
                    console.log('subscription from before 1st push notification')
                    console.log(subscription)
    
                    webpush.sendNotification(subscription, payload)
                        .then(result => console.log(result))
                        .catch(e => console.log(e.stack))
                }
            } else {
                res.status(200).json({ msg: "Existing Subscription in Database" })
                const payload = JSON.stringify({
                    title: `Hi ${username}`,
                    body: 'Welcome back!'
                })
                console.log('existingSubscription')
                const oldSub = JSON.parse(existingSubscription.subscription);
                console.log(oldSub)
                const existingParsed = JSON.stringify(existingSubscription)
                 console.log(existingSubscription)
                

                webpush.sendNotification(oldSub, payload)
                    .then(result => console.log(result))
                    .catch(e => console.log(e.stack))
            }
           
        } catch (error) {
            console.log(error)
        }
    }
  


}

//TODO: call this in front end where we are checking if new messages > last login sending user object
exports.getMessageNotification = async (req, res) => {
  //this functions notifies when user has a new chat message

    //use actions to make a button to link to chat - "actions": "<Array of Strings>",


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