var express = require('express');
var router = express.Router();

/* GET game page. */
router.get('/games', function(req, res, next) {
  res.render('games', { title: 'The Boys Leaderboard' });
});

module.exports = router;
