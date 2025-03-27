# Job Board Features

### General fixes: 
- [ ] Implement verifyCandidateRole middleware for candidate applications 
- [ ] Fix answers questions population (currently being populated by job) **application controller**



## Authentication & Security
- [x] Implement protected routes in frontend
- [ ] Check if its necessary to protect routes in backend
- [ ] Ensure only companies that own the job can view applications for that job

## Job Applications
### Backend
- [x] Create application schema
- [x] Create answer and question schemas
- [x] Create applyToJob method in jobService
- [x] Create backend functionality to apply to a job
- [x] Create POST application controller
- [x] Create answer in application controller
- [x] Integrate answer and question to application and job controllers
- [ ] Create endpoint to update application status

### Frontend
#### Companies View
- [x] Design interface for creating questions
- [x] Improve interface for editing questions
- [x] Allow companies to view applications for each job post (include drag and drop)
- [ ] Implement feature to update application status from drag and drop **next**
- [ ] Design interface for reviewing answers **current**
- [ ] Implement interactivy for review application page

#### Candidates View
- [ ] Create 'My Applications' page to view submitted applications
- [ ] Create 'My Profile' section to allow users modify its personal data
- [x] Design interface for answering questions dynamically
- [ ] Track application status (applied, reviewed, rejected, etc.)

#### UI Components
- [ ] Make all inputs required (apply to job feature)
- [ ] Add file upload for resume/CV (optional)

## Notifications System
- [ ] Implement notifications for request states
- [ ] Implement system to notify application status changes
- [ ] Create status management flow (applied → interview → accepted/rejected)
