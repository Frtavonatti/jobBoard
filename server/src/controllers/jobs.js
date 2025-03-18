const jobsRouter = require('express').Router()
const Job = require('../models/job')
const { 
  verifyToken, 
  verifyCompanyRole,
  findCompany,
  verifyJobOwnership,
 } = require('../middleware/auth')

jobsRouter.get('/', async (_req, res) => {
  try {
    const jobs = await Job.find({})
    res.json(jobs)
  } catch (error) {
   console.log(error);
   res.status(500).json({ error: 'internal server error' })
  }
})

jobsRouter.get('/myjobs', [verifyToken, verifyCompanyRole, findCompany], async (req, res) => {
  try {
    const jobs = await Job.find({ company_id: req.company._id })
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

jobsRouter.post('/', [verifyToken, verifyCompanyRole, findCompany],  async (req, res) => {
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
    datePosted: body.datePosted,
    requirements: body.requirements,
    tasks: body.tasks,
  })

  try {
    const savedJob = await newJob.save()
    req.company.job_posts = req.company.job_posts.concat(savedJob._id)
    await req.company.save()
    res.json(savedJob)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' })
  }
})

jobsRouter.delete('/:id', [verifyToken, verifyCompanyRole, findCompany, verifyJobOwnership],  async (req, res) => {
  const id = req.params.id

  try {
    await Job.findByIdAndDelete(id)
    req.company.job_posts = req.company.job_posts.filter(jobId => jobId.toString() !== id)
    await req.company.save()
    res.status(204).end()
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' })
  }
})

jobsRouter.put('/:id', [verifyToken, verifyCompanyRole, findCompany, verifyJobOwnership], async (req, res) => {
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