const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['text', 'multipleChoice', 'boolean'], 
    default: 'text' 
  },
  required: { type: Boolean, default: false },
  options: [String],
})

const jobSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  title: { type: String, required: true },
  company: { type: String },
  location: { type: String },
  employmentType: { type: String },
  seniority: { type: String },
  description: { type: String },
  salary: { type: Number },
  datePosted: { type: Date },
  requirements: { type: [String] },
  tasks: { type: [String] },
  questions: [questionSchema],
})

jobSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Job', jobSchema)
