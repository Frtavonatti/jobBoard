const signInRouter = require('express').Router()
const { User } = require('../models/users')
const bcrypt = require('bcrypt')

signInRouter.post('/', async (req, res) => {
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

module.exports = signInRouter
