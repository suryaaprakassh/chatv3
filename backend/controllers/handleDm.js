const redisClient = require("../redis");

const handleDm = async (socket, message) => {
    message.from=socket.user.userId;
	const messageString = [
        message.to, 
        message.from,
        message.content
    ].join(".");
    await redisClient.lPush(`chat:${message.from}`,messageString);
    await redisClient.lPush(`chat:${message.to}`,messageString);

    socket.to(message.to).emit("dm",message)
};

module.exports = handleDm;
