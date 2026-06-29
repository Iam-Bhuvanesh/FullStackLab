# SyncFlow AI - Interactive Workspace Dashboard with Live Analytics

### 📋 Course Metadata
* **Course Code:** 23IT721 – Full Stack Development Laboratory
* **Assignment Title:** Assignment 2: Interactive Dashboard Webpage Using CSS, JavaScript, and Animations
* **Developer Name:** Bhuvanesh S
* **Register Number:** 23IT101

---

## 🚀 Project Overview

**SyncFlow AI** is a professional collaborative workspace prototype. Following the requirements of **Assignment 2**, the dashboard has been expanded with complete client-side JavaScript features and an industry-grade high-contrast visual overhaul.

The dashboard uses a default **multi-contrast white-based theme** (resembling modern SaaS applications like Stripe or Linear) with an interactive **Theme Switcher** that toggles a dark-mode developer console view.

---

## 🎨 Visual Identity & Industry Design System

* **Default Light Theme (White Contrasts):**
  * Base Background: Clean, pure white (`#ffffff`).
  * Card Surfaces: Light slate contrasts (`#f8fafc`, `#f1f5f9`, `#fdfdfd`).
  * Borders & Accents: Crisp slate borders (`#e2e8f0`) with deep indigo accents (`#4f46e5`).
  * Typography: Deep charcoal-blue (`#0f172a`) for visual hierarchy and readability.
* **Console Dark Theme:**
  * Base Background: Low-light cyber slate (`#090d16`).
  * Card Surfaces: Rich transparent gray (`rgba(17, 24, 39, 0.7)`).
  * Accents: Bright glowing indigo (`#6366f1`) and cyan (`#06b6d4`).
* **Animations:**
  * *Typewriter:* Welcome banner introduces system processes via inline typing.
  * *Fade-In / Slide-Up:* Smooth easing transitions for cards and list panels on load.
  * *Pulse indicator:* Status node alerts flashing in real time.
  * *Card hover:* Cards scale up (`translateY(-4px)`) and expand borders dynamically.
  * *Badge Alerts:* Rotating gears and expanding indicator dots.

---

## ⚡ Interactive Features & JavaScript Logic

This implementation satisfies all **20 Section Requirements** specified in the Assignment 2 syllabus:

1. **Professional Theme:** High-contrast white industrial layouts with variables.
2. **Navigation Bar:** Fixed menus with active states and hover underlines.
3. **Welcome Banner:** Slide-in banner showing tagline, vision, and mission.
4. **Dashboard Cards:** 6 grid boxes with SVG status vectors and hover scales.
5. **Dynamic Statistics:** Count-up script animation using `requestAnimationFrame` to tick from `0` to actual metrics on load.
6. **Features Section:** Animated list panels detailing collaboration sync elements.
7. **Services Section:** Styled ordered lists explaining SSO, hosting, and API hooks.
8. **Feature Image Slider:** Automated slide carousel displaying workspace visual graphics (Real-Time Canvas, Contribution Graph, AI Pipelines).
9. **Clock Display:** Date and time display in the header updating every second.
10. **Theme Switcher:** Toggles document attributes between light mode and dark mode.
11. **Notification Panel:** Sliding drawer toggled from navigation bar showing live alert feeds. Individual alerts can be dismissed, or cleared all at once.
12. **Registration Form:** Data entry fields for Name, Email, Phone, Password, DOB, Address.
13. **Form Validation:** Advanced checks validating format inputs, email patterns, phone lengths, and password complexity. Displays red helper warnings and highlights inputs in red/green.
14. **Success Popup Overlay:** Modal popup card showing a confirmation check when validation succeeds.
15. **Action Buttons:** Flex button transitions with scale transformations.
16. **Scroll-to-Top Button:** Floating arrow button fading in after scrolling down `300px` that returns users to the header smoothly.
17. **Contact Section:** Clean grid showing support email, phone numbers, and physical location maps.
18. **Footer Section:** Copyright credits and quick links.

---

## 📂 Project Structure

```bash
FullStackLab/
├── index.html     # Page layout & interactive wrappers
├── style.css      # Light/Dark variables, visual styles & transitions
├── script.js      # JS core engine (validators, counter, slider, toggler)
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
   * **Windows:** `start index.html`
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
