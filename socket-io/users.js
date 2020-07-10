const Chat = require('../model/Chat');
// const Message = require('../model/Message');

const users = [];

//filter for room, if it doesnt exist, create new one
async function joinRoom(roomId, chatIds, names) {
    console.log('names from join room')
    console.log(names)

    //split and reverse id string then check if it exists 
    let halfwayThrough = Math.floor(roomId.length / 2)
    let firstId = roomId.slice(0, halfwayThrough);
    let secondId = roomId.slice(halfwayThrough, roomId.length);

    const ids = [ firstId, secondId ]
    const sortedIds = ids.sort().join('');


    //filter through data base to see if it exists 
    try {
        const chatRoom = await Chat.findOne({ id: sortedIds })
        .populate("messages", "_id text created to from")
    //if the chat does exist, update that one
        if(!chatRoom ){
             //if the chat doesnt exist, create one
            const chat = new Chat({ id: sortedIds, chatIds: chatIds, names: names })
            chat.save().then(result => {
                console.log('that worked!')
            })
        }
        else{
          
            return chatRoom
        }
    } catch (error) {
        console.log(error)
    }
}


//Join user to chat 
async function userJoin(id, username) {
    const user = { id, username };
    users.push(user);
 
    return user;
}


//get current user
function getCurrentUser(id) {
    //connect to database here
    return users.find(user => user.id === id)
}

//user leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

//get room users
function getRoomUsers(room){
    return users.filter(user => user.room === room)
}


module.exports = {
    joinRoom,
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}

