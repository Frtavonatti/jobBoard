const signInRouter = require('express').Router()
const { User } = require('../models/users')

// Use bcrypt to hash the password, and JWT to create a token

signInRouter.post('/', async (req, res) => {
  const { email, password, role } = req.body

  try {
    const user = await User.create({ email, password, role })
    res.json(user)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = signInRouter
