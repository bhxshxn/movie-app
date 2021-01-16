const express = require('express');
const router = express.Router();

router.use('/user', require('./user.js'));

router.get('/', (req, res) => {
    res.render('main/home');
});

module.exports = router;