const redisClient = require("../redis");
module.exports.authorizeUser = (socket, next) => {
  if (!socket.request.session && !socket.request.session.user) {
    console.log("Bad request");
    next(new Error("Not authorized"));
  } else {
    socket.user = { ...socket.request.session.user };
    redisClient.hSet(
      `userid:${socket.user.username}`,
      "userid",
      socket.user.userId
    );
    next();
  }
};

module.exports.addFriend = async (socket, friendName, callback) => {
  if (friendName == socket.user.username) {
    callback({ done: false, errorMsg: "Cannot add Yourself as a friend " });
    return;
  }

  const friendUserId = await redisClient.hGet(`userid:${friendName}`, "userid");

  const currentFriendList = await redisClient.lRange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  if (!friendUserId) {
    callback({ done: false, errorMsg: "User does not exist" });
    return;
  }
  if (currentFriendList && currentFriendList.indexOf(friendName) != -1) {
    callback({ done: false, errorMsg: "User already added" });
    return;
  }

  await redisClient.lPush(`friend:${socket.user.username}`, friendName);

  callback({ done: true });
};
