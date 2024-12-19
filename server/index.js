require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')

const app = express()

const url = process.env.MONGO_URI
mongoose.set('strictQuery', false)

mongoose.connect(url)
.then(result => {
  console.log('connected to MongoDB')
})
.catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})

// ROUTES
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// CONFIG
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})