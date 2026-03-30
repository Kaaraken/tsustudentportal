<div align="center">

<img src="https://tsu.ge/assets/images/logo/logo-ka.svg" height="80" alt="TSU Logo" />

# TSU Student Portal
### A better student experience for Tbilisi State University


> Built by a TSU student, for TSU students. Because the official portal deserved better.

</div>

---

## 🎯 What is this?

The official TSU student portal at `uni.tsu.ge` works — but barely. This project is a clean, modern replacement UI that:

- Logs in to the real TSU portal on your behalf using browser automation
- Scrapes your personal academic data automatically
- Presents everything in a beautiful, fast, and mobile-friendly interface
- Falls back to manual data entry when scraping isn't possible

No more squinting at outdated tables. No more broken mobile views. Just your data, beautifully presented.

---

## ✨ Features

| Section | Description |
|---|---|
| 📚 **Courses** | Active courses, instructors, credits, and grades |
| 🗓 **Schedule** | Weekly timetable with color-coded class blocks |
| ✈️ **Mobility** | Exchange program applications and partner universities |
| 🎓 **Program** | Degree plan, semester breakdown, and credit progress |
| 💳 **Payments** | Balance due, transaction history, and tuition breakdown |
| 📄 **Documents** | Transcripts, certificates, and downloadable files |
| 👤 **Profile** | GPA, next class, payment status — all at a glance |

---

## 🏗️ Architecture

```
┌─────────────────────┐         ┌──────────────────────┐         ┌─────────────────┐
│                     │  HTTPS  │                      │Playwright│                 │
│   React Frontend    │ ──────► │   Node.js Backend    │ ──────► │  uni.tsu.ge     │
│   (Vite + Tailwind) │ ◄────── │   (Express + JWT)    │ ◄────── │  (Real Portal)  │
│                     │  JSON   │                      │  Data   │                 │
└─────────────────────┘         └──────────┬───────────┘         └─────────────────┘
                                            │
                                            │ SQL
                                            ▼
                                 ┌──────────────────────┐
                                 │   PostgreSQL (Neon)   │
                                 │  Cache + User Store   │
                                 └──────────────────────┘
```

**Flow:**
1. Student enters TSU credentials on our portal
2. Backend launches a headless browser via Playwright
3. Playwright logs into `uni.tsu.ge` with those credentials
4. Data is scraped from each section and cached in PostgreSQL
5. Frontend displays everything in a clean, modern UI
6. Cached data is served instantly on repeat visits (refreshes every hour)

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS + shadcn/ui
- React Context (AuthContext + DataContext)

**Backend**
- Node.js + Express
- Playwright (browser automation)
- JWT authentication
- bcrypt password hashing
- PostgreSQL via `pg`

**Infrastructure**
- Database: [Neon](https://neon.tech) (free tier PostgreSQL)
- Backend hosting: [Railway](https://railway.app)
- Frontend hosting: [Lovable](https://lovable.app) / Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Git
- A valid TSU student account

### 1. Clone the repositories

```bash
# Frontend
git clone https://github.com/Kaaraken/tsustudentportal.git
cd tsustudentportal

# Backend (separate repo)
git clone https://github.com/Kaaraken/tsu-portal-backend.git
cd tsu-portal-backend
```

### 2. Set up the backend

```bash
cd tsu-portal-backend
npm install
npx playwright install chromium
```

Create a `.env` file:
```env
PORT=4000
DATABASE_URL=your_neon_postgresql_connection_string
JWT_SECRET=your_32_character_random_secret
FRONTEND_URL=http://localhost:8080
SESSION_TIMEOUT_MS=1800000
MAX_SESSIONS=50
DEBUG=false
```

Start the backend:
```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd tsustudentportal
npm install
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:4000
```

Start the frontend:
```bash
npm run dev
```

### 4. Open the portal

Navigate to `http://localhost:8080` and log in with your TSU credentials.

---

## 🔒 Security & Privacy

This project takes security seriously:

- **Credentials are never stored in plain text** — only a bcrypt hash is saved
- **Passwords are discarded immediately** after Playwright uses them to log in
- **JWT tokens expire after 24 hours**
- **Browser sessions auto-close** after 30 minutes of inactivity
- **Rate limiting** prevents brute force attacks (10 attempts / 15 min per IP)
- **All data belongs to the student** — nothing is shared or sold

> ⚠️ This is a student-built, non-commercial project. Use it at your own discretion. Your credentials are passed directly to `uni.tsu.ge` via an automated browser — the same way you would log in manually.

---

## 📋 Roadmap

- [x] TSU login via Playwright automation
- [x] JWT authentication system
- [x] PostgreSQL data caching
- [x] Beautiful responsive UI
- [x] Manual data entry fallback
- [ ] Complete scraper selectors for all sections
- [ ] Mobile app (React Native)
- [ ] Push notifications for grades and payments
- [ ] Deploy to production (Railway + Vercel)
- [ ] Support for other Georgian universities

---

## 🤝 Contributing

This project is currently private and in active development. If you're a TSU student and want to contribute — especially with **DOM inspection** of the portal to help fix scraper selectors — reach out!

---

## 👨‍💻 Author

Built with frustration and caffeine by **Nikoloz Chakvetadze** ([@Kaaraken](https://github.com/Kaaraken))

> *"The official TSU portal is so bad I built a replacement at 1am."*

---

<div align="center">

**TSU Student Portal** — Made in Tbilisi 🇬🇪

</div>
