# SyncFlow AI - Real-Time Collaborative Workspace with Live Analytics

### 📋 Course Metadata
* **Course Code:** 23IT721 – Full Stack Development Laboratory
* **Assignment Title:** Assignment 1: Professional Dashboard Webpage Using Basic HTML Tags and Elements
* **Developer Name:** Bhuvanesh S
* **Register Number:** 23IT101

---

## 🚀 Project Overview

**SyncFlow AI** is a next-generation real-time collaborative workspace engineered for agile development teams. It fuses multi-user text & canvas design editing, contextual AI-driven development tools, and live data telemetry in a glassmorphic dashboard interface. 

The goal of this assignment is to develop a fully responsive, semantic dashboard prototype showcasing frontend architectural layout, customized styles, tables, and data entry forms.

---

## 🎨 Visual Identity & Design System

The platform has been designed to look premium and state-of-the-art:
* **Theme:** Sleek Dark Mode with radial ambient gradients (`#080c14` background base).
* **Accents:** High-tech Indigo (`#6366f1`) and Cyber Cyan (`#06b6d4`) styling.
* **Glassmorphism:** Elegant frosted glass card borders (`rgba(255, 255, 255, 0.08)`) and high blur values (`backdrop-filter: blur(12px)`).
* **Typography:** Premium layout utilizing Google Fonts **Outfit** (modern sans-serif for headings) and **Inter** (clean readable typeface for content).
* **Interactive Dynamics:** Smooth scaling transformations (`scale(1.01)`), glow states, and pulsing indicators to visualize real-time operations.

---

## ⚡ Features & Requirements Checklist

This implementation satisfies all **11 Section Requirements** specified in the assignment syllabus:

1. **Header:** Features an animated inline SVG logo, application branding title, tagline, developer name, and registration number.
2. **Navigation Bar:** Fixed, glassmorphic layout containing links to *Home, Dashboard, Services, Reports, About, Contact*, and a styled *Logout* button.
3. **Welcome Section:** Explains the project's background scope along with dedicated *Vision* and *Mission* grid blocks.
4. **Dashboard Statistics:** Displays 6 analytical grid cards with inline icons representing *Total Users, Active Users, Revenue, Transactions, Notifications*, and *Pending Tasks*.
5. **Features Section (`<ul>` & `<li>`):** Bulleted list highlighting real-time document synchronization and huddle features.
6. **Services Section (`<ol>` & `<li>`):** Numbered list of cloud services including single-sign-on (SSO), analytics pipelines, and secure hosting.
7. **Latest Updates (`<marquee>`):** Custom-styled scrolling ticker displaying v2.4.0 software release announcements and alerts.
8. **Registration Form:** Advanced data entry fields for onboarding new teams, containing *Full Name, Work Email, Phone Number, Password, Date of Birth, Gender Selection, and Headquarters Address* with functional *Submit* and *Reset* controls.
9. **Application Modules Table:** Layout showing architecture components (`SF-COLLAB-01`, `SF-ANALYTICS-02`, etc.) matching description parameters.
10. **Contact Information:** Structured contact cards with hover effects linking to GitHub, Twitter, and LinkedIn profiles.
11. **Footer:** Bottom bar crediting the design to the student and specifying copyright details.

---

## 📂 Repository Structure

```bash
FullStackLab/
├── index.html     # Core semantic structure & HTML layout
├── style.css      # Custom styling sheets & responsive rules
└── README.md      # Project documentation (this file)
```

---

## 💻 Local Setup & Installation

To run this dashboard project on your local machine:

1. Clone this repository to your computer:
   ```bash
   git clone <your-repository-url>
   ```
2. Navigate into the project folder:
   ```bash
   cd FullStackLab
   ```
3. Open `index.html` in any web browser:
   * **Windows (cmd):** `start index.html`
   * **macOS:** `open index.html`
   * **Linux:** `xdg-open index.html`

---

## 🌐 Deployment to Vercel

To host this live prototype on Vercel:

1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Initialize deployment:
   ```bash
   vercel
   ```
3. Follow the CLI prompt steps (set directory path to `./`, use default build configurations).
4. Vercel will output a live inspection URL and a final Production URL.
