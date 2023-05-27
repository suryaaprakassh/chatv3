const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const session = require("express-session");
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
app.use(
  session({
    secret: process.env.SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production",
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
      expires: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(express.json());

//routers
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("okie");
});

io.on("connect", (socket) => {});

server.listen(4000, () => {
  console.log("listening on port 4000");
});
