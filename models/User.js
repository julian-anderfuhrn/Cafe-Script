//MODEL USER
//1.Guardar user en la DB
//2.Buscar User
//3.Obtener user by ID
//4.Editar info del user
//5.Eliminar user de la DB
const fs = require("fs");
const path = require("path");


const User = {
    fileName: path.resolve(__dirname, "../", "database", "users.json"),
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
    },
    findAll: function () {
        return this.getData();
    },
    findById: function (id) {
        let allUsers = this.findAll();
        let userId = allUsers.filter(user => user.id === id);
        return userId;
    },
    findByEmail: function (email) {
        let allUsers = this.findAll();
        let emailFound = allUsers.filter(user => user.email === email);
        return emailFound;
    }
    ,
    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(ux => ux[field] === text);
        return userFound;
    },
    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        };
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
        return true;
    },
    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },
    delete: function (id) {
        let allUsers = this.findAll();
        let restantes = allUsers.filter(users => users.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(restantes, null, " "));
        return true;
    }
}

// console.log(User.findByField("email", "asd@asd.com"));
module.exports = User;