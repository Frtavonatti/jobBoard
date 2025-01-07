# TODO - Backend Development

## **Setup**
- [x] Initialize a Node.js project (`npm init`).
- [x] Install dependencies: `express`, `mongoose`, `dotenv`, `cors`, `bcrypt`, `jsonwebtoken`.
- [ ] Set up the project structure:
  - [ ] `controllers/`
  - [ ] `models/`
  - [ ] `routes/`
  - [ ] `middlewares/`
  - [ ] `utils/`

## **Environment Setup**
- [ ] Create `.env` file.
- [ ] Configure MongoDB connection (`MONGO_URI`).
- [ ] Set up a port (`PORT`) and JWT secret (`JWT_SECRET`).

## **User Authentication**
- [ ] Create User model:
  - [ ] Fields: `name`, `email`, `password`, `role` (`user`, `company`), `likedJobs`.
- [ ] Add registration route (`/auth/register`):
  - [ ] Validate input.
  - [ ] Hash password using `bcrypt`.
  - [ ] Save user to database.
- [ ] Add login route (`/auth/login`):
  - [ ] Validate credentials.
  - [ ] Generate JWT token.
- [ ] Create authentication middleware (`authMiddleware.js`).

## **JobPost Management**
- [ ] Create JobPost model:
  - [ ] Fields: `title`, `description`, `company`, `location`, `salary`, `experienceLevel`, `type`, `likes`.
- [ ] Add route to create job posts (`POST /jobs`):
  - [ ] Restrict access to `company` role.
- [ ] Add route to edit job posts (`PUT /jobs/:id`):
  - [ ] Ensure only the company that created the post can edit it.
- [ ] Add route to delete job posts (`DELETE /jobs/:id`):
  - [ ] Ensure only the company that created the post can delete it.

## **Job Listings and Details**
- [ ] Add route to fetch all jobs (`GET /jobs`):
  - [ ] Add support for filters (location, salary, experienceLevel, type).
- [ ] Add route to fetch a specific job by ID (`GET /jobs/:id`).

## **User Interactions**
- [ ] Add route to like a job (`POST /jobs/:id/like`):
  - [ ] Update the `likedJobs` field in the user model.
- [ ] Add route to apply for a job (`POST /jobs/:id/apply`).

## **Company Dashboard**
- [ ] Add route to fetch all jobs posted by the authenticated company (`GET /my-jobs`).

## **Testing and Debugging**
- [ ] Test each endpoint using Postman or a similar tool.
- [ ] Handle errors and edge cases with appropriate HTTP responses.
- [ ] Add logging for debugging (e.g., using `morgan`).

## **Final Steps**
- [ ] Document API endpoints in a `README.md` or API documentation tool.
- [ ] Push code to version control (e.g., GitHub).
- [ ] Set up deployment for the backend (e.g., Heroku, Render, etc.).
