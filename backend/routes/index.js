var express = require('express');
var router = express.Router();

/**
 * Redirects the user to the dashboard if they are logged in, otherwise redirects to the login page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
router.get('/', function(req, res, next) {
  if (!req.session.user) return res.redirect('/auth/login');
  res.redirect('/dashboard');
});

module.exports = router;
