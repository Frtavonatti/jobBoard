# Job Board Features

### General fixes (applications controller): 
- [ ] Create routes folders (separate controllers responsability)
- [ ] Implement verifyCandidateRole middleware for candidate applications 
- [ ] Fix answers questions population (currently being populated by job) **application controller**

### Non-critical fixes:
- [ ] Make all inputs required (apply to job feature)
- [ ] Add file upload for resume/CV (optional)

## Job Applications
### Backend
- [x] Create application schema
- [x] Create answer and question schemas
- [x] Create applyToJob method in jobService
- [x] Create backend functionality to apply to a job
- [x] Create POST application controller
- [x] Create answer in application controller
- [x] Integrate answer and question to application and job controllers
- [x] Create endpoint to update application status

### Frontend
#### Companies View
- [x] Design interface for creating questions
- [x] Improve interface for editing questions
- [x] Allow companies to view applications for each job post (include drag and drop)
- [x] Implement feature to update application status from drag and drop
- [x] Design interface for reviewing answers 
- [x] Implement interactivy for review application page

#### Candidates View
- [x] Create 'My Applications' page to view submitted applications
- [ ] Create 'My Profile' section to allow users modify its personal data
- [x] Design interface for answering questions dynamically
- [x] Implement feature to filter jobs (by salary, area, location, others)
- [x] Implement like jobs feature
- [ ] Fix: Page scrolls to top when liking a job post **current**
- [x] Create liked jobs page
- [ ] Evaluate implementation of a follow companies feature

## Notifications System
- [ ] Implement notifications for request states
- [ ] Implement system to notify application status changes

## Deployment
- [ ] Deploy MVP 
