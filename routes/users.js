var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get("/register", (req, res, next) => {
  res.render("register");
});
router.get("/olvidar", (req, res, next) => {
  res.render("olvidarPass");
});


module.exports = router;
