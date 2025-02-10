const jobsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Job = require('../models/job')
const { User, Company } = require('../models/users')
const { getTokenFrom } = require('../lib/utils')

jobsRouter.get('/', async (_req, res) => {
  try {
    const jobs = await Job.find({})
    res.json(jobs)
  } catch (error) {
   console.log(error);
  }
})

jobsRouter.post('/', async (req, res) => {
  const body = req.body  

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (user.role !== 'company') {
    return res.status(401).json({ error: 'only companies can post jobs' })
  }

  const company = await Company.findOne({ user_id: user.id })
  if (!company) {
    return res.status(401).json({ error: 'company not found' })
  }

  const newJob = new Job({
    id: body.id,
    company_id: company.id, // this field populates the company_id field in the job schema
    title: body.title,
    company: body.company,
    location: body.location,
    employmentType: body.employmentType,
    seniority: body.seniority,
    description: body.description,
    salary: body.salary,
    datePosted: body.datePosted,
    requirements: body.requirements,
    tasks: body.tasks,
  })

  try {
    const savedJob = await newJob.save()
    res.json(savedJob)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' })
  }
})

jobsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    await Job.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    console.log(error);
  }
})

jobsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const jobId = req.params.id

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (user.role !== 'company') {
    return res.status(403).json({ error: 'only companies can edit job posts' })
  }

  const company = await Company.findOne({ user_id: user.id })
  if (!company) {
    return res.status(404).json({ error: 'company not found' })
  }

  const job = await Job.findById(jobId)
  if (!job) {
    return res.status(404).json({ error: 'job post not found' })
  }

  if (job.company_id.toString() !== company._id.toString()) {
    return res.status(403).json({ error: 'you do not have permission to edit this job post' })
  }

  const updatedJob = {
    title: body.title,
    location: body.location,
    employmentType: body.employmentType,
    seniority: body.seniority,
    description: body.description,
    salary: body.salary,
    requirements: body.requirements,
    tasks: body.tasks
  }

  try {
    const savedJob = await Job.findByIdAndUpdate(jobId, updatedJob, { new: true })
    res.json(savedJob)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'internal server error' })
  }
})

module.exports = jobsRouter