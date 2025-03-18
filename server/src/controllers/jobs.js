const jobsRouter = require('express').Router()
const Job = require('../models/job')
const { 
  verifyToken, 
  verifyCompanyRole,
  findCompany,
  verifyJobOwnership,
 } = require('../middleware/auth')
const asyncHandler = require('../middleware/asyncHandler')
const { NotFoundError } = require('../utils/errors')

// GET all jobs
jobsRouter.get('/', asyncHandler(async (_req, res) => {
    const jobs = await Job.find({})
    res.json(jobs)
}))

// GET my jobs (as company)
jobsRouter.get('/myjobs', 
  [verifyToken, verifyCompanyRole, findCompany], // Auth Middleware
  asyncHandler(async (req, res) => {
    const jobs = await Job.find({ company_id: req.company._id })
    res.json(jobs)
}))
  
// GET job by id
jobsRouter.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id
  const job = await Job.findById(id)

  if (!job) {
    throw new NotFoundError('job post not found')
  }

  res.json(job)
})) 

// POST new job
jobsRouter.post('/', 
  [verifyToken, verifyCompanyRole, findCompany],  
  asyncHandler(async (req, res) => {
    const body = req.body  
  
    const newJob = new Job({
      company_id: req.company._id, 
      company: req.company.name,
      title: body.title,
      location: body.location,
      employmentType: body.employmentType,
      seniority: body.seniority,
      description: body.description,
      salary: body.salary,
      datePosted: body.datePosted || new Date(),
      requirements: body.requirements,
      tasks: body.tasks,
      // questions: body.questions || [],
    })
  
    const savedJob = await newJob.save()
    req.company.job_posts = req.company.job_posts.concat(savedJob._id)
    await req.company.save()

    res.status(201).json(savedJob)
}))

// DELETE job
jobsRouter.delete('/:id', 
  [verifyToken, verifyCompanyRole, findCompany, verifyJobOwnership], 
  asyncHandler(async (req, res) => {
    const id = req.params.id
  
    await Job.findByIdAndDelete(id)
    req.company.job_posts = req.company.job_posts.filter(jobId => jobId.toString() !== id)
    await req.company.save()

    res.status(204).end()
}))

// UPDATE job
jobsRouter.put('/:id', 
  [verifyToken, verifyCompanyRole, findCompany, verifyJobOwnership], 
  asyncHandler(async (req, res) => {
    const body = req.body
    const jobId = req.params.id
  
    const updatedJob = {
      title: body.title,
      location: body.location,
      employmentType: body.employmentType,
      seniority: body.seniority,
      description: body.description,
      salary: body.salary,
      requirements: body.requirements,
      tasks: body.tasks,
      // questions: body.questions
    }
  
    const savedJob = await Job.findByIdAndUpdate(
      jobId, 
      { $set: updatedJob}, 
      { new: true }
    )

    if (!savedJob) {
      throw new NotFoundError('job post not found')
    } 

    res.json(savedJob)
}))

module.exports = jobsRouter