var express = require('express');
var router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/usersController.js");
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")
const validateRegisterForm = [
    body("name").notEmpty().withMessage(`Debe completar el campo nombre!`),
    body("apellido").notEmpty().withMessage("Debe completar este apellido!"),
    body("email").isEmail().withMessage("Debe completar el campo email!"),
    body("telefono").notEmpty().withMessage("Debe completar el campo telefono!"),
    body("password").notEmpty().withMessage("Debe completar el campo password!"),
    body("confirmPass").notEmpty().withMessage("Debe completar el campo confirmar Contraseña!")
];
const validateRegisterLogin = [
    body("email").isEmail().withMessage("Debe completar el campo email!"),
    body("password").notEmpty().withMessage("Debe completar el campo contraseña!"),
];



//LogIn
router.get('/login', guestMiddleware, userController.login);
router.post("/login", validateRegisterLogin, userController.processLogin)
//Register
router.get("/register", guestMiddleware, userController.register);
router.post("/register", validateRegisterForm, userController.processRegister);
//ForgetPass
router.get("/olvidar", userController.olvidarPass);
//Profile
router.get("/profile", authMiddleware, userController.profile)
router.get("/profile/:id", authMiddleware, userController.profileId)
router.get("/logout", userController.logout)
//Actualizar datos 
router.get("/actualizar/:id", userController.profileId);
router.put("/actualizar/:id", userController.updateData);

module.exports = router;
