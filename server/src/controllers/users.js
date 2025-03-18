const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Company } = require('../models/user')
const asyncHandler = require('../middleware/asyncHandler')
const { 
  getProfileData, 
  validateSignupData,
  createCompanyProfile,
  createCandidateProfile
 } = require('../utils/userUtils')
const { 
  NotFoundError, 
  UnauthorizedError, 
  BadRequestError
} = require('../utils/errors')

// Get all users
userRouter.get('/', asyncHandler(async (_req, res) => {
  const users = await User.find({})
  res.json(users)
}))

// Login
userRouter.post('/login', asyncHandler(  async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Email and password are required')
  }

  let user = await User.findOne({ email })
  if (!user) {
    throw new NotFoundError('user not found')
  }
  
  if (user.role === 'company') {
    user = await User.findById(user.id).populate('company_id')
  } else {
    user = await User.findById(user.id).populate('candidate_id')
  }
  
  const passwordCorrect = await bcrypt.compare(password, user.password)
  if (!passwordCorrect) {
    throw new UnauthorizedError('invalid email or password')
  }
  
  const userForToken = {
    email: user.email,
    id: user.id,
    role: user.role
  }

  const token = jwt.sign(
    userForToken, 
    process.env.SECRET,
    { expiresIn: '2 days' }
  )

  const profileData = getProfileData(user)

  res.status(200).json({ 
    token, 
    email: user.email, 
    role: user.role, 
    profile: profileData
  })
}))


// Signup
userRouter.post('/signup', asyncHandler(async (req, res) => {
  const { email, password, role, profileData } = req.body

  validateSignupData(email, password, role, profileData)

  let companyId, candidateId
  if (role === 'company') {
    companyId = await createCompanyProfile(profileData)
  } else {
    candidateId = await createCandidateProfile(profileData)
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({
    email: email.toLowerCase(),
    password: passwordHash,
    role,
    company_id: role === 'company' ? companyId : undefined,
    candidate_id: role === 'candidate' ? candidateId : undefined
  })

  if (role === 'company') {
    await Company.findByIdAndUpdate(companyId, {
      $push: { users: user._id }
    })
  }

  let populatedUser
  if (role === 'company') {
    populatedUser = await User.findById(user._id).populate('company_id')
  } else {
    populatedUser = await User.findById(user._id).populate('candidate_id')
  }

  res.status(201).json({
    id: user.id,
    email: user.email,
    role: user.role,
    profile: role === 'company' ? populatedUser.company_id : populatedUser.candidate_id
  })
}))

module.exports = userRouter