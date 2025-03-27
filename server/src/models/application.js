const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, 
    required: true, ref: 'Question' },
  // question_text: { type: String,
  //   required: true }, 
  answer: { type: mongoose.Schema.Types.Mixed, 
    required: true }
})

const applicationSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job' },
  candidate_id: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Candidate' },
  status: { type: String, 
    enum: ['applied', 'screening', 'interview', 'offer', 'hired', 'discarded'], 
    default: 'applied' },
  date: { type: Date, required: true },
  data: { 
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    location: String,
    portfolio: String
  },
  answers: [answerSchema]
})

applicationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Application', applicationSchema)