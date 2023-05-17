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
//implementing template engine
app.get('/about', (req,res) => {
    res.render(path.join(__dirname('views', 'index')))
})

app.listen(PORT, () => {
    console.log(`server listens at port ${PORT}`)
})