const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()

require('dotenv').config({ path: '../.env' })
require('./config/connectDb')

app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


app.listen(process.env.PORT || 3800, (err) => {
    if (err) {
        console.log('Listining error : ', err)
    } else {
        console.log(`Listining on port ${process.env.PORT}`)
    }
})


module.exports = app