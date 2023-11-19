const router = require('express').Router();

const adminController = require('../controllers/adminLogin');

router.post('/login', adminController.login);

module.exports = router;
