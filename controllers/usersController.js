const User = require("../models/User.js")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator");
const userSchema = require("../models/UserMongo");
const controller = {


    login: function (req, res, next) {
        res.render('login');
    },
    processLogin: async function (req, res) {

        const errors = validationResult(req);
        const { email } = req.body;
        let encontrarUser = await userSchema.findOne({ email });
        console.log(encontrarUser);
        if (errors.isEmpty()) {

            if (encontrarUser === null) {
                res.redirect("/users/register");
            } else {
                const comparePass = bcrypt.compareSync(req.body.password, encontrarUser.password)
                console.log(comparePass);
                if (comparePass) {
                    req.session.userLoged = encontrarUser;
                    return res.redirect("/users/profile");
                }


            }
        } else {
            res.render("../views/login.ejs", { errors: errors.array(), oldData: req.body });
        }
    },
    register: (req, res, next) => {
        res.render("register");
    },
    processRegister: async function (req, res) {
        const errors = validationResult(req);
        const { email } = req.body;
        let encontrarUser = await userSchema.findOne({ email });
        console.log(encontrarUser);
        if (errors.isEmpty()) {

            if (encontrarUser === null) {

                let usuario = userSchema(
                    {
                        ...req.body,
                        confirmPass: bcrypt.hashSync(req.body.confirmPass, 10),
                        password: bcrypt.hashSync(req.body.password, 10)
                    }
                );
                usuario.save();
                res.render("../views/login.ejs");


            } else {
                res.json("ya esta en la base down")
            }
        } else {
            res.render("../views/register.ejs", { errors: errors.array(), oldData: req.body });
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