const User = require("../models/User.js")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator");
const userSchema = require("../models/UserMongo");
const { default: mongoose } = require("mongoose");
const { parse } = require("dotenv");
const controller = {


    login: function (req, res, next) {
        res.render('login');
    },
    processLogin: async function (req, res) {

        const errors = validationResult(req);
        const { email } = req.body;
        let encontrarUser = await userSchema.findOne({ email });
        console.log(`Desde processLogin ${encontrarUser}`);
        if (errors.isEmpty()) {

            if (encontrarUser === null) {
                res.redirect("/users/register");
            } else {


                const comparePass = bcrypt.compareSync(req.body.password, encontrarUser.password)
                console.log(comparePass);
                if (comparePass) {
                    req.session.userLoged = encontrarUser;
                    console.log(req.session.userLoged);
                    return res.render("../views/profile.ejs", { users: req.session.userLoged, id: encontrarUser._id })
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
        //console.log(encontrarUser);
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
    profile: async (req, res, next) => {

        return res.render("../views/profile.ejs", {
            users: req.session.userLoged,
            // id: encontrarUser2._id,
            // name: encontrarUser2.name,
            // apellido: encontrarUser2.apellido,
            // telefono: encontrarUser2.telefono,
            // email: encontrarUser2.email,
            // password: encontrarUser2.password,
            // confirmPass: encontrarUser2.confirmPass
        })
    },
    profileId: async (req, res, next) => {
        // let id = new require("mongoose").Types.ObjectId(req.params.id);
        const { id } = req.params;
        let encontrarUser2 = await userSchema.findById(id);

        console.log(`Desde profileId ${encontrarUser2}`);
        return res.render("../views/actualizarDatos.ejs", {
            users: req.session.userLoged,
            id: encontrarUser2._id,
            name: encontrarUser2.name,
            apellido: encontrarUser2.apellido,
            telefono: encontrarUser2.telefono,
            email: encontrarUser2.email,
        })
        // return res.render("../views/profile.ejs", { users: req.session.userLoged, id: encontrarUser._id })
    },
    logout: (req, res, next) => {
        req.session.destroy();
        return res.redirect("/")
    },
    parseId: (id) => {
        return mongoose.Types.ObjectId(id);
    }
    ,
    updateData: async (req, res, next) => {
        const { id } = req.params;
        // let encontrarUser = await userSchema.findOne({ id });
        const updatedResult = await userSchema.findByIdAndUpdate({ _id: id }, req.body);
        console.log(`Desde updateData ${updatedResult}`);
        return res.render("../views/profile.ejs", {
            users: req.session.userLoged,
            id: updatedResult._id,
            name: updatedResult.name,
            apellido: updatedResult.apellido,
            telefono: updatedResult.telefono,
            email: updatedResult.email,
            password: updatedResult.password,
            confirmPass: updatedResult.confirmPass
        });
        console.log("ACTUALIZACION SEXOSA EXITOSA 😎🤙");
    }
};

module.exports = controller;