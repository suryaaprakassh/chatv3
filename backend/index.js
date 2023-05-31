const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const helmet = require("helmet");
//env
require("dotenv").config();

const app = express();
const server = require("http").createServer(app);

//db connection
mongoose
  .connect(process.env.DB)
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

//custom
const authRouter = require("./routers/routers");
const { sessionMiddleWare } = require("./controllers/serverController");
const { socketWrap } = require("./controllers/serverController");
const {
  authorizeUser,
  addFriend,
  initializeUser,
  onDisconnect,
} = require("./controllers/socketControllers");

const handleDm=require("./controllers/handleDm")

const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

//middleware
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(sessionMiddleWare);
app.use(express.json());

//routers
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("okie");
});

//socket io middleware
io.use(socketWrap(sessionMiddleWare));
io.use(authorizeUser);

io.on("connect", (socket) => {
  initializeUser(socket);
  socket.on("add_friend", (friendName, callback) => {
    addFriend(socket, friendName, callback);
  });

socket.on("dm",(message)=>{
    console.log(socket.user,"He is the user")
    handleDm(socket,message)
});

  socket.on("disconnecting", () => {
    onDisconnect(socket);
  });
});

server.listen(4040, () => {
  console.log("listening on port 4040");
});
