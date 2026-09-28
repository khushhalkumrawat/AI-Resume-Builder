# AI Resume Analyzer

An AI-powered resume builder that helps users create, improve, and export professional, ATS-friendly resumes.

🔗 **Live Demo:** https://ai-resume-analyzer-khushhal.vercel.app/
💻 **GitHub:** https://github.com/khushhalkumrawat/AI-Resume-Analyzer

---

## What it does

AI Resume Analyzer combines a resume builder with AI-powered content improvement.

Users can:

* Create and edit resumes with a live preview
* Build resumes using multiple professional templates
* Upload an existing resume and extract its content
* Improve resume content using AI suggestions
* Analyze resumes and identify areas for improvement
* Export resumes as high-quality PDFs
* Share resumes through public links

---

## Tech Stack

**Frontend**

* React
* Vite
* Redux Toolkit
* React Router
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose

**AI & Authentication**

* OpenAI API
* JWT Authentication

**Deployment**

* Vercel — Frontend
* Render — Backend

---

## How it works

```text
User
 │
 ▼
Create / Upload Resume
 │
 ▼
Edit & Customize
 │
 ▼
AI Analysis & Content Enhancement
 │
 ▼
Live Resume Preview
 │
 ▼
Export / Share
```

---

## Architecture

```text
React + Vite
     │
     │ REST API
     ▼
Express + Node.js
     │
 ┌───┴───────────────┐
 ▼                   ▼
MongoDB           OpenAI API
     │
     ▼
Resume Data
```

The application follows a client-server architecture with protected API routes and JWT-based authentication.

---

## Project Structure

```text
AI-Resume-Analyzer/
│
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       ├── services/
│       └── utils/
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
│
└── README.md
```

---

## Run Locally

### 1. Clone

```bash
git clone https://github.com/khushhalkumrawat/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

### 2. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 3. Environment Variables

**Client**

```env
VITE_API_URL=
```

**Server**

```env
PORT=
IMAGEKIT_PRIVATE_KEY=
JWT_SECRET=
MONGODB_URL=
OPENAI_API_KEY=
OPENAI_BASE_URL=
OPENAI_MODEL=
FRONTEND_URL=
```

### 4. Start the application

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

## Key Highlights

* Full-stack MERN application
* AI-powered resume analysis and content enhancement
* JWT authentication and protected routes
* REST API architecture
* MongoDB-based resume management
* Multiple resume templates
* High-quality PDF generation
* Deployed frontend and backend

---

## Author

### Khushhal Kumrawat

Full Stack Developer • AI/ML Enthusiast

[GitHub](https://github.com/khushhalkumrawat) • [LinkedIn](https://www.linkedin.com/in/khushhal-kumrawat-017bb6390/) • [Email](mailto:khushhalkumrawat25@gmail.com)

---

⭐ If you find the project useful, consider giving it a star.
