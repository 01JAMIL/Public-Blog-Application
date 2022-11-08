const express = require('express')
const cors = require('cors')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const expressFileUpload = require('express-fileupload')

const userRouter = require('./routes/user.route')
const articleRouter = require('./routes/article.route')
const commentRouter = require('./routes/comment.route')
const categoryRouter = require('./routes/category.route')

const app = express()

require('dotenv').config({ path: '../.env' })
require('./config/connectDb')

app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressFileUpload({
    createParentPath: true
}))



app.use('/api/user', userRouter)
app.use('/api/article', articleRouter)
app.use('/api/comment', commentRouter)
app.use('/api/category', categoryRouter)


app.use('/uploads', express.static(
    path.join(__dirname, '/uploads')
))

app.listen(process.env.PORT || 3800, (err) => {
    if (err) {
        console.log('Listining error : ', err)
    } else {
        console.log(`Listining on port ${process.env.PORT}`)
    }
})


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'))
    })
}


module.exports = app