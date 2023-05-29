const redisClient = require("../redis");

module.exports.authorizeUser=(socket,next)=>{
  if (!socket.request.session && !socket.request.session.user) {
    console.log("Bad request");
    next(new Error("Not authorized"));
  } else {
    next();
  }
}



module.exports.initializeUser = async socket => {
    socket.user = { ...socket.request.session.user };
    socket.join(socket.user.userid);
  try{
    
    await redisClient.hSet(
      `userid:${socket.user.username}`,
      "userid",
      socket.user.userId,
      "connected",
      true

    );
  }catch{
    console.log("This error occurs as you fucked the database")
  }
  
    const friendList = await redisClient.lRange(`friend:${socket.user.username}`,0,-1)
  socket.emit("friends",friendList)
};




module.exports.addFriend = async (socket, friendName, callback) => {
  if (friendName == socket.user.username) {
    callback({ done: false, errorMsg: "Cannot add Yourself as a friend " });
    return;
  }

  const friendUser = await redisClient.hGetAll(`userid:${friendName}`);
  const currentFriendList = await redisClient.lRange(
    `friend:${socket.user.username}`,
    0,
    -1
  );
  console.log(currentFriendList)
  if (!friendUser.userid) {
    callback({ done: false, errorMsg: "User does not exist" });
    return;
  }
  if (currentFriendList && currentFriendList.indexOf(friendName) != -1) {
    callback({ done: false, errorMsg: "User already added" });
    return;
  }

  await redisClient.lPush(`friend:${socket.user.username}`, [friendName,friendUser.userid].join("."));

  callback({ done: true });
}; 

module.exports.onDisconnect=async(socket)=>{
  await redisClient.hSet(`userid:${socket.user.username}`,"connected",false);
  // send event to all friends that the mf has disconnected
  // TODO
}


