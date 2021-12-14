const { Sequelize } = require("sequelize");
const {DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME} = require("../helpers/env")

const db = new Sequelize (DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host : DB_HOST,
    dialect : "postgres",
})

db.authenticate()
    .then(()=>{
        console.log("koneksi aman")
    })
    .catch((err)=>{
        console.log(err)
    })

module.exports = db