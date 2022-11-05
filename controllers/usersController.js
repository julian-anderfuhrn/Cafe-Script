const User = require("../models/User.js")
const bcrypt = require("bcryptjs")
const controller = {
    login: function (req, res, next) {
        res.render('login');
    },
    processLogin: function (req, res) {
        let userToLog = User.findByField('email', req.body.email);
        if (userToLog) {
            const comparePass = bcrypt.compareSync(req.body.password, userToLog.password)
            if (comparePass) {
                delete userToLog.password;
                delete userToLog.confirmPass;
                req.session.userLoged = userToLog;
                // const validacion = req.session.userLoged ? req.session.userLoged : "login";
                // const data = [{ users: req.session.userLoged }]
                return res.redirect("/users/profile");
            }
            // { user: req.session.userLoged }
        }

    },
    register: (req, res, next) => {
        res.render("register");
    },
    processRegister: function (req, res) {
        const user = User.findByField("email", req.body.email);
        console.log(user);
        if (user) {

            return res.render("../views/error.ejs");


        } else {
            const userCreate = {
                ...req.body,
                confirmPass: bcrypt.hashSync(req.body.confirmPass, 10),
                password: bcrypt.hashSync(req.body.password, 10)

            };
            User.create(userCreate);
            res.render("../views/login.ejs");
        }

    },
    olvidarPass: (req, res, next) => {
        res.render("olvidarPass");
    },
    profile: (req, res, next) => {


        return res.render("../views/profile.ejs", { users: req.session.userLoged })
    },
    logout: (req, res, next) => {
        req.session.destroy();
        return res.redirect("/")
    }
};

module.exports = controller;