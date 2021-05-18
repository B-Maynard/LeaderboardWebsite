const express = require('express');
const router = express.Router();

const games_controller = require('../controllers/games.controller');

// GETS
router.get('/test', games_controller.test);
router.get('/getall', games_controller.game_getall);

// POSTS
router.post('/create', games_controller.game_create);

module.exports = router;