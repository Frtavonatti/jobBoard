const applicationsRouter = require('express').Router();
const Application = require('../models/application');
const asyncHandler = require('../middleware/asyncHandler');
const { verifyToken, findCompany, verifyCompanyRole, verifyJobOwnership } = require('../middleware/auth');
const { validateApplication } = require('../utils/applicationUtils');

// GET all applications
applicationsRouter.get('/',  
  asyncHandler(async (_req, res) => {
  const applications = await Application.find({});
  res.status(200).json(applications);
}));

// GET application by id (companies)
applicationsRouter.get('/:id', 
  [ verifyToken, verifyCompanyRole, findCompany ], // Add modified verifyJobOwnership
  asyncHandler(async (req, res) => {
  const id = req.params.id;

  // TODO: Populate application with job details is a provisory solution
  const application = await Application.findById(id)
    .populate({
      path: 'job_id',
      select: 'questions title company'
    })
    .lean();
  
  // If application found, enhance the answers with question text
  if (application) {
    // Map the answers to include question text from job questions
    application.answers = application.answers.map(answer => {
      const question = application.job_id.questions.find(
        q => q._id.toString() === answer.question_id.toString()
      );
      
      return {
        ...answer,
        questionText: question ? question.questionText : 'Question not found',
        questionType: question ? question.questionType : 'text'
      };
    });
  }
  res.status(200).json(application);
}));

// GET my applications (candidates)
applicationsRouter.get('/user/:userId', 
  asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const applications = await Application.find({ candidate_id: userId })
    .populate({ path: 'job_id', select: 'title company' });
  res.status(200).json(applications);
  }
));

// GET applications for a job
applicationsRouter.get('/jobs/:jobId', 
  [ verifyToken, verifyCompanyRole, findCompany, verifyJobOwnership ],
  asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const applications = await Application.find({ job_id: jobId });
  res.status(200).json(applications);
}));

// POST new application (candidate applies to job)
applicationsRouter.post('/:jobId/apply', 
  verifyToken, // Implement verifyCandidateRole middleware
  asyncHandler(async (req, res) => {
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

// PUT update application status
applicationsRouter.put('/:id', 
  [ verifyToken, verifyCompanyRole, findCompany ],
  asyncHandler(async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;

  const updatedApplication = await Application.findByIdAndUpdate(id, { status }, { new: true });
  res.status(200).json(updatedApplication);
}));

module.exports = applicationsRouter;