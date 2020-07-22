const webpush = require('web-push')
const dotenv = require('dotenv')
dotenv.config();
webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

exports.getNotificationSubscribe = async (req, res) => {
    const subscription = req.body
    //TODO: get the user name and add it to payload message
    console.log('web push request body')
    console.log(req.body)
   
  
    console.log(subscription)
    console.log('user subscribed')
    //TODO: wrap this in an if statement checking for new messages
  
    const payload = JSON.stringify({
      title: 'Welcome to Covid 19 Community Help!',
      body: 'Thanks for registering for our notifications. \nWe will let you know if you have new messages waiting'
      //not supported yet
    //   sound: "<URL String>"
    })
  
    webpush.sendNotification(subscription, payload)
      .then(result => console.log(result))
      .catch(e => console.log(e.stack))
  
    res.status(200).json({'success': true})

}

exports.getMessageNotification = async (req, res) => {
    //TODO: this functions notifies when user has a new chat message
    //use actions to make a button to link to chat - "actions": "<Array of Strings>",


}