const webpush = require('web-push')
const dotenv = require('dotenv')
dotenv.config();
webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

exports.getNotificationSubscribe = async (req, res) => {
    const subscription = req.body
  
    console.log(subscription)
    console.log('user subscribed')
  
    const payload = JSON.stringify({
      title: 'Hello!',
      body: 'It works.',
    })
  
    webpush.sendNotification(subscription, payload)
      .then(result => console.log(result))
      .catch(e => console.log(e.stack))
  
    res.status(200).json({'success': true})

}