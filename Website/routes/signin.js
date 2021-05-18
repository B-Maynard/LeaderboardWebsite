var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET signin page. */
router.get('/signin', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.render('signin', { title: 'The Boys Leaderboard' });
});

module.exports = router;
