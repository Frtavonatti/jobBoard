const jwt = require('jsonwebtoken');
const { User, Company } = require('../models/user');
const { Job } = require('../models/job');
const { getTokenFrom } = require('../utils/authUtils')
const asyncHandler = require('./asyncHandler')
const { 
  NotFoundError, 
  ForbiddenError,
  UnauthorizedError 
} = require('../utils/errors')

const verifyToken = asyncHandler(async (req, _res, next) => {
  const token = getTokenFrom(req)
  if (!token) {
    throw new UnauthorizedError('token missing')
  }
  
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    throw new UnauthorizedError('invalid token')
  }

  req.userId = decodedToken.id
  next()
})

const verifyCompanyRole = asyncHandler(async (req, _res, next) => {
  const user = await User.findById(req.userId)
  if (!user) {
    throw new NotFoundError('user not found')
  }

  if (user.role !== 'company') {
    throw new ForbiddenError('only companies can view their jobs')
  }

  req.user = user
  next()
})

const findCompany = asyncHandler(async (req, _res, next) => {
  const company = await Company.findById({ _id: req.user.company_id })
  if (!company) {
    throw new NotFoundError('company not found')
  }

  req.company = company
  next()
})

const verifyJobOwnership = asyncHandler(async (req, _res, next) => {
  const jobId = req.params.id || req.params.jobId
  if (!jobId) {
    throw new Error('job id is required')
  }

  const job = await Job.findById(jobId)
  if (!job) {
    throw new NotFoundError('job post not found')
  }

  if (job.company_id.toString() !== req.company._id.toString()) {
    throw new ForbiddenError('you do not have permission to edit this job post')
  }

  req.job = job
  next()
})

module.exports = { 
  verifyToken, 
  verifyCompanyRole, 
  findCompany, 
  verifyJobOwnership 
}