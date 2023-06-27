require('dotenv').config()

var cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
// Wrap the code in an async function
async function startServer() {
  try {
    // connect to db
    await mongoose.connect(process.env.MONGO_URI);

    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

// Call the async function to start the server
startServer();