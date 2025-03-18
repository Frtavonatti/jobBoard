const config = require('./src/config/config')
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const jobsRouter = require('./src/controllers/jobs')
const userRouter = require('./src/controllers/users')
const applicationsRouter = require('./src/controllers/applications')
const logger = require('./src/middleware/logger')
const errorHandler = require('./src/middleware/errorHandler')

// Middleware
app.use(cors())
app.use(express.json())
app.use(logger)

// MongoDB config
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URI)
.then(() => {
  console.log('connected to MongoDB')
})
.catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})

// Routes
app.use('/api/jobs', jobsRouter)
app.use('/api/users', userRouter)
app.use('/api/applications', applicationsRouter)

// Error handling middleware
app.use(errorHandler)

module.exports = app
