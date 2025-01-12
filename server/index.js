require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors')
const app = express()

const Job = require('./src/models/job')

// Middleware
const logger = (req, _res, next) => {
  console.log('PATH: ', req.path);
  console.log('METHOD: ', req.method);
  console.log('BODY: ', req.body);
  next();
}

app.use(cors())
app.use(express.json())
app.use(logger)

// Config
const url = process.env.MONGO_URI
mongoose.set('strictQuery', false)

mongoose.connect(url)
.then(() => {
  console.log('connected to MongoDB')
})
.catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})

// ROUTES
app.get('/api/jobs', (_req, res) => {
  Job.find({}).then(jobs => {
    res.json(jobs)
  })
})

app.post('/api/jobs', (req, res) => {
  const body = req.body

  if (!body.title) {
    return res.status(400).json({error: "content missing"})
  }

  const newJob = new Job({
    id: body.id,
    title: body.title,
    company: body.company,
    location: body.location,
    employmentType: body.employmentType,
    seniority: body.seniority,
    description: body.description,
    salary: body.salary,
    datePosted: body.datePosted,
    requirements: body.requirements,
    tasks: body.tasks
  })

  newJob.save().then(savedJob => {
    res.json(savedJob);
  })
})

// CONFIG
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
