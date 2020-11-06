const express = require('express');
const router = express.Router();


// contentCreator model
const contentCreator = require('../../models/contentCreator');

// POST api/contentCreators
// Register new contentCreator
router.post('/', (req, res) => {
    res.send('register');
});

module.exports = router;