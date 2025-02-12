# TODO - Frontend Development

## **Setup**

- [x] Initialize React app using `create-react-app` or `Vite`.
- [x] Install dependencies: `axios`, `react-router-dom`, `context`, `tailwindcss`.
- [x] Set up the project structure:
  - [x] `components/`
  - [x] `pages/`
  - [x] `context/`

## **Global State Management**

- [x] Set up Context for state management.
- [ ] Create authentication context to handle user login state and token management.

## **Authentication Pages**

- [x] Build the **Login** page:
  - [x] Form for email and password.
  - [x] Call `/user/login` API and store token.
- [x] Build the **Register** page:
  - [x] Form for name, email, password, and role selection (user or company).
  - [x] Call `/user/register` API.

## **User Dashboard (CANDIDATES)**

- [x] Create a **Job Listings** page:
  - [x] Fetch all jobs from `/jobs`.
  - [ ] Add filters (location, salary, experience level, type).
  - [x] Display job cards with summary details (title, company, location).
- [x] Build the **Job Details** page:
  - [x] Fetch job details from `/jobs/:id`.
  - [x] Display job description, requirements, and company details.
  - [ ] Add buttons for liking and applying to jobs.

## **Company Dashboard**

- [x] Create the **My Job Posts** page:
  - [ ] Fetch jobs posted by the company from `/my-jobs`.
  - [x] Display job cards with options to edit or delete.
- [x] Build the **Create/Edit Job Post** page:
  - [x] Form to add or edit job details (title, description, location, salary, experience level, type).
  - [x] Call `/jobs` API for creation or updating.

## **Navigation and Layout**

- [x] Create a **Navbar**:
  - [/] Links to home, login/register, dashboard, and logout.
  - [ ] Update dynamically based on authentication state.
- [x] Create a **Footer** with basic links and branding.

## **Styling and Responsiveness**

- [x] Set up global styling using TailwindCSS.
- [ ] Ensure mobile responsiveness for all pages.
- [ ] Add loading indicators for API calls.
- [x] Display error and success messages using alerts or modals.

## **Integration with Backend**

- [x] Use `axios` to call backend APIs.
- [x] Handle token-based authentication in API requests.
- [x] Store user session data in `localStorage` or context.

## **Testing and Debugging**

- [ ] Test navigation and routing.
- [ ] Verify API calls for all user actions (login, job interactions, etc.).
- [ ] Debug layout issues for different screen sizes.

## **Final Steps**

- [ ] Conduct end-to-end testing.
- [ ] Optimize performance (e.g., code-splitting, lazy loading).
- [x] Push code to version control (e.g., GitHub).
- [ ] Deploy frontend (e.g., Netlify, Vercel, etc.).
