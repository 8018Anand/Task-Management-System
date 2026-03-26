# 🎨 Frontend - Task Management System

## 📌 Overview

This is the frontend of the Task Management System built using React and Tailwind CSS.

It provides a responsive and user-friendly interface for managing tasks and interacting with backend APIs.

---

## ✨ Features

* User authentication (login/signup)
* Task listing and management
* Create and update tasks using modal forms
* Delete tasks
* Filter and search functionality
* Dark mode toggle
* Mobile-first responsive design

---

## ⚙️ Setup Instructions

### 1. Navigate to Frontend Folder

```bash id="1i6k5r"
cd frontend
```

---

### 2. Install Dependencies

```bash id="1q5wdf"
npm install
```

---

### 3. Run Development Server

```bash id="0px2n3"
npm run dev
```

Application runs at:

```id="3hccsp"
http://localhost:5173
```

---

## 📁 Folder Structure

```bash id="h0pnqf"
src/
│── api/              # Axios configuration
│── components/       # Reusable UI components
│── pages/            # Application pages
│── context/          # Global state (Auth, Theme)
│── App.jsx
│── main.jsx
```

---

## 🧠 Key Design Decisions

### 1. Component-Based Architecture

* Reusable components like TaskCard and TaskModal
* Clear separation of UI and logic

---

### 2. State Management with Context API

* AuthContext manages authentication state
* ThemeContext handles dark mode

---

### 3. Tailwind CSS (Utility-First)

* Rapid UI development
* Mobile-first design approach
* Built-in support for dark mode

---

### 4. API Layer Abstraction

* Centralized Axios instance
* Automatic token handling using interceptors

---

### 5. Dark Mode Implementation

* Global theme state using Context API
* Stored in localStorage
* Applied using Tailwind's `dark` class

---

## 📌 Future Improvements

* Enhanced UI/UX animations
* Charts for analytics visualization

---
