# EduSlide AI

Transform your learning materials into professional PowerPoint presentations with the power of AI.

---

## Problem Statement

Educators spend **hours** manually creating lecture slides from PDFs, eBooks, and notes — a repetitive, time-consuming process that takes focus away from actual teaching. Existing tools offer no end-to-end pipeline to go from raw educational content to a ready-to-present slide deck.

## Solution

**EduSlide AI** is a full-stack, AI-powered web platform that lets educators:

1. **Upload** a PDF (or type a topic directly).
2. **Generate** a structured presentation using OpenAI GPT-4o-mini — with bullet points, speaker notes, and mixed layouts.
3. **Preview** the slides in-browser with thumbnail navigation.
4. **Download** a polished `.pptx` file (six built-in themes) in one click.

The entire flow — upload → extract text → generate slides → download PPTX — is fully functional, backed by real AI and real file processing.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.1.6 (App Router, Turbopack) |
| **Frontend** | React 19, Tailwind CSS 4 |
| **Backend API** | Next.js Route Handlers (`/api/extract`, `/api/generate`) |
| **AI Engine** | OpenAI GPT-4o-mini via `openai` SDK |
| **PDF Parsing** | `pdf-parse` v2 (pdfjs-dist) |
| **PPTX Export** | PptxGenJS 4 (6 themed templates) |
| **Database / Auth** | Supabase (PostgreSQL + Auth) |
| **Icons** | Lucide React |
| **Linting** | ESLint 9 with Next.js config |

---

## System Diagram

```
┌──────────────┐        ┌───────────────────────────────────────────┐
│   Browser    │        │          Next.js 16 (Turbopack)           │
│              │        │                                           │
│  Upload Page ├──POST──▶  /api/extract                            │
│  (PDF/topic) │        │    └─ pdf-parse → extracted text          │
│              │        │                                           │
│  Generate    ├──POST──▶  /api/generate                           │
│              │        │    └─ OpenAI GPT-4o-mini → JSON slides    │
│              │        │    └─ Supabase daily-limit check          │
│              │        │                                           │
│  Preview     │◀─JSON──┤  Slide data returned to client            │
│              │        │                                           │
│  Download    │        │  Client-side PptxGenJS                    │
│  (.pptx)     │◀─BLOB──┤    └─ Themed PPTX generated in browser   │
└──────────────┘        └───────────────────────────────────────────┘
                                        │
                                        ▼
                                ┌───────────────┐
                                │   Supabase     │
                                │  (PostgreSQL)  │
                                │  Auth + Data   │
                                └───────────────┘
```

---

## Features

- **PDF Text Extraction** — Upload a PDF and the server extracts content via `pdf-parse` v2.
- **AI Slide Generation** — GPT-4o-mini produces structured slides with titles, bullet points, speaker notes, and layout types.
- **Daily Rate Limiting** — 3 generations per user per day, enforced server-side via Supabase.
- **6 Presentation Themes** — Modern Professional, Academic Classic, Creative Vibrant, and more.
- **PPTX Download** — Client-side `.pptx` creation with PptxGenJS (title slides, content slides, two-column, summary).
- **Interactive Preview** — Navigate slides with thumbnails, previous/next controls, and full-screen view.
- **Auth & Dashboard** — Supabase-backed signup/login, protected dashboard with presentations, topics, analytics, and profile pages.
- **Responsive UI** — Tailwind CSS 4, indigo design system, smooth transitions across all screen sizes.

---

## Live Demo

> **Vercel:** [https://eduslideai.vercel.app/](https://eduslideai.vercel.app/)

---

## Installation

```bash
# 1. Clone
git clone https://github.com/fatimaumer02/EduSlide-.git
cd EduSlide-

# 2. Install dependencies
npm install

# 3. Create .env.local with your keys
#    NEXT_PUBLIC_SUPABASE_URL=...
#    NEXT_PUBLIC_SUPABASE_ANON_KEY=...
#    OPENAI_API_KEY=...
#    NEXT_PUBLIC_APP_URL=http://localhost:3000

# 4. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
EduSlide-/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── extract/route.js      # PDF text extraction endpoint
│   │   │   └── generate/route.js     # AI slide generation endpoint
│   │   ├── dashboard/                # Protected dashboard pages
│   │   │   ├── page.jsx              # Main dashboard
│   │   │   ├── analytics/page.jsx    # Analytics & reports
│   │   │   ├── presentations/page.jsx# Presentations management
│   │   │   ├── profile/page.jsx      # Profile & settings
│   │   │   └── topics/page.jsx       # Topics management
│   │   ├── login/page.jsx            # Login page
│   │   ├── signup/page.jsx           # Signup page
│   │   ├── upload/page.jsx           # File upload & topic input
│   │   ├── preview/page.jsx          # Slide preview & download
│   │   ├── templates/page.jsx        # Template selector
│   │   ├── about/page.jsx            # About page
│   │   ├── contact/page.jsx          # Contact page
│   │   ├── layout.jsx                # Root layout
│   │   ├── page.jsx                  # Landing page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── FileUpload.jsx            # Drag-and-drop file upload
│   │   ├── Loader.jsx                # Loading spinner
│   │   ├── Navbar.jsx                # Navigation bar
│   │   ├── SlideCard.jsx             # Slide display card
│   │   ├── TemplateSelector.jsx      # Theme picker
│   │   └── TopicInput.jsx            # Topic input field
│   └── lib/
│       ├── api.js                    # Client-side API helpers
│       ├── pptxGenerator.js          # PPTX creation (6 themes)
│       └── supabase.js               # Supabase client
├── scripts/
│   └── seed-admin.js                 # Seed admin user
├── doc/                              # Documentation
├── next.config.mjs
├── tailwind.config.js
└── package.json
```

---

## Team Members

**Team Name:** Team Zeppelin

| Name | Role |
|------|------|
| **Muhammad Adnan Sultan** | Team Member |
| **Fatima Umer** | Team Member |
| **Areeba Arooj** | Team Member |

**Submitted For:** Hackathon  
**Submission Date:** 08-02-2026

---

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/) — Framework
- [OpenAI](https://openai.com/) — AI Engine
- [Supabase](https://supabase.com/) — Database & Auth
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Lucide](https://lucide.dev/) — Icons
- [PptxGenJS](https://github.com/gitbrent/PptxGenJS) — PPTX Generation
