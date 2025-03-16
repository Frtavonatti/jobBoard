const applicationsRouter = require('express').Router();
const jwt = require('jsonwebtoken')
const Application = require('../models/application');
const Job = require('../models/job');
const { User } = require('../models/user');
const { getTokenFrom } = require('../utils/utils');

applicationsRouter.get('/', async (_req, res) => {
  try {
    const applications = await Application.find({});
    res.json(applications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'internal server error' });
  }
});

applicationsRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const application = await Application.findById(id);
    res.json(application);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 'application not found' });
  }
});

applicationsRouter.post('/:jobId/apply', async (req, res) => {
  const body = req.body;
  const jobId = req.params.jobId;

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return res.status(403).json({ error: 'User not found' })
  }

  const job = await Job.findById(jobId)
  if (!job) {
    return res.status(404).json({ error: 'Job not found' })
  }

  const applicationExists = await Application.findOne({ job_id: job._id, candidate_id: user.candidate_id })
  if (applicationExists) {
    return res.status(400).json({ error: 'Application already exists' })
  }

  try {
    const application = new Application({
      candidate_id: user.candidate_id,
      job_id: job._id,
      date: new Date(),
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone || "",
        location: body.location || "",
        portfolio: body.portfolio || "",
      }
    })
    const savedApplication = await application.save()
    res.status(201).json(savedApplication)
  } catch (error) {
    console.log(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(400).json({ error: 'Invalid or missing data in application creation request' });
  } 
})

module.exports = applicationsRouter;