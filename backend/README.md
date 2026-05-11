# User Management Security System

## 📌 Overview
This project is a secure user management system built using React.js and Node.js.  
The project demonstrates advanced web security implementations including JWT authentication, rate limiting, CORS protection, logging, and HTTP security headers.

---

# 🚀 Features

- User Registration & Login
- JWT Authentication
- Password Hashing using bcrypt
- Input Validation using validator
- API Security Hardening
- Rate Limiting using express-rate-limit
- Security Headers using Helmet
- CORS Protection
- Login Monitoring & Logging
- Protected API Structure

---

# 🔐 Security Implementations

## 1. JWT Authentication
Secure user authentication using JSON Web Tokens.

## 2. Password Hashing
Passwords are encrypted using bcrypt before storage.

## 3. Rate Limiting
Brute-force attacks are prevented using express-rate-limit middleware.

## 4. Helmet Security Headers
Implemented:
- Content-Security-Policy (CSP)
- Strict-Transport-Security (HSTS)
- X-Frame-Options

## 5. CORS Protection
Restricted API access using CORS middleware.

## 6. Logging & Monitoring
Login attempts and suspicious activities are logged using logger middleware.

---

# 🛠 Technologies Used

## Frontend
- React.js

## Backend
- Node.js
- Express.js

## Security Libraries
- Helmet
- express-rate-limit
- bcrypt
- jsonwebtoken
- validator
- cors

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/WAQARALI814/user-management-security.git