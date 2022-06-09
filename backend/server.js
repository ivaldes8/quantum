const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json({limit: "5mb", extended: true}))
app.use(express.urlencoded({limit: "5mb", extended: true}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/home', require('./routes/homeRoutes'))
app.use('/api/homeCards', require('./routes/homeCardRoutes'))
app.use('/api/groups', require('./routes/groupRoutes'))
app.use('/api/investments', require('./routes/investmentRoutes'))
app.use('/api/actions', require('./routes/actionRoutes'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html' )))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))