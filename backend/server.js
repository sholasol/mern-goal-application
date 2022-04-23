const express = require('express')
const dotenv  = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware') //error handler middleware
const port = process.env.PORT || 5000

//initialize our app
const app = express()

//handle form data
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//setting up routing for the app
app.use('/api/goals', require('./routes/goalRoutes'))

//use error handler
app.use(errorHandler)

//port listener
app.listen(port, ()=> console.log(`Server started on port ${port}`))

