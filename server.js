require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const expresshbs = require('express-handlebars')
const mysql = require('mysql')
const path = require('path')

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extnded: false}))
app.use(express.static('public'))

// routes
app.use('/', require('./routes/user'))
//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host           : process.env.DB_HOST,
    user           : process.env.DB_USER,
    password       : process.env.DB_PASSWORD,
    database       : process.env.DB_NAME
})
pool.getConnection((err,connection) => {
    if (err) throw err
    console.log('connected at' + connection.threadId)
})


app.listen(PORT, () => {
    console.log(`server listens at port ${PORT}`)
})