const express = require('express')
const colors = require('colors')
const dotenv  = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware') //error handler middleware
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB() //call the db connection

//initialize our app
const app = express()

//handle form data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//setting up routing for the app
app.use('/api/goals', require('./routes/goalRoutes'))
//user Route
app.use('/api/users', require('./routes/userRoutes'))

//use error handler
app.use(errorHandler)

//port listener
app.listen(port, ()=> console.log(`Server started on port ${port}`))

