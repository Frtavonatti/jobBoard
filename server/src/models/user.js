const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  industry: { type: String, required: true },
  job_posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const candidateSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
})

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['candidate', 'company'], required: true },
  company_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company',
    required: function() { return this.role === 'company'; }
  },
  candidate_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Candidate',
    required: function() { return this.role === 'candidate'; }
  }
})

// Transform functions
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

companySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

candidateSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = {
  User: mongoose.model('User', userSchema),
  Company: mongoose.model('Company', companySchema),
  Candidate: mongoose.model('Candidate', candidateSchema)
}
