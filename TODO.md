# Job Board Features

### General fixes: 
- [x] Update job should add the new questions
- [x] Improve questions preview UI

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
- [ ] Allow companies to view applications for each job post (include drag and drop)
- [ ] Design interface for reviewing answers
#### Candidates View
- [ ] Create 'My Applications' page to view submitted applications
- [ ] Design interface for answering questions dynamically
- [ ] Track application status (applied, reviewed, rejected, etc.)

#### UI Components
- [ ] Make all inputs required (apply to job feature)
- [ ] Add file upload for resume/CV (optional)

## Notifications System
- [ ] Implement notifications for request states
- [ ] Implement system to notify application status changes
- [ ] Create status management flow (applied → interview → accepted/rejected)
