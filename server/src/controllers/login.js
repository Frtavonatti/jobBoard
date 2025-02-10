const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/users')

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)
  
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid email or password' })
  }

  console.log(user); // delete this line
  
  const userForToken = {
    email: user.email,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200)
    .json({ token, email: user.email, role: user.role })
})


// Get all users
loginRouter.get('/', async (req, res) => {
  const users = await User.find({ })
  res.json(users)
})

module.exports = loginRouter