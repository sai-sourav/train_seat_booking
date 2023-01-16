const maincontroller = require('../controllers/maincontroller');
const express = require('express');
const router = express.Router();

// to get availability from DB
router.get('/getavailability', maincontroller.getavailability);

// to update availability in DB
router.post('/bookseats', maincontroller.bookseats);

module.exports = router;