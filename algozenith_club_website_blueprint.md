# AlgoZenith College Club Website — Complete Blueprint & Specification

A comprehensive technical and content specification for building an impactful, high-converting college coding club website. This document covers sitemap architecture, section-by-section component requirements, tech stack recommendations, and operational maintenance tips.

---

## 1. Executive Summary & Goals

The website serves three core audiences with distinct goals:

| Target Audience | Primary Need | Desired Action |
| :--- | :--- | :--- |
| **Junior Students (1st & 2nd Years)** | Accessible guidance, foundational roadmaps, mentorship. | Register for bootcamps, join Discord/WhatsApp, bookmark resources. |
| **Senior Students (3rd & 4th Years)** | Advanced contest prep, mock interview buddying, referral network. | Lead sessions, participate in hackathons, share interview archives. |
| **College Administration & Sponsors** | Proof of credibility, reach metrics, track record. | Grant lab permissions, sponsor prizes, provide tech swag and funding. |

---

## 2. Complete Sitemap Architecture

```text
algozenith-club.org/
│
├── / (Home: Hero, Stats, Active Bootcamp Spotlight, Pillars, Testimonials)
├── /bootcamp (Dedicated landing page for ongoing/upcoming bootcamps)
├── /events (Upcoming workshops, hackathons, and past event archives)
├── /leaderboard (Campus contest standings, streak tracker & hall of fame)
├── /resources (DSA sheets, curated roadmaps, contest templates, interview experiences)
├── /team (Faculty coordinators, student leads, technical domain heads, mentors)
├── /partner (Sponsorship deck, metrics, past sponsors, contact form)
│
└── Vanity Redirects:
    ├── /discord   → Direct permanent invite link
    ├── /whatsapp  → Community announcement group link
    └── /register  → Dynamic redirect to the currently active event form
```

---

## 3. Page-by-Page Feature Specifications

### 3.1 Homepage (`/`)

#### A. Global Announcement Banner (Sticky Top)
- **Purpose:** Immediate callout for active bootcamps, contests, or registration deadlines.
- **Components:**
  - Pulsing live indicator dot (`🔴 LIVE` or `⚡ UPCOMING`).
  - Single-line teaser: *"Day 1 of 7-Day Java DSA Bootcamp starts today at 7:00 PM!"*
  - Action button: `Join Stream` or `Register Now`.
  - Dismiss toggle (cached in `localStorage` for 24 hours).

#### B. Hero Section
- **Headline:** Bold, benefit-driven (e.g., *"From First Line of Code to Tier-1 Placements & Contests."*).
- **Sub-headline:** Explains club identity (e.g., *"The official student developer and competitive programming chapter of [College Name]."*).
- **Primary CTAs:**
  - `Register for 7-Day Bootcamp` (Highlighted brand accent button).
  - `Join Discord Community` (Secondary outline button with icon).
- **Live Social Proof / Metric Counters:**
  - `500+` Active Members
  - `15+` Hackathon Victories
  - `40+` Top Tier Placements
  - `25+` Hosted Contests & Workshops

#### C. Core Pillars / Domains
Three to four interactive cards detailing the club's focus areas:
1. **Competitive Programming & DSA:** Regular contests, weekly problem sets, rating climbs.
2. **Open Source & Web/App Dev:** Hackathon project teams, Git workflows, real-world apps.
3. **AI & Modern Technologies:** Hands-on labs, Kaggle competitions, research paper dry-runs.
4. **Placement & Mentorship:** Mock coding tests, resume reviews, senior referral networks.

#### D. Live Event Spotlight Card
A dedicated card highlighting the immediate upcoming event:
- Event title, mode (Online/Offline Lab), date, time, and speaker details.
- Real-time countdown timer (Days : Hours : Mins : Secs).
- Direct syllabus peek and one-click registration modal.

---

### 3.2 Bootcamp Dedicated Landing Page (`/bootcamp`)

A focused page designed specifically for seasonal bootcamps (like the 7-Day Java & Logic Building series).

- **Bootcamp Hero:** Title, dates, eligibility (e.g., *"Ideal for 1st & 2nd Year Students — No Prior Coding Required"*).
- **Curriculum Accordion:**
  - Day 1: Java Essentials, Platform Setup & Logic Building
  - Day 2: Time/Space Complexity & Arrays (1D + 2D)
  - Day 3: Two Pointers & Sliding Window
  - Day 4: Sorting & Binary Search
  - Day 5: Strings, Collections (JCF) & Hashing
  - Day 6: Recursion & Contest Mock Check
  - Day 7: The Grand Finale — College Lab Offline Contest
