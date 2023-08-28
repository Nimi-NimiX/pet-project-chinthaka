const pool = require('pg').Pool
require('dotenv').config()

const Pool = new pool({
    host: 'localhost',
    port: 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
})

module.exports = Pool