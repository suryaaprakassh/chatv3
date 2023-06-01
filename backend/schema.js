const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  email: String,
  userId: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("usersc", userSchema);
