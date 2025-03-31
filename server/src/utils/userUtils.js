const { User, Company, Candidate } = require('../models/user')

const getProfileData = (user) => {
  if (user.role === 'company' && user.company_id) {
    return {
      id: user.company_id._id,
      name: user.company_id.name,
      industry: user.company_id.industry
    }
  } else if (user.role === 'candidate' && user.candidate_id) {
    return {
      id: user.candidate_id._id,
      firstName: user.candidate_id.first_name,
      lastName: user.candidate_id.last_name,
      likes: user.candidate_id.liked_jobs
    }
  }
  return null
}

const validateSignupData = async (email, password, role, profileData) => {
  if (!email || !password || !role || !profileData) {
    throw new BadRequestError('Email, password, role and profile are required')
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new BadRequestError('Email already in use')
  }

  if (role !== 'company' && role !== 'candidate') {
    throw new BadRequestError('Invalid role')
  }
  
  // Specific role validation
  if (role === 'company' && (!profileData.name || !profileData.industry)) {
    throw new BadRequestError('Company profile requires name and industry')
  }
  
  if (role === 'candidate' && (!profileData.first_name || !profileData.last_name)) {
    throw new BadRequestError('Candidate profile requires first name and last name')
  }
}

const createCompanyProfile = async (profileData) => {
  let company = await Company.findOne({ name: profileData.name })

  if (!company) {
    company = await Company.create({
      name: profileData.name,
      industry: profileData.industry,
      job_posts: [],
      users: []
    })
  }

  return company._id
}

const createCandidateProfile = async (profileData) => {
  const candidate = await Candidate.create({
    first_name: profileData.first_name,
    last_name: profileData.last_name
  })

  return candidate._id
}

module.exports = {
  getProfileData, 
  validateSignupData,
  createCompanyProfile, 
  createCandidateProfile 
}