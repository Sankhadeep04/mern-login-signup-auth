# 🔐 NexusAuth - MERN Stack Authentication System

A modern, full-stack **MERN (MongoDB, Express, React, Node.js)** authentication application with user registration, database verification, password hashing, JWT security, and a protected Home Dashboard.

![Stack](https://img.shields.io/badge/Stack-MongoDB%20%7C%20Express%20%7C%20React%20%7C%20Node.js-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Key Features

- 📝 **Signup Page**: User registration with email format validation, live password strength meter, confirm password match, and automatic login.
- 🔑 **Login Page**: Credential verification against MongoDB database with `bcryptjs` password hashing.
- 🛡️ **Protected Dashboard**: Secured home route accessible only to authenticated users with session details, JWT token management, and logout functionality.
- 🎨 **Modern Glassmorphism UI**: Curated dark theme, vibrant neon accents, responsive design, and smooth micro-animations.

---

## 🛠️ Project Structure

```text
├── backend/
│   ├── config/db.js          # MongoDB Mongoose connection
│   ├── models/User.js        # User model with bcrypt hashing
│   ├── routes/authRoutes.js  # REST API endpoints (signup, login, me)
│   ├── middleware/           # JWT auth protection middleware
│   ├── .env                  # Environment variables (Git-ignored)
│   └── server.js             # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── pages/            # Login, Signup, and Home pages
│   │   ├── context/          # AuthContext provider
│   │   └── index.css         # Glassmorphic styling system
│   └── vite.config.js        # Vite dev server configuration
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Configure Backend Environment
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_jwt_key
```

### 3. Install & Start Backend
```bash
cd backend
npm install
npm start
```
*Backend runs on http://localhost:5000*

### 4. Install & Start Frontend
```bash
cd ../frontend
npm install
npm run dev
```
*Frontend runs on http://localhost:5173*
