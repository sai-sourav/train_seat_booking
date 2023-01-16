const maincontroller = require('../controllers/maincontroller');
const express = require('express');
const router = express.Router();

router.get('/getavailability', maincontroller.getavailability);

router.post('/bookseats', maincontroller.bookseats);

module.exports = router;