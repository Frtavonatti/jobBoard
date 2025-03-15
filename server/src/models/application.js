const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  candidate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  status: { type: String, enum: ['applied', 'interview', 'accepted', 'rejected'], default: 'applied' },
  data: { type: Object },
  date: { type: Date, required: true }
})

applicationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Application', applicationSchema)