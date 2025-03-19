# General
- [x] Implement protected routes in frontend
- [ ] Check if its necessary to protect routes in backend
- [ ] Implement notifications to allow user to visualize the state of the requests

# Apply to jobs feature
### Server
- [x] Create a applyToJob method in the jobService
- [x] Create application schema in the backend
- [x] Create backend functionality to apply to a job
- [x] Create answer and question schemas
- [x] Create auth validation Middleware
- [x] Extend errorHandler Middleware
- [ ] Integrate answer and question to application and job controllers
 - [x] Create POST application controller
 - [ ] Create answer in application controller

### Status Management
- [ ] Create endpoint to update application status (applied → interview → accepted/rejected)

### Security
- [ ] Ensure only companies that own the job can view applications for that job

### Notifications
- [ ] Implement system to notify application status changes

### User Interface
- [ ] Design interface that allows:
  - Companies: create questions and review answers
  - Candidates: answer questions dynamically based on question type

### Client
**Logic**
- [ ] Create company questions for the application form
- [ ] Create a way to add questions to the application form
- [ ] Create form to enable the user to answer the questions in the application form

**UI**
- [ ] Make all inputs required
- [x] Disable input completion if user profile already has the data
- [ ] Track application status (applied, reviewed, rejected, etc.)
- [ ] Add file upload for resume/CV (with size/type restrictions) (optional)

# My applications feature
**Candidates**
- [ ] Create 'api/applications/userId' endpoint
- [ ] Allow candidates to view their submitted applications

**Companies**
- [ ] Allow companies to view the applications for each job post