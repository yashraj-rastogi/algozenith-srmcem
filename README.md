# AlgoZenith SRMCEM 🚀

> Official student chapter website for **AlgoZenith SRMCEM** (Shri Ramswaroop Memorial College of Engineering and Management, Lucknow).  
> A full-stack platform built to foster Competitive Programming, Data Structures & Algorithms, and modern Software Engineering.

---

## 🌟 Overview

This repository houses the full-stack web portal for **AlgoZenith SRMCEM**. Designed with the official AlgoZenith branding (navy/indigo palette, electric blue accents, and clean geometric typography), the portal connects students to contests, workshops, CP roadmaps, core team leads, and interactive recruitment inquiries.

### Key Highlights
- **Modern Full-Stack Architecture**: React 19 + Vite frontend coupled with a modular Node.js + Express backend and MongoDB database via Mongoose.
- **Brand-Accurate Aesthetics**: Visuals built around the official logo — deep midnight navy (`#040817`), royal blue (`#00127a`), electric cobalt (`#2563eb`), cyan highlights (`#38bdf8`), and typography featuring Google Fonts *Outfit*, *Plus Jakarta Sans*, and *JetBrains Mono*.
- **Live Database Integration & Fallbacks**: Real-time MongoDB queries for events, members, and student inquiries with fallback sample datasets if the database is initializing.
- **Interactive Portal Features**:
  - Live backend & MongoDB connection health badge in the navbar.
  - Interactive CP Code Terminal card with C++ syntax simulation.
  - Event catalog with real-time category filtering (Contests, Workshops, Bootcamps).
  - Four-tier Competitive Programming progression roadmap.
  - Core team & mentor directory with social handles (GitHub, LinkedIn, Codeforces).
  - Online student application / inquiry form persisting submissions to MongoDB.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Icons
- **Typography**: Outfit, Plus Jakarta Sans, JetBrains Mono
- **Styling**: Modular Vanilla CSS with responsive design tokens & glassmorphism

