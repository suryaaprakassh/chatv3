const express = require("express");
const bcrypt = require("bcrypt");
const users = require("../schema");
const validateForm = require("../controllers/validateForm");
const router = express.Router();

router
  .route("/login")
  .get(async (req, res) => {
    if (req.session.user && req.session.user.username) {
      res.json({ loggedIn: true, username: req.session.user.username });
    } else {
      res.json({ loggedIn: false });
    }
  })
  .post(async (req, res) => {
    validateForm(req, res);
    const potentialLogin = await users.findOne({ username: req.body.username });
    if (!potentialLogin) {
      //user not found
      res.json({ loggedIn: false, status: "Invalid credentials" });
      return;
    }
    const passValidation = await bcrypt.compare(
      req.body.password,
      potentialLogin.password
    );
    if (passValidation) {
      //login
      req.session.user = {
        username: req.body.username,
        id: potentialLogin._id,
      };
      res.json({ loggedIn: true, username: req.body.username });
    } else {
      //not login
      res.json({ loggedIn: false, status: "Invalid credentials" });
    }
  });
router.post("/signup", async (req, res) => {
  validateForm(req, res);

  const existingUser = await users.findOne({ username: req.body.username });

  if (existingUser) {
    res.json({ loggedIn: false, status: "username taken" });
    return;
  }
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  const newUser = await users.create({
    username: req.body.username,
    password: hashedPass,
  });
  await newUser.save();
  console.log(newUser);
  req.session.user = {
    username: req.body.username,
    id: newUser._id,
  };
  res.json({ loggedIn: true, username: req.body.username });
});

module.exports = router;
