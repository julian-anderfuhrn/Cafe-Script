var express = require('express');
var router = express.Router();
const userController = require("../controllers/usersController.js");
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")
//LogIn
router.get('/login', guestMiddleware, userController.login);
router.post("/login", userController.processLogin)
//Register
router.get("/register", guestMiddleware, userController.register);
router.post("/register", userController.processRegister);
//ForgetPass
router.get("/olvidar", userController.olvidarPass);
//Profile
router.get("/profile", authMiddleware, userController.profile)
router.get("/logout", userController.logout)
module.exports = router;
