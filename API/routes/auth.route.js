const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/auth.controller');

// GETS
router.get('/test', auth_controller.test);

// POSTS
router.post('/login', auth_controller.auth_login);

module.exports = router;