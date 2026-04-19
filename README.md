# UAWP — Unified Adapted Web Platform

> A full-stack web platform connecting people with disabilities to verified hospitals, NGOs, therapy centres, and schools. Built with care by **Team InclusionHub**, Metropolitan University, Sylhet.

**Live URL:** https://unified-adapted-web-platform.onrender.com  
**Admin Panel:** https://unified-adapted-web-platform-p28t.vercel.app/admin/login.html
**User Panel:** https://unified-adapted-web-platform-4nya.vercel.app/

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [API Reference](#api-reference)
6. [Setup & Installation](#setup--installation)
7. [Environment Variables](#environment-variables)
8. [Deployment](#deployment)
9. [Admin Access](#admin-access)
10. [Email System](#email-system)

---

## Project Overview

UAWP is a **Node.js + Express** backend with a **vanilla HTML/CSS/JS** frontend. It has two parts:

| Part | Description |
|------|-------------|
| **Web (User Platform)** | Public-facing site where users browse resources, submit help requests, read/share success stories, and register/login |
| **Admin Panel** | Password-protected dashboard for admins to manage help requests, users, stories, and resources |

The backend is hosted on **Render** (free tier — sleeps after inactivity, wakes on first request). The frontend is deployed on **Vercel**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB Atlas (via Mongoose) |
| Email | Nodemailer (Gmail App Password) |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Deployment (Backend) | Render |
| Deployment (Frontend) | Vercel |

---

## Project Structure

```
UAWP_Project/
│
├── app/
│   ├── web/                          # User-facing platform
│   │   ├── controllers/
│   │   │   ├── authController.js     # Signup, Login logic
│   │   │   ├── helpController.js     # Submit/get help requests
│   │   │   ├── resourceController.js # Get/add/delete resources
│   │   │   └── storyController.js    # Stories CRUD + like system
│   │   ├── css/
│   │   │   ├── homepage.css
│   │   │   ├── help.css
│   │   │   ├── login.css
│   │   │   ├── resource.css
│   │   │   └── success.css
│   │   ├── images/
│   │   │   └── hero bg.jpg
│   │   ├── js/
│   │   │   ├── accessibility.js      # Font size, contrast, hamburger menu
│   │   │   ├── help.js               # Multi-step form logic
│   │   │   ├── login.js              # Auth UI logic
│   │   │   ├── resource.js           # Resource cards, filter, modal
│   │   │   └── success.js            # Stories grid, like system
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── helpRoutes.js
│   │   │   ├── resourceRoutes.js
│   │   │   └── storyRoutes.js
│   │   ├── index.html                # Homepage
│   │   ├── help.html                 # Help request form
│   │   ├── login.html                # User login/signup
│   │   ├── resource.html             # Resource directory
│   │   └── success.html              # Success stories
│   │
│   └── admin/                        # Admin panel
│       ├── controllers/
│       │   └── adminController.js    # Admin CRUD for all models
│       ├── css/
│       │   └── admin.css
│       ├── js/
│       │   ├── admin.js              # Dashboard logic
│       │   └── adminAuth.js          # Session-based auth guard
│       ├── routes/
│       │   └── adminRoutes.js
│       ├── login.html                # Admin login page
│       └── dashboard.html            # Admin dashboard
│
├── database/
│   ├── models/
│   │   ├── helpModel.js
│   │   ├── resourceModel.js
│   │   ├── storyModel.js
│   │   └── userModel.js
│   └── db.js                         # MongoDB Atlas connection
│
├── utils/
│   └── emailService.js               # 3 email templates (nodemailer)
│
├── .env                              # Secret keys (NOT committed)
├── .gitignore
├── package.json
├── server.js                         # Express entry point
├── vercel.json                       # Vercel routing config
└── README.md
```

---

## Features

### User Platform
- **Homepage** — Hero section, stats, features overview, CTA
- **Resource Directory** — 30+ verified global resources, filter by country / disability type / category, search, detail modal
- **Help Request** — 4-step wizard form (personal info → disability type → urgency/description → review & submit)
- **Success Stories** — Magazine-style grid, category filter, heart/like system, user story submission (pending admin approval)
- **Auth** — Register & login system, session stored in localStorage, protected routes (help & resource require login)
- **Accessibility** — Font size controls, high contrast toggle, mobile hamburger menu

### Admin Panel
- **Login** — Username + password protection (sessionStorage, 8-hour session)
- **Help Requests** — View all requests, filter by status (Pending/Reviewed/Resolved), search, mark reviewed, resolve & send email, delete
- **Users** — View all registered users, login history, delete
- **Stories** — View all submitted stories, approve/reject, add stories directly (admin-sourced stories go live immediately)
- **Resources** — View all resources, add new resource, delete

---

## API Reference

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login, returns user object |

### Help Requests
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/help` | Submit a help request (sends emails) |
| GET | `/api/help` | Get all requests (admin use) |

### Resources
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/resources` | Get resources (filter: category, disabilityType, country) |
| POST | `/api/resources` | Add a resource |
| DELETE | `/api/resources/:id` | Delete a resource |

### Stories
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/stories` | Get approved stories (filter: category) |
| POST | `/api/stories` | Submit a story (status: Pending) |
| POST | `/api/stories/:id/like` | Toggle like by IP |

### Admin
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/requests` | Get all help requests |
| PATCH | `/api/admin/requests/:id` | Update status / resolve + send email |
| DELETE | `/api/admin/requests/:id` | Delete request |
| GET | `/api/admin/users` | Get all users |
| DELETE | `/api/admin/users/:id` | Delete user |
| GET | `/api/admin/stories` | Get all stories (any status) |
| POST | `/api/admin/stories` | Add story (auto-approved) |
| PATCH | `/api/admin/stories/:id` | Update story status |
| DELETE | `/api/admin/stories/:id` | Delete story |
| GET | `/api/admin/resources` | Get all resources |
| POST | `/api/admin/resources` | Add resource |
| DELETE | `/api/admin/resources/:id` | Delete resource |

---

## Setup & Installation

```bash
# 1. Clone the repository
git clone https://github.com/mahia05/Unified-Adapted-Web-Platform.git
cd uawp

# 2. Install dependencies
npm install

# 3. Create .env file (see Environment Variables below)

# 4. Start the server
node server.js
# Server runs on http://localhost:5000
```

Open `app/web/index.html` in a browser for the frontend (or use Live Server in VS Code).

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/UAWP
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-gmail-app-password
```

---

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Create a new **Web Service** on Render
3. Set Build Command: `npm install`
4. Set Start Command: `node server.js`
5. Add Environment Variables from `.env`
6. Deploy

> **Note:** Free tier Render servers sleep after 15 minutes of inactivity. The frontend handles this with automatic retry logic (up to 4 attempts, 5s apart).

### Frontend (Vercel)
1. Push to GitHub
2. Import project on Vercel
3. No build step needed (static files)
4. `vercel.json` handles all routing automatically
5. Deploy

---

## Admin Access

The admin panel is protected by a client-side username/password check.


**How it works:**
- `login.html` checks credentials against hardcoded values
- On success, sets `sessionStorage.adminAuth = 'true'` with a timestamp
- `adminAuth.js` (loaded first in `dashboard.html`) checks this session on every page load
- Session expires after **8 hours**
- Going directly to `dashboard.html` without logging in redirects to `login.html`



## Email System

Three automated emails are triggered:

| Trigger | Recipient | Description |
|---------|-----------|-------------|
| User submits help request | User | Confirmation email with request summary |
| User submits help request | Admin | Notification with full request details |
| Admin resolves a request | User | Resolution email with optional admin note |

All emails are HTML-formatted with the UAWP brand. Templates are in `utils/emailService.js`.

---

## Team

**InclusionHub** — Metropolitan University, Sylhet  
Team Members:
    01)Mahia Tabassum Chowdhury-Id:231-115-198_CSE-58-(SEC:E)
    02)Auditi Sinha -Id:231-115-190_CSE-58-(SEC:E)
© 2026 UAWP — Unified Adaptive Web Platform
