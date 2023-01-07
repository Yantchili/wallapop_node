'use strict'
const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
mongoose.connection.on("error", Error => {
    console.log("Error de conexion a MongoDB", Error);
    process.exit(1)
})
mongoose.connection.once("open", () => {
    console.log("Conectado a MongoDB en", mongoose.connection.name)
})
mongoose.connect("mongodb://localhost:27017/nodepop")
module.exports = mongoose.connection
