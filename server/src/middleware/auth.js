const jwt = require('jsonwebtoken');
const { User, Company } = require('../models/user');
const Job = require('../models/job');
const { getTokenFrom } = require('../utils/authUtils')

const verifyToken = async (req, res, next) => {
  try {
    const token = getTokenFrom(req)
    if (!token) {
      return res.status(401).json({ error: 'token missing' })
    }
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'invalid token' })
    }
  
    req.userId = decodedToken.id
    next()
  } catch (error) {
    console.log(error);
    return res.status().json({ error: 'internal server error' })
  }
}

const verifyCompanyRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ error: 'user not found' })
    }

    if (user.role !== 'company') {
      return res.status(403).json({ error: 'only companies can view their jobs' })
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'internal server error' })
  }
}

const findCompany = async (req, res, next) => {
  try {
    const company = await Company.findById({ _id: req.user.company_id })

    if (!company) {
      return res.status(404).json({ error: 'company not found' })
    }

    req.company = company
    next()
  } catch (error) {
    console.log(error);
    return res.status().json({ error: 'internal server error' })
  }
}

const verifyJobOwnership = async (req, res, next) => {
  try {
    const jobId = req.params.id || req.params.jobId
    if (!jobId) {
      return res.status(400).json({ error: 'job id is required' })
    }

    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ error: 'job post not found' })
    }
  
    if (job.company_id.toString() !== req.company._id.toString()) {
      return res.status(403).json({ error: 'you do not have permission to edit this job post' })
    }

    req.job = job
    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'internal server error' })
  }
}

module.exports = { 
  verifyToken, 
  verifyCompanyRole, 
  findCompany, 
  verifyJobOwnership 
}