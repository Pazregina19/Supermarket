var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.session.user) return res.redirect('/auth/login');
  res.redirect('/dashboard');
});

module.exports = router;
