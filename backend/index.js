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

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
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

io.on("connect", (socket) => {
  console.log(socket.request.session.user.username);
});

server.listen(4000, () => {
  console.log("listening on port 4000");
});
