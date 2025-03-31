const candidatesRouter = require('express').Router();
const asyncHandler = require('../middleware/asyncHandler');
const { verifyToken } = require('../middleware/auth');
const { User, Candidate } = require('../models/user');
const { NotFoundError, ForbiddenError } = require('../utils/errors');

// Toggle likes of a job
candidatesRouter.post('/like', verifyToken, asyncHandler(async (req, res) => {
  const { jobId } = req.body;

  const user = await User.findById(req.userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  if (user.role !== 'candidate') {
    throw new ForbiddenError('Only candidates can like jobs');
  }

  const candidate = await Candidate.findById(user.candidate_id);
  if (!candidate) {
    throw new NotFoundError('Candidate not found');
  }

  const jobIdStr = jobId.toString();
  const likedJobsIds = candidate.liked_jobs.map(id => id.toString());
  
  let message;
  if (likedJobsIds.includes(jobIdStr)) {
    candidate.liked_jobs = candidate.liked_jobs.filter(id => id.toString() !== jobIdStr);
    await candidate.save();
    message = 'Job unliked successfully';
  } else {
    candidate.liked_jobs.push(jobId);
    await candidate.save();
    message = 'Job liked successfully';
  }

  res.status(201).json({ message: message });
}));

module.exports = candidatesRouter;