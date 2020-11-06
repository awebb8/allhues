const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// contentCreator model
const contentCreator = require('../../models/contentCreator');

// POST api/contentCreators
// Register new contentCreator
router.post('/', (req, res) => {
    const { name, email, password } = req.body;


// Validation
if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
}

// Check for existing user
contentCreator.findOne({ email })
    .then(user => {
       if(user) {
           return res.status(400).json({ msg: 'User already exists' });
       }
       const newcontentCreator = new contentCreator({
           name,
           email,
           password
       });

       // Create salt & hash
       bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(newcontentCreator.password, salt, (err, hash) => {
               if(err) throw err;
               newcontentCreator.password = hash;
               newcontentCreator.save()
                .then(user => {
                    res.json({
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    })
                })
           })
       })
    })
});

module.exports = router;