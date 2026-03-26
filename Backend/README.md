# ⚙️ Backend - Task Management System

## 📌 Overview

This is the backend service for the Task Management System built using Node.js, Express, and MongoDB.

It provides APIs for authentication, task management, filtering, and analytics.

---

## ⚙️ Setup Steps

### 1. Navigate to Backend Folder

```bash id="v8l6eq"
cd backend
```

---

### 2. Install Dependencies

```bash id="8i5f0r"
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file:

```env id="jq1k7r"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run Server

```bash id="6i7xq6"
npm run dev
```

Server runs at:

```id="5jex7c"
http://localhost:5000
```

---

## 🔐 Authentication

JWT-based authentication is implemented.

Include token in requests:

```id="f6c41s"
Authorization: Bearer <token>
```

---

## 📡 API Endpoints

### 🔑 Auth Routes

#### Signup

```id="sgk61n"
POST /api/auth/signup
```

#### Login

```id="xf3a3b"
POST /api/auth/login
```

---

### 📋 Task Routes (Protected)

#### Create Task

```id="0l0h4k"
POST /api/tasks
```

#### Get Tasks (with filters & search)

```id="6x4nvl"
GET /api/tasks?status=&priority=&search=
```

---

#### Update Task

```id="we9dtr"
PUT /api/tasks/:id
```

---

#### Delete Task

```id="2b4b6m"
DELETE /api/tasks/:id
```

---

#### Analytics

```id="c0s6n6"
GET /api/tasks/analytics
```

---

## 🧠 Design Decisions

### 1. Layered Architecture

* Models → Database schemas
* Controllers → Business logic
* Routes → API endpoints
* Middleware → Authentication

---

### 2. JWT Authentication

* Stateless authentication mechanism
* Scalable and secure

---

### 3. User-Based Data Isolation

* Tasks are associated with individual users
* Ensures secure data access

---

### 4. Password Security

* Passwords hashed using bcrypt
* No plain-text storage

---

### 5. MongoDB with Mongoose

* Flexible schema design
* Efficient data querying

---

## 📌 Future Improvements

* Centralized error handling
* Input validation using libraries

---
