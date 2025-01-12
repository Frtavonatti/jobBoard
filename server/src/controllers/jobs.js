const jobsRouter = require('express').Router()
const Job = require('../models/job')

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

  try {
    const savedJob = await newJob.save()
    res.json(savedJob)
  } catch (error) {
    console.log(error);
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

module.exports = jobsRouter