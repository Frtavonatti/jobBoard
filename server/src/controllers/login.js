const loginRouter = require('express').Router()
const { User } = require('../models/users')

loginRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ email: body.email })
  if (!user) {
    return res.status(401).json({ error: 'invalid email' })
  }

  if (user.password !== body.password) {
    return res.status(401).json({ error: 'invalid password' })
  }

  res.json(user)
})

// Get all users
loginRouter.get('/', async (req, res) => {
  const users = await User.find({ })
  res.json(users)
})

module.exports = loginRouter