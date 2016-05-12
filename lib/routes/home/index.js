var express = require('express');
var router = express.Router();

// public
router.get('/', (req, res) => res.render('home', { title: 'Home' }));

// private methods

// exports

module.exports = router;
