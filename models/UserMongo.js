const mongoose = require("mongoose");
const User = require("./User");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, require: true },
    password: { type: String, required: true },
    confirmPass: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);