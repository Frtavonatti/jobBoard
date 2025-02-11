const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/users')

// Login
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)
  
  if (!(user && passwordCorrect)) {
    console.log('invalid email or password');
    return res.status(401).json({ error: 'invalid email or password' })
  }
  
  const userForToken = {
    email: user.email,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200)
    .json({ token, email: user.email, role: user.role })
})

// Sign up
userRouter.post('/signup', async (req, res) => {
  const { email, password, role } = req.body

  const userExist = await User.findOne({ email })
  if (userExist) {
    return res.status(400).json({ error: 'User already exists' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const user = await User.create({ 
      email, 
      password: passwordHash, 
      role 
    })
    res.status(201).json(user)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Get all users
userRouter.get('/', async (req, res) => {
  const users = await User.find({ })
  res.json(users)
})

module.exports = userRouter