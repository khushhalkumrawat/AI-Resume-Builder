# AI Resume Analyzer & Builder

Production-grade full-stack MERN application featuring asynchronous PDF compilation, AI-driven content analysis, and an automated continuous integration and delivery (CI/CD) pipeline.

🔗 **[Live Demo](https://ai-resume-analyzer-khushhal.vercel.app/)** • 💻 **[GitHub Repository](https://github.com/khushhalkumrawat/AI-Resume-Analyzer)**

---

## 📌 System Design & Engineering Highlights

### 1. High-Performance Headless PDF Pipeline
* **Problem:** Launching a fresh Chromium instance via `puppeteer.launch()` per export caused 2–3 minute latency spikes and out-of-memory (OOM) crashes under Render's 512 MB memory constraints.
* **Solution:** Implemented a persistent, warm Puppeteer browser singleton configured with low-memory Linux flags (`--disable-dev-shm-usage`, `--single-process`, `--no-sandbox`).
* **Result:** Dropped PDF generation times from ~150 seconds to under 4 seconds while maintaining print-quality typography and multi-page alignment.

### 2. Automated CI/CD & Delivery Gates
* Configured automated multi-stage GitHub Actions workflows executing client linting, Vite bundle compilation, and backend syntax verification.
* Implemented strict branch rulesets targeting `main` to lock merging until status checks pass, preventing regressions from reaching production.
* Enabled automated production releases to **[Vercel](https://vercel.com/)** (Frontend SPA) and **[Render](https://render.com/)** (Backend API) upon pull request merge.

### 3. Latency Mitigation & Auth Isolation
* Kept free-tier cloud instances awake via lightweight `/api/health` monitoring hooks, eliminating 50–90 second cold-start delays on initial login.
* Designed dual-mode JWT authorization: standard session tokens for authenticated user routes and scoped, short-lived tokens (`pdf-render`) for isolated headless browser previews.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Redux Toolkit, Tailwind CSS, Axios, Lucide Icons |
| **Backend** | Node.js, Express.js, Puppeteer (Headless PDF engine) |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **AI & Media** | OpenAI / Gemini API, ImageKit |
| **DevOps** | GitHub Actions, Vercel, Render, UptimeRobot |

---

## 💻 Local Development

### 1. Clone the repository
```bash
git clone [https://github.com/khushhalkumrawat/AI-Resume-Analyzer.git](https://github.com/khushhalkumrawat/AI-Resume-Analyzer.git)
cd AI-Resume-Analyzer
```

## Configure Environment Variables

### Frontend (client/.env):
```bash
VITE_BASE_URL=http://localhost:5000
```

### Backend (server/.env):
```bash
PORT =  Port_Number
MONGODB_URL = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret_key
FRONTEND_URL = http://localhost:5173
OPENAI_API_KEY = your_api_key
OPENAI_BASE_URL = [https://api.openai.com/v1](https://api.openai.com/v1)
OPENAI_MODEL = gpt-4o-mini
IMAGEKIT_PUBLIC_KEY = your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY = your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT = your_imagekit_url_endpoint
```

## Install & Run

### Backend Server:
``` bash
cd server
npm install
npm run dev
```

### Frontend Client
``` bash
cd ../client
npm install
npm run dev
```

## 👨‍💻 Author

**Khushhal Kumrawat**  
Software Engineer • Full Stack Developer

* 🌐 **LinkedIn:** [Khushhal Kumrawat](https://www.linkedin.com/in/khushhal-kumrawat-017bb6390/)
* 🐙 **GitHub:** [@khushhalkumrawat](https://github.com/khushhalkumrawat)
* ✉️ **Email:** [khushhalkumrawat@gmail.com](mailto:khushhalkumrawat@gmail.com)
