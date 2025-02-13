const mongoose = require('mongoose')
const job = require('./job')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['candidate', 'company'], required: true }
})

const companySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  industry: { type: String, required: true },
  job_posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
  // location: { type: String, required: true },
})

const candidateSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  applications : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  first_name: { type: String, required: true },
  last_name: { type: String, required: true }
  // resume: { type: String, required: true }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

module.exports = {
  User: mongoose.model('User', userSchema),
  Company: mongoose.model('Company', companySchema),
  Candidate: mongoose.model('Candidate', candidateSchema)
}
