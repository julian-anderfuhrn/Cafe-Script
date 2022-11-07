const { optionsSqlite3 } = require("../mysql/connectionMysql");
const knexSqlite3 = require("knex")(optionsSqlite3);
const tablaUsers = "usuarios";

const sqlite3 = async () => {
    try {
        console.log("Creando tabla usuarios...");
        await knexSqlite3.schema.createTable(tablaUsers, table => {
            table.increments("id");
            table.string("mail");
            table.float("hora");
            table.string("mensaje");
        });

        console.log("Insertando usuarios...");
        await knexSqlite3(tablaUsers).insert(mensajes); // Le podemos pasar un obj o un array
    } catch (error) {
        console.log(error);
    } finally {
        knexSqlite3.destroy();
    }

};