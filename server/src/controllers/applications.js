const applicationsRouter = require('express').Router();
const Application = require('../models/application');
const asyncHandler = require('../middleware/asyncHandler');
const { verifyToken, findCompany, verifyCompanyRole, verifyJobOwnership } = require('../middleware/auth');
const { validateApplication } = require('../utils/applicationUtils');

// GET all applications
applicationsRouter.get('/', asyncHandler(async (_req, res) => {
  const applications = await Application.find({});
  res.status(200).json(applications);
}));

// GET application by id
applicationsRouter.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const application = await Application.findById(id);
  res.status(200).json(application);
}));

// GET applications for a job
applicationsRouter.get('/jobs/:jobId', 
  [ verifyToken ], // add findCompany, verifyCompanyRole, verifyJobOwnership 
  asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const applications = await Application.find({ job_id: jobId });
  res.status(200).json(applications);
}));

// POST new application
applicationsRouter.post('/:jobId/apply', verifyToken, asyncHandler(async (req, res) => {
  const body = req.body;
  const jobId = req.params.jobId;
  const userId = req.userId;

  const [user, job] = await validateApplication(userId, jobId);

  const answers = Object.entries(body.answers)
  .map(([question_id, answer]) => {
    return {
      question_id,
      answer,
    };
  });

  const application = new Application({
    candidate_id: user.candidate_id,
    job_id: job._id,
    date: new Date(),
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || "",
      location: body.location || "",
      portfolio: body.portfolio || "",
    },
    answers,
  });

  const savedApplication = await application.save();
  res.status(201).json(savedApplication);
}));

module.exports = applicationsRouter;