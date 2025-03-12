const jobsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Job = require('../models/job')
const { User, Company } = require('../models/user')
const { getTokenFrom } = require('../lib/utils')

jobsRouter.get('/', async (_req, res) => {
  try {
    const jobs = await Job.find({})
    res.json(jobs)
  } catch (error) {
   console.log(error);
   res.status(500).json({ error: 'internal server error' })
  }
})

jobsRouter.get('/myjobs', async (req, res) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (user.role !== 'company') {
    return res.status(403).json({ error: 'only companies can view their jobs' })
  }

  const company = await Company.findById(user.company_id)
  if (!company) {
    return res.status(404).json({ error: 'company not found' })
  }

  try {
    const jobs = await Job.find({ company_id: company._id })
    res.json(jobs)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'internal server error' })
  }
})

jobsRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const job = await Job.findById(id)
    res.json(job)
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 'job post not found' })
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

  const company = await Company.findById({ _id: user.company_id })
  if (!company) {
    return res.status(401).json({ error: 'company not found' })
  }

  const newJob = new Job({
    company_id: company._id, 
    company: company.name,

    title: body.title,
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
    company.job_posts = company.job_posts.concat(savedJob._id)
    await company.save()
    res.json(savedJob)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' })
  }
})

jobsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (user.role !== 'company') {
    return res.status(403).json({ error: 'only companies can delete job posts' })
  }

  const company = await Company.findById({ _id: user.company_id })
  if (!company) {
    return res.status(404).json({ error: 'company not found' })
  }

  if (!company.job_posts.includes(id)) {
    return res.status(403).json({ error: 'you do not have permission to delete this job post' })
  }

  try {
    await Job.findByIdAndDelete(id)
    company.job_posts = company.job_posts.filter(jobId => jobId.toString() !== id)
    await company.save()
    res.status(204).end()
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' })
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

  const company = await Company.findById({ _id: user.company_id })
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
  const savedJob = await Job.findByIdAndUpdate(
    jobId, 
    { $set: updatedJob}, 
    { new: true }
  )
    res.json(savedJob)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'internal server error' })
  }
})

module.exports = jobsRouter