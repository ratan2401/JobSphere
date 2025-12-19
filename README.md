# JobSphere

A simple full-stack job board where users can search jobs, register/login, update their profile, post jobs, and submit applications.

## Features

- Search jobs by keyword and location
- User authentication (register, login, JWT-based sessions)
- Profile view and update (name, college, company, phone)
- Post a job (title, company, location, experience, education, skills)
- Apply to jobs (basic form capture; stores resume filename)
- Clean UI built with React + Tailwind

## Tech Stack

- Client: React (Vite), Tailwind CSS
- Server: Node.js, Express, Mongoose (MongoDB), JWT, dotenv, CORS
- Data: MongoDB (via Mongoose)

## Monorepo Structure

```
JobSphere/
├── client/                  # React + Vite frontend
│   ├── public/
│   └── src/
│       ├── api/axios.js     # API client baseURL
│       ├── components/      # UI components
│       └── pages/           # Views: Home, Jobs, Login, Profile, PostJob, ApplyJob
└── server/                  # Express backend
    └── src/
        ├── app.js           # Express app + CORS + routes
        ├── server.js        # Entry point (dotenv, DB, listen)
        ├── config/db.js     # Mongo connect (MONGO_URI)
        ├── middleware/      # auth (JWT)
        ├── models/          # User, Job, Application
        ├── controllers/     # auth/jobs/applications handlers
        └── routes/          # /api/auth, /api/jobs, /api/applications
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A MongoDB instance (local or cloud)

### 1) Server setup

Create `server/.env` with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Install and run the server:

```bash
cd server
npm install
npm run dev
```

The API will default to `http://localhost:5000`.

### 2) Client setup

Install and run the client:

```bash
cd client
npm install
npm run dev
```

The client runs at `http://localhost:5173` and calls the API at `http://localhost:5000/api` (see `src/api/axios.js`).

### CORS

The server enables CORS for `http://localhost:5173` with credentials support. If you change client origin or port, update the CORS `origin` in `server/src/app.js` and the client API base URL in `client/src/api/axios.js`.

## Available Scripts

- Client
  - `npm run dev` — start Vite dev server
  - `npm run build` — production build
  - `npm run preview` — preview production build
  - `npm run lint` — lint source
- Server
  - `npm run dev` — start with nodemon
  - `npm start` — start with node

## API Overview

Base URL: `http://localhost:5000/api`

- Auth
  - `POST /auth/register` — `{ name, username, email, password }`
  - `POST /auth/login` — `{ email, password }` → `{ token, user }`
  - `GET /auth/me` — (Bearer token) → user profile
  - `PUT /auth/me` — (Bearer token) update `{ name, college, company, phone }`
- Jobs
  - `POST /jobs` — (Bearer token) create job
  - `GET /jobs?skill=...&location=...&page=1&limit=50` — list jobs with filters
- Applications
  - `POST /applications` — (Bearer token) submit application `{ jobId, name, email, mobile, college, skills, resume }`
  - `GET /applications/job/:jobId` — (Bearer token) list applications for a job

## Notes & Tips

- Tokens: On login, the client stores the JWT in `localStorage` and sends it via `Authorization: Bearer <token>`.
- Skills: On job posting, skills are provided as a comma-separated list and saved as an array.
- Resume: The application form currently captures a resume filename; file storage/upload middleware is not configured.

## Screens

- Home: Search bar, quick filters, login modal, CTA
- Jobs: Results list with apply actions
- PostJob: Form for authenticated users
- Profile: View and update user details
- ApplyJob: Application form for a specific job

## Troubleshooting

- Ensure MongoDB is reachable using `MONGO_URI`.
- Verify `JWT_SECRET` is set; protected routes require a valid token.
- Match client `baseURL` and server `PORT`.
- If CORS errors occur, confirm `origin` in server CORS settings matches your client URL.

---

Made with ❤️ by the JobSphere team.
