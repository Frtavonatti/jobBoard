# TODO - Frontend Development

## **Setup**
- [x] Initialize React app using `create-react-app` or `Vite`.
- [ ] Install dependencies: `axios`, `react-router-dom`, `context`, `tailwindcss`.
- [ ] Set up the project structure:
  - [x] `components/`
  - [ ] `pages/`
  - [ ] `context/`
  - [ ] `utils/`

## **Global State Management**
- [ ] Set up Context API or Redux for state management.
- [ ] Create authentication context to handle user login state and token management.

## **Authentication Pages**
- [ ] Build the **Login** page:
  - [ ] Form for email and password.
  - [ ] Call `/auth/login` API and store token.
- [ ] Build the **Register** page:
  - [ ] Form for name, email, password, and role selection (user or company).
  - [ ] Call `/auth/register` API.

## **User Dashboard**
- [ ] Create a **Job Listings** page:
  - [ ] Fetch all jobs from `/jobs`.
  - [ ] Add filters (location, salary, experience level, type).
  - [ ] Display job cards with summary details (title, company, location).
- [ ] Build the **Job Details** page:
  - [ ] Fetch job details from `/jobs/:id`.
  - [ ] Display job description, requirements, and company details.
  - [ ] Add buttons for liking and applying to jobs.

## **Company Dashboard**
- [ ] Create the **My Job Posts** page:
  - [ ] Fetch jobs posted by the company from `/my-jobs`.
  - [ ] Display job cards with options to edit or delete.
- [ ] Build the **Create/Edit Job Post** page:
  - [ ] Form to add or edit job details (title, description, location, salary, experience level, type).
  - [ ] Call `/jobs` API for creation or updating.

## **Navigation and Layout**
- [ ] Create a **Navbar**:
  - [ ] Links to home, login/register, dashboard, and logout.
  - [ ] Update dynamically based on authentication state.
- [ ] Create a **Footer** with basic links and branding.

## **Styling and Responsiveness**
- [ ] Set up global styling using TailwindCSS or Material UI.
- [ ] Ensure mobile responsiveness for all pages.
- [ ] Add loading indicators for API calls.
- [ ] Display error and success messages using alerts or modals.

## **Integration with Backend**
- [ ] Use `axios` to call backend APIs.
- [ ] Handle token-based authentication in API requests.
- [ ] Store user session data in `localStorage` or context.

## **Testing and Debugging**
- [ ] Test navigation and routing.
- [ ] Verify API calls for all user actions (login, job interactions, etc.).
- [ ] Debug layout issues for different screen sizes.

## **Final Steps**
- [ ] Conduct end-to-end testing.
- [ ] Optimize performance (e.g., code-splitting, lazy loading).
- [ ] Push code to version control (e.g., GitHub).
- [ ] Deploy frontend (e.g., Netlify, Vercel, etc.).
