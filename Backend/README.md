# ⚙️ Backend - Task Management System

## 📌 Overview

This is the backend service for the Task Management System built using:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## ⚙️ Setup Steps

### 1. Navigate to Backend Folder

```bash
cd backend
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run Server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## 🔐 Authentication

JWT-based authentication is used.

Include token in requests:

```
Authorization: Bearer <token>
```

---

## 📡 API Endpoints

### 🔑 Auth Routes

#### Signup

```
POST /api/auth/signup
```

#### Login

```
POST /api/auth/login
```

---

### 📋 Task Routes (Protected)

#### Create Task

```
POST /api/tasks
```

#### Get All Tasks

```
GET /api/tasks
```

#### Update Task

```
PUT /api/tasks/:id
```

#### Delete Task

```
DELETE /api/tasks/:id
```

---

## 🧠 Design Decisions

### 1. Layered Architecture

* Models → Schema
* Controllers → Business logic
* Routes → API endpoints
* Middleware → Authentication

---

### 2. JWT Authentication

* Stateless authentication
* Scalable and simple

---

### 3. User-Based Data Isolation

* Tasks linked to user ID
* Ensures secure access

---

### 4. Password Security

* Hashed using bcrypt
* No plain-text storage

---

### 5. MongoDB with Mongoose

* Flexible schema design
* Easy data modeling

---

## 📌 Future Improvements

* Filtering & search
* Analytics endpoints
* Pagination & sorting
* Global error handling

---

## ✅ Version Status

* ✔ Version 1 Completed
* ✔ Version 2 Integrated with frontend
* 🚧 Version 3 in progress

---
