# JobBoard - MERN Application

## **Overview**
JobBoard is a job listing platform built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to browse and apply for jobs, while companies can create, edit, and manage their job postings.

---

## **Features**

### **For Users**
1. **User Authentication**: 
   - Register and login securely using JWT-based authentication.
2. **Browse Jobs**: 
   - View job postings from all companies.
   - Filter job listings based on location, salary, experience level, title, and modality (remote, hybrid, or onsite).
3. **Interact with Jobs**: 
   - Like job posts.
   - Apply for jobs.
4. **View Job Details**:
   - Access detailed information about a job (e.g., description, requirements).

### **For Companies**
1. **Manage Job Posts**:
   - Create new job postings.
   - Edit or delete existing postings.
2. **Dashboard**:
   - View a list of all jobs posted by the company.

---

## **Tech Stack**

### **Frontend**
- **React.js**: For building a responsive and interactive user interface.
- **CSS Frameworks**: TailwindCSS.

### **Backend**
- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Framework for building RESTful APIs.

### **Database**
- **MongoDB**: NoSQL database for managing users, jobs, and applications.

### **Authentication**
- **JWT (JSON Web Tokens)**: For secure user sessions.

---

## **Project Structure**
```plaintext
JobBoard/
│
├── client/             # Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/ # Reusable components (Navbar, Footer, etc.)
│   │   ├── pages/      # Pages (Home, Login, JobDetails, Dashboard, etc.)
│   │   ├── context/    # Global state management
│   │   └── utils/      # Utility functions (API requests, validations)
│   └── package.json
│
├── server/             # Backend
│   ├── controllers/    # Business logic for routes
│   ├── models/         # MongoDB models (User, JobPost, etc.)
│   ├── routes/         # Route definitions
│   ├── middlewares/    # Authentication and validation middlewares
│   ├── utils/          # Helper functions (e.g., JWT handling)
│   └── server.js       # Entry point for the server
│
└── package.json
```

---

## **Endpoints**

### **Authentication**
- `POST /auth/register`: User registration.
- `POST /auth/login`: User login.

### **Jobs**
- `GET /jobs`: Fetch all job postings with optional filters.
- `GET /jobs/:id`: Fetch details of a specific job.
- `POST /jobs`: Create a new job post (company only).
- `PUT /jobs/:id`: Edit a job post (company only).
- `DELETE /jobs/:id`: Delete a job post (company only).

### **User Interactions**
- `POST /jobs/:id/like`: Like a job post.
- `POST /jobs/:id/apply`: Apply for a job.

### **Company Dashboard**
- `GET /my-jobs`: List all jobs created by the authenticated company.

---

<!-- ## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-repo/jobboard.git
cd jobboard
```

### **2. Install Dependencies**
#### Backend:
```bash
cd server
npm install
```
#### Frontend:
```bash
cd client
npm install
```

### **3. Environment Variables**
Create a `.env` file in the `server` directory with the following:
```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

### **4. Run the Application**
#### Backend:
```bash
cd server
npm start
```
#### Frontend:
```bash
cd client
npm start
```

--- -->

## **Roadmap**
- **Phase 1**: Core functionalities (user and company features, job postings, filters).
- **Phase 2**: Add user profile pages and job application tracking.
- **Phase 3**: Implement notifications and email integration.

---

## **License**
This project is licensed under the MIT License.
