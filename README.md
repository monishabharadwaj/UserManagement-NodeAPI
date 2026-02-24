# User Management Node API

A RESTful User Management API built using **Node.js, Express, and MySQL**.  
This project demonstrates CRUD operations, relational database handling, validation, and layered backend architecture.

---

## 🚀 Features

- Create, Read, Update, Delete Users
- MySQL relational database with foreign keys
- Nested entities support (Address → Geo, Company)
- Transactions for safe inserts & updates
- Request validation using express-validator
- Layered architecture (Controller → Service → Model)
- Connection pooling for database performance
- CORS enabled API

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2 (Promise-based driver)
- express-validator
- dotenv
- cors

---

## 📂 Project Structure


# UserManagementNodeAPI/
      │
      ├── config/ # Database configuration
      ├── controllers/ # Request handlers
      ├── services/ # Business logic
      ├── models/ # Domain models
      ├── routes/ # API routes
      ├── database/ # SQL schema files
      │
      ├── server.js # App entry point
      ├── setup-database.js # Database setup script
      ├── package.json
      ├── .env.example


---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/monishabharadwaj/UserManagementNodeAPI.git
cd UserManagementNodeAPI
2. Install dependencies
npm install
3. Configure environment variables

Create a .env file in project root and add:

PORT=8084
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=usermanagement
4. Create database

Open MySQL and run:

CREATE DATABASE usermanagement;

Then import schema:

mysql -u root -p usermanagement < database/init.sql

5. Start server

Development:

npm run dev

Production:

npm start

Server runs at:

http://localhost:8084

🔎 API Endpoints

Health check

GET /health
Get all users
GET /api/users
Get user by ID
GET /api/users/:id
Get user by username
GET /api/users/username/:username
Get user by email
GET /api/users/email/:email
Create user
POST /api/users

Example request body:

{
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "leanne@email.com",
  "phone": "1234567890",
  "website": "example.com",
  "address": {
    "street": "Main Road",
    "suite": "Apt 1",
    "city": "Bangalore",
    "zipcode": "560001"
  },
  "company": {
    "name": "ABC Pvt Ltd",
    "catchPhrase": "Innovation driven",
    "bs": "technology solutions"
  }
}

Update user
PUT /api/users/:id

Delete user
DELETE /api/users/:id


🧠 Learning Highlights

This project demonstrates:

Relational database schema design

Service-layer backend architecture

Handling nested objects in REST APIs

Using transactions for data consistency

Structuring scalable Node.js backend applications