### Backend (`/server`)
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose ODM](https://mongoosejs.com/)
- **Middlewares**: `cors`, `dotenv`, `morgan`

---

## 📂 Project Structure

```
algozenith-srmcem/
├── client/                     # Frontend React + Vite application
│   ├── public/
│   │   └── logo.png            # AlgoZenith emblem asset
│   ├── src/
│   │   ├── components/         # Modular UI Components
│   │   │   ├── Navbar.jsx      # Navigation, logo, & live DB status badge
│   │   │   ├── Hero.jsx        # Headline, stats, CP code editor simulator
│   │   │   ├── About.jsx       # Pillars of AlgoZenith SRMCEM
│   │   │   ├── Domains.jsx     # CP, Web Dev, AI/ML, Open Source wings
│   │   │   ├── Events.jsx      # Dynamic events feed with filter tabs
│   │   │   ├── Roadmap.jsx     # CP 4-phase learning progression roadmap
│   │   │   ├── Team.jsx        # Core leads & mentors
│   │   │   ├── JoinForm.jsx    # Membership / contact submission form
│   │   │   ├── Footer.jsx      # Campus details, links, copyright
│   │   │   └── Icons.jsx       # Custom inline SVG icons
│   │   ├── services/
│   │   │   └── api.js          # API client communicating with backend
│   │   ├── App.css             # Component styling & responsiveness
│   │   ├── index.css           # Design tokens, variables, & atmosphere
│   │   ├── App.jsx             # Root layout assembler
│   │   └── main.jsx            # React root entrypoint
│   ├── index.html              # HTML shell with Google Fonts & metadata
│   ├── package.json            # Client dependencies & scripts
│   └── vite.config.js          # Vite config with /api proxy to port 5000
│
├── server/                     # Backend Node.js + Express API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Mongoose connection & status checker
│   │   ├── controllers/        # Request handlers & logic
│   │   │   ├── eventController.js
│   │   │   ├── memberController.js
│   │   │   └── inquiryController.js
│   │   ├── models/             # Mongoose Schemas
│   │   │   ├── Event.js        # Contest & workshop schema
│   │   │   ├── Member.js       # Core council schema
│   │   │   └── Inquiry.js      # Student query schema
│   │   ├── routes/             # RESTful API Endpoints
│   │   │   ├── healthRoutes.js
│   │   │   ├── eventRoutes.js
│   │   │   ├── memberRoutes.js
│   │   │   └── inquiryRoutes.js
│   │   ├── data/
│   │   │   └── mockData.js     # Initial seed & offline fallback data
│   │   └── index.js            # Express server initialization
│   ├── .env                    # Local environment config
│   ├── .env.example            # Environment template
│   ├── seed.js                 # DB population script
│   └── package.json            # Server dependencies & scripts
│
├── .gitignore                  # Root git exclusion file
├── package.json                # Root orchestration scripts (concurrently)
└── README.md                   # Project documentation
```

---

## ⚡ Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v18 or higher, v20+ recommended)
- **npm** (v9+)
- **MongoDB** (Local MongoDB instance running on `127.0.0.1:27017` or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection URI)

---

### 2. Installation

Clone or open the repository, then install dependencies across all workspaces:

```bash
# Install root, client, and server dependencies in one command
npm run install:all
```

Or install them manually:
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

---

### 3. Environment Setup

Configure the backend environment variables:
1. Navigate to `/server`
2. Create or inspect `.env` (a template is available in `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/algozenith_srmcem
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

> **Note**: If using MongoDB Atlas, replace `MONGODB_URI` with your connection string:  
> `MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/algozenith_srmcem?retryWrites=true&w=majority`

---

### 4. Seed Initial Data (Optional but Recommended)

Populate your MongoDB database with sample events and core team profiles:

```bash
npm run seed
```

Output:
```
Connecting to MongoDB at: mongodb://127.0.0.1:27017/algozenith_srmcem
MongoDB connected for seeding.
Clearing existing events & members...
Inserting events...
✅ Inserted 4 events.
Inserting members...
✅ Inserted 4 members.
🎉 Seeding successfully completed!
```

---

### 5. Running the Application

Run **both** the backend Express server and Vite frontend concurrently with one command from the project root:

```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

Alternatively, you can run them in separate terminals:

```bash
# Terminal 1 - Backend Server (Port 5000)
npm run dev:server

# Terminal 2 - Frontend Client (Port 5173)
npm run dev:client
```

---

## 📡 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Returns server status, database connection state, and uptime. |
| `GET` | `/api/events` | List all events (supports `?category=` and `?status=` query params). |
| `GET` | `/api/events/:id` | Fetch specific event details by ID. |
| `POST` | `/api/events` | Create a new event *(persists to MongoDB)*. |
| `GET` | `/api/members` | Retrieve core team members and leads. |
| `POST` | `/api/members` | Add a new member profile. |
| `POST` | `/api/inquiries` | Submit student membership / contact inquiry form. |
| `GET` | `/api/inquiries` | View all submitted inquiries *(admin)*. |

---

## 🎨 Design System & Color Guide

Derived from the official AlgoZenith logo:

| Color Name | Hex Code | Preview | Usage |
| :--- | :--- | :--- | :--- |
| **Deepest Navy** | `#040817` | `■` | Primary dark body background |
| **Dark Indigo Card** | `#0c1433` | `■` | Glassmorphic cards & panels |
| **Primary Navy** | `#00127a` | `■` | Brand logo base & gradient root |
| **Electric Cobalt** | `#2563eb` | `■` | Primary CTAs, active buttons, focus rings |
| **Vibrant Blue** | `#1d4ed8` | `■` | Gradients, button hover states |
| **Cyan Glow** | `#38bdf8` | `■` | Subtitles, code highlights, status accents |
| **Text Primary** | `#f8fafc` | `■` | Main headings and labels |
| **Text Muted** | `#94a3b8` | `■` | Descriptions and secondary copy |

---

## 🚀 Roadmap & Next Steps

- [x] Initial full-stack skeleton with React + Vite and Express + MongoDB.
- [x] Brand typography (Outfit + Plus Jakarta Sans) and logo integration.
- [x] API routes for events, members, inquiries, and health check.
- [x] Database seeding script with realistic club data.
- [ ] Admin Dashboard for event creation and inquiry review.
- [ ] Authentication (JWT / OAuth) for club members.
- [ ] Live Codeforces / LeetCode rating leaderboards integration for SRMCEM students.
- [ ] Resource library for contest problem editorials and code templates.

---

## 🏛️ Campus Chapter

**AlgoZenith SRMCEM Chapter**  
Shri Ramswaroop Memorial College of Engineering and Management  
Lucknow-Deva Road, Tiwariganj, Lucknow, Uttar Pradesh 226028, India  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
