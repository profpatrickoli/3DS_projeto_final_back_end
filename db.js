// npm i mysql2
//const mysql = require("mysql2/promise")
const { Pool } = require("pg");
require("dotenv").config()

//const pool = mysql.createPool({
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, // colocar o nome do seu BD
    //multipleStatements: true,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = Object.freeze({
    pool: pool
})
