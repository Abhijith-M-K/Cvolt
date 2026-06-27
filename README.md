# Cvolt Resume Builder

Cvolt is a modern, premium, and privacy-first ATS (Applicant Tracking System) Resume Builder. It helps job seekers construct highly scannable, clean, and professional CVs designed to easily pass automated recruitment filters.

Built with **Next.js**, **TypeScript**, and powered by **Google Gemini AI**, Cvolt provides automated content optimization, real-time scannability audit scoring, and print-perfect document exports with zero configuration.

---

## 🚀 Key Features

* **Real-time ATS Scannability Check**: A built-in scanner that audits the resume structure (word count, email/phone format, key sections, layout, font sizes) and provides an ATS compliance score with actionable improvement recommendations.
* **AI-Powered Description Optimization**: Integrated with Google Gemini AI to rewrite job descriptions and professional summaries.
  * *Context-aware generation*: Professional summaries are condensed into high-impact single paragraphs, while experience descriptions are formatted as structured bullet points.
* **Premium Typography & Branding**: Curated corporate-blue aesthetic (`#1a365d` / `#2b4c7e`) optimized for recruiter readability.
* **Multi-page Layout Pagination**: Custom CSS/HTML table wrapping engine replicates top and bottom margins on every printed page while hiding browser headers/footers (`@page { margin: 0; }`).
* **Underlined & Contextual Links**: Project links automatically parse the target domain to display clean, professional anchors like `GitHub` or `GitLab` instead of long, distracting URLs.
* **Progressive Web App (PWA)**: Built-in support to install Cvolt directly onto mobile or desktop devices.
* **Flexible Custom Sections**: Supports standard sections (Experience, Projects, Education, Skills, Certifications) along with a flexible, optional **"Others"** tab for custom sections.
* **Global Confirmation Modals**: Built-in modal alerts to prevent accidental data loss when deleting items or sections.

---

## 🛠️ Tech Stack

* **Frontend Framework**: Next.js (App Router)
* **Styling**: Vanilla CSS (Premium design variables and dark-mode assets)
* **AI Engine**: Google Gemini API (`@google/generative-ai`)
* **Document Generation**: `docx` library for Word exports, built-in browser engine for clean PDF generation.
* **State Management**: React state hooks with local persistence (`localStorage`) for offline draft safety.

---

## 📦 Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── optimize/       # API route for Gemini AI description rewrites
│   │   └── scan/           # API route for ATS resume scoring
│   ├── favicon.ico
│   ├── globals.css         # Styling system & print page media queries
│   ├── icon.png            # Cvolt branding icon
│   ├── layout.tsx          # Main layout and PWA configuration
│   └── page.tsx            # Landing page & dashboard container
├── components/
│   ├── ResumeForm.tsx      # Sidebar inputs & configuration tab manager
│   └── ResumePreview.tsx   # Live render & print table pagination sheet
├── types/
│   └── resume.ts           # Typescript declarations for resume schemas
└── utils/
    ├── docxGenerator.ts    # DOCX exporter configuration
    ├── gemini.ts           # Gemini API initialization
    └── mockData.ts         # Base resume template data
```

---

## ⚙️ Getting Started & Local Setup

### 1. Prerequisites
Make sure you have Node.js installed on your system.

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory and add your Google Gemini API key:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to access **Cvolt Resume Builder**.

---

## 📄 License
This project is open-source and available under the MIT License.
