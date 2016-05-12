var express = require('express');
var router = express.Router();

// middleware
//router.use(require('../middleware/...'));

// core routes
router.use('/',              require('./home'));

//router.use('/address',        require('./address'));

// support routes
//router.use('/autocomplete/addresses',  require('./autocomplete/addresses'));

module.exports = router;