- **Speaker & Mentor Profile Cards:** Headshots, current internships/offers, LeetCode/Codeforces rating badges.
- **Prizes & Perks Section:** Goodies, certificates, rank trophies, referral opportunities.
- **Frequently Asked Questions (FAQ):**
  - *"Do I need to pay anything?"* (100% Free).
  - *"What if I miss an online session?"* (Recordings & GitHub notes provided).
  - *"Do I need a laptop for Day 7?"* (Held in college computer labs).

---

### 3.3 Curated Resource Stash (`/resources`)

Organized as a searchable, tagged directory:

- **Filter Tabs:** `All`, `DSA`, `Java`, `C++`, `Web Dev`, `Interviews`.
- **DSA Sheets & Roadmaps:**
  - 45-Day Beginner DSA Roadmap (PDF & Markdown).
  - Top 100 Interview Problems tracker.
  - Standard Contest Template Boilerplates (`Main.java`, `template.cpp`).
- **Constraint Cheat Sheet:** Visual quick-reference for Big-O vs $N \le 10^5$.
- **Interview Archives:** Company-wise placement question breakdown curated from college seniors.

---

### 3.4 Campus Leaderboard & Hall of Fame (`/leaderboard`)

- **Internal Contest Rankings:** Embed or render recent contest standouts with handle links.
- **Hall of Fame:**
  - Top Rated Coders (Codeforces Specialists/Candidate Masters, LeetCode Knights/Guardians).
  - Hackathon Winners (Smart India Hackathon, Google Solution Challenge, regional trophies).
  - Placement Spotlights (Alumni working at Amazon, Google, Microsoft, Atlassian, startups).

---

### 3.5 Team & Leadership (`/team`)

- **Faculty Coordinators:** Name, department, guidance quote.
- **Lead Organizers & Core Council:** Photo, role, GitHub, LinkedIn, and Codeforces/LeetCode badges.
- **Mentor Directory:** Tagged by domain (`Java Mentor`, `Web Lead`, `Contest Admin`).

---

### 3.6 Sponsors & Partners (`/partner`)

- Pitch page for external companies, educational sponsors, and tech brands.
- Downloadable 1-page PDF sponsorship prospectus.
- Attendee demographic breakdown (reach, impressions, lab footfall).
- Contact form or mailto link for corporate inquiries.

---

## 4. Technical Architecture & Tech Stack

```text
┌────────────────────────────────────────────────────────┐
│                      Client Layer                      │
│   Next.js (App Router) / Astro  + Tailwind CSS         │
│   Component Library: shadcn/ui + Lucide Icons          │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                   Data & Content Layer                 │
│   • Static/MDX Files: Events, Roadmaps, Cheatsheets    │
│   • External APIs: GitHub API (Commits/Team info)      │
│   • Google Sheets / Form Webhooks: RSVP Registrations  │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    Deployment & CI/CD                  │
│   Vercel / Cloudflare Pages (Free Tier)                │
│   Custom Domain + Free SSL + Automated Preview Deploys │
└────────────────────────────────────────────────────────┘
```

### Recommended Tooling Choices:
* **Frontend Framework:** **Next.js (App Router)** or **Astro** (for lightning-fast static builds).
* **Styling:** **Tailwind CSS** with **shadcn/ui** (delivers a polished developer tool look).
* **Content Management:** Local **MDX (Markdown + React components)** files in the Git repo. Enables team members to add new workshops by submitting a simple pull request.
* **Forms & Registrations:** Tally.so or Google Forms embedded cleanly, or connected via a serverless route to a private Google Sheet.
* **Hosting:** **Vercel** or **Cloudflare Pages** (unlimited bandwidth, zero-cost tier for student organizations).

---

## 5. Critical Essentials Checklist (Do Not Miss)

- [ ] **Mobile-First Layout:** Over 85% of traffic comes from mobile WhatsApp and Instagram link clicks.
- [ ] **Vanity Redirects:** Setup `/discord` and `/bootcamp` server-side 301 redirects so printed poster URLs never break if links change.
- [ ] **Dark Mode Default:** Tech and coding communities strongly favor dark or high-contrast modern themes.
- [ ] **Fast CDN Image Optimization:** Compress speaker and team headshots to modern `.webp` formats (under 100 KB each).
- [ ] **Open Graph (OG) Meta Tags:** Ensure links shared on WhatsApp, LinkedIn, and Twitter generate an attractive preview card with title and dates.
- [ ] **Automated GitHub Deployment:** Enable branch protections so junior maintainers can suggest changes through PRs reviewed by core technical leads.