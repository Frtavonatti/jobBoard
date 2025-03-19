const { User } = require('../models/user')
const Job = require('../models/job')
const Application = require('../models/application')
const { 
  BadRequestError, 
  NotFoundError,
  ForbiddenError 
} = require('./errors')

const validateApplication = async (userId, jobId) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new NotFoundError('User not found')
  }
  if (user.role !== 'candidate') {
    throw new ForbiddenError('Only candidates can apply to jobs')
  }

  const job = await Job.findById(jobId)
  if (!job) {
    throw new NotFoundError('Job not found')
  }

  const applicationExists = await Application.findOne({ job_id: job._id, candidate_id: user.candidate_id })
  if (applicationExists) {
    throw new BadRequestError('Application already exists')
  }

  return [ user, job ]
}

module.exports = {
  validateApplication
}