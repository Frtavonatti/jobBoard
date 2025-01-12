const config = require('./src/utils/config')
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const jobsRouter = require('./src/controllers/jobs')
const logger = require('./src/utils/middleware')

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

module.exports = app
