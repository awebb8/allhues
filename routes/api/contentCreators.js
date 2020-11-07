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
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
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
      email,
      password: hash,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ id: savedUser._id }, "sneakysecret", {
      expiresIn: 3600,
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
// router.post("/", (req, res) => {
//   const { name, email, password } = req.body;

//   // Validation
//   if (!name || !email || !password) {
//     return res.status(400).json({ msg: "Please enter all fields" });
//   }

//   // Check for existing user
//   contentCreator.findOne({ email }).then((user) => {
//     if (user) {
//       return res.status(400).json({ msg: "User already exists" });
//     }
//     const newcontentCreator = new contentCreator({
//       name,
//       email,
//       password,
//     });

//     // Create salt & hash
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newcontentCreator.password, salt, (err, hash) => {
//         if (err) throw err;
//         newcontentCreator.password = hash;
//         newcontentCreator.save().then((user) => {
//           res.json({
//             user: {
//               id: user.id,
//               name: user.name,
//               email: user.email,
//             },
//           });
//         });
//       });
//     });
//   });
// });

module.exports = router;
