# 🔐 User Management API (Secure Backend)

A production-style Node.js + Express + MySQL backend application with:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Password Hashing
- Rate Limiting
- Strong Password Validation
- Transaction-based MySQL operations
- Clean layered architecture

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- Login with JWT
- Password hashing using bcrypt
- Strong password policy enforcement

### 🛡 Authorization
- Role-based access control (Admin / User)
- Protected routes using JWT middleware

### ⚡ Security Enhancements
- Rate limiting to prevent brute-force attacks
- Secure HTTP headers (Helmet)
- Environment-based configuration
- Centralized error handling

### 🗄 Database
- MySQL relational database
- Transaction-based inserts
- Foreign key relationships
- Indexed fields for performance

---

## 🏗 Architecture

Layered architecture:

Routes → Controllers → Services → Models → Database


- Controllers handle HTTP logic
- Services contain business logic
- Models manage data structure
- Middleware handles authentication & authorization

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MySQL
- JWT (jsonwebtoken)
- bcryptjs
- express-rate-limit
- Helmet
- dotenv

---

## 🔐 Authentication Flow

1. User registers → password is hashed
2. User logs in → JWT token is generated
3. Protected routes require:


Authorization: Bearer <TOKEN>


4. Middleware verifies token before allowing access

---

## 📌 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login and receive JWT |

### 👥 User Routes (Protected)

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /api/users | Admin only |
| GET | /api/users/:id | Admin or Owner |
| DELETE | /api/users/:id | Admin only |

---

## ⚙️ Installation

```bash
git clone https://github.com/monishabharadwaj/UserManagementNodeAPI.git
cd UserManagementNodeAPI
npm install
🔧 Environment Variables

Create a .env file:


PORT=8084
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=usermanagement
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
NODE_ENV=development

▶️ Run Server

npm start


Server runs at:


http://localhost:8084

```

## 🛡 Security Measures Implemented

Password hashing with bcrypt

Strong password validation

JWT token-based authentication

Role-based access control

Rate limiting on login routes

Environment variable protection

## 🔮 Future Improvements

Refresh token implementation

Account lock after failed attempts

Swagger API documentation

Unit & integration testing (Jest)

Deployment to cloud platform

CI/CD pipeline
