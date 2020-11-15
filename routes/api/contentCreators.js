const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");
// contentCreator model
const contentCreator = require("../../models/contentCreator");

// POST api/contentCreators
// Register new contentCreator
router.post("/register", async (req, res) => {
  const { name, userName, email, password, role } = req.body;

  // Simple validation
  if (!name || !userName || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await contentCreator.findOne({ email });
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = new contentCreator({
      name,
      userName,
      email,
      password: hash,
      role,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        userName: savedUser.userName,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    const user = await contentCreator.findOne({ email });
    if (!user) throw Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    if (!token) throw Error("Couldn't sign the token");

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.msg });
  }
});

// router.get("/logout",)

module.exports = router;
