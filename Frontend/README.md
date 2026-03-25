# 🎨 Frontend - Task Management System

## 📌 Overview

This is the frontend of the Task Management System built using:

* React (Vite)
* Tailwind CSS v4

It provides a responsive UI for managing tasks and interacting with backend APIs.

---

## ✨ Features

* User authentication (login/signup)
* Task listing
* Create & update tasks via modal
* Delete tasks
* Dark mode toggle
* Mobile-first responsive design

---

## ⚙️ Setup Instructions

### 1. Navigate to Frontend Folder

```bash
cd frontend
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Run Development Server

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```

---

## 📁 Folder Structure

```bash
src/
│── api/              # Axios configuration
│── components/       # Reusable UI components
│── pages/            # App pages (Login, Signup, Dashboard)
│── context/          # Global state (Auth, Theme)
│── App.jsx
│── main.jsx
```

---

## 🧠 Key Design Decisions

### 1. Component-Based Architecture

* Reusable components like TaskCard, TaskModal
* Separation of UI and logic

---

### 2. Context API for State Management

* AuthContext → manages authentication
* ThemeContext → handles dark mode

---

### 3. Tailwind CSS (Utility-First)

* Fast UI development
* Mobile-first design
* Built-in dark mode support

---

### 4. API Integration Layer

* Centralized Axios instance
* Automatic token attachment using interceptors

---

### 5. Dark Mode Implementation

* Global theme state using Context API
* Stored in localStorage
* Applied via Tailwind `dark` class

---

## 📌 Future Improvements

* Better UI animations
* Charts for analytics
* Pagination & sorting

---


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

