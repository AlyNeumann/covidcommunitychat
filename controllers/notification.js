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
    // console.log(JSON.stringify(userId))
    ///!!!!WORKING!!!! TODO: add subscription to user database! (what should that look like?)

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
                    //not supported yet
                    //   sound: "<URL String>"
                })
                console.log('existingSubscription')
                const oldSub = JSON.parse(existingSubscription.subscription);
                const oldSubscription = {
                    oldSub
                }
                console.log(oldSubscription)
                //TODO: why doesnt it think this is a valid subscription?
                webpush.sendNotification(oldSubscription, payload)
                    .then(result => console.log(result))
                    .catch(e => console.log(e.stack))
            }
            // const update = await new ServiceWorker({ subscription: JSON.stringify(subscription), id: userId })
            // update.save().then(result => {
            //     console.log('that worked!')
            // })
            // if (!update) {
            //     res.status(200).json({ msg: "Error: subscription not saved" })
            // } else {
            //     res.status(200).json({ msg: "Successful" })
            //     const payload = JSON.stringify({
            //         title: `Hi ${username}`,
            //         body: 'Thank you for registering for our notifications!'
            //         //not supported yet
            //         //   sound: "<URL String>"
            //     })
    
            //     webpush.sendNotification(subscription, payload)
            //         .then(result => console.log(result))
            //         .catch(e => console.log(e.stack))
            // }
        } catch (error) {
            console.log(error)
        }
    }
  


}

//TODO: need to get user id
exports.getMessageNotification = async (req, res) => {
    //TODO: this functions notifies when user has a new chat message
    //TODO: pull user subscription with their user id from ServiceWorker collection
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