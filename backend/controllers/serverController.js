require("dotenv").config();
const redisClient = require("../redis");
const RedisStore = require("connect-redis").default;
const session = require("express-session");

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "chatapp",
});

const sessionMiddleWare = session({
  secret: process.env.SECRET,
  credentials: true,
  name: "sid",
  resave: false,
  store: redisStore,
  saveUninitialized: false,
  cookie: {
    secure: process.env.ENVIRONMENT === "production",
    httpOnly: true,
    sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    expires: 1000 * 60 * 60 * 24,
  },
});

const socketWrap = (middleWare) => (socket, next) =>
  middleWare(socket.request, {}, next);

module.exports = { sessionMiddleWare, socketWrap };
