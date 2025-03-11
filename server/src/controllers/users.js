const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Company, Candidate } = require('../models/user')

// Login
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body

  let user = await User.findOne({ email })
  
  if (!user) {
    return res.status(401).json({ error: 'invalid email or password' })
  }
  
  if (user.role === 'company') {
    user = await User.findById(user.id).populate('company_id')
  } else {
    user = await User.findById(user.id).populate('candidate_id')
  }
  
  const passwordCorrect = await bcrypt.compare(password, user.password)
  if (!passwordCorrect) {
    return res.status(401).json({ error: 'invalid email or password' })
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

  let profileData = null
  if (user.role === 'company' && user.company_id) {
    profileData = {
      id: user.company_id._id,
      name: user.company_id.name,
      industry: user.company_id.industry
    }
  } else if (user.role === 'candidate' && user.candidate_id) {
    profileData = {
      id: user.candidate_id._id,
      firstName: user.candidate_id.first_name,
      lastName: user.candidate_id.last_name
    }
  }

  res.status(200).json({ 
    token, 
    email: user.email, 
    role: user.role, 
    profile: profileData
  })
})

// Signup
userRouter.post('/signup', async (req, res) => {
  const { email, password, role, profileData } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    let companyId, candidateId

    if (role === 'company') {
      let company = await Company.findOne({ name: profileData.name })

      if (!company) {
        company = await Company.create({
          name: profileData.name,
          industry: profileData.industry,
          job_posts: [],
          users: []
        })
      }
      companyId = company._id

    } else {
      const candidate = await Candidate.create({
      first_name: profileData.first_name,
      last_name: profileData.last_name
      })
      candidateId = candidate._id
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({
      email,
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
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

// Get all users
userRouter.get('/', async (req, res) => {
  const users = await User.find({ })
  res.json(users)
})

module.exports = userRouter