const redisClient = require("../redis");

module.exports.authorizeUser = (socket, next) => {
	if (!socket.request.session || !socket.request.session.user) {
		console.log("Bad request");
		next(new Error("Not authorized"));
		return;
	} else {
		next();
	}
};

module.exports.initializeUser = async (socket) => {
	socket.user = { ...socket.request.session.user };
	socket.join(socket.user.userId);
	await redisClient.hSet(
		`userid:${socket.user.username}`,
		"userid",
		socket.user.userId
	);
	await redisClient.hSet(`userid:${socket.user.username}`, "connected", "true");
	const friendList = await redisClient.lRange(
		`friend:${socket.user.username}`,
		0,
		-1
	);
	if (friendList.length < 0) return;
	const parsedFriendList = await parseFriendList(friendList);
	const friendRooms = parsedFriendList.map((friend) => friend.userId);
	socket.to(friendRooms).emit("connected", "true", socket.user.username);

	socket.emit("friends", parsedFriendList);

	const query = await redisClient.lRange(`chat:${socket.user.userId}`, 0, -1);

	const messages = query.map((msgStr) => {
		const ps = msgStr.split(".");
		return { to: ps[0], from: ps[1], content: ps[2] };
	});
	if (messages && messages.length > 0) {
		socket.emit("messages", messages);
	}
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
	const parseList = (await parseFriendList(currentFriendList)).map(
		(friend) => friend.username
	);
	if (!friendUser.userid) {
		callback({ done: false, errorMsg: "User does not exist" });
		return;
	}
	if (parseList && parseList.indexOf(friendName) != -1) {
		callback({ done: false, errorMsg: "User already added" });
		return;
	}

	await redisClient.lPush(
		`friend:${socket.user.username}`,
		[friendName, friendUser.userid].join(".")
	);

	callback({ done: true });
};


module.exports.onDisconnect = async (socket) => {
	await redisClient.hSet(
		`userid:${socket.user.username}`,
		"connected",
		"false"
	);

	const friendList = await redisClient.lRange(
		`friend:${socket.user.username}`,
		0,
		-1
	);

	const friendRooms = await parseFriendList(friendList).then((data) =>
		data.map((friend) => friend.userId)
	);
	socket.to(friendRooms).emit("connected", "false", socket.user.username);
	// send event to all friends that the mf has disconnected
	// TODO
};

const parseFriendList = async (friendList) => {
	const newFriendList = [];
	for (let friend of friendList) {
		const parsedFriend = friend.split(".");
		const friendConnected = await redisClient.hGet(
			`userid:${parsedFriend[0]}`,
			"connected"
		);
		newFriendList.push({
			username: parsedFriend[0],
			userId: parsedFriend[1],
			connected: friendConnected,
		});
	}
	return newFriendList;
};
