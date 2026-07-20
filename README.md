# SyncFlow AI - Advanced HTML5 Form Elements, Drag & Drop, and Web Storage Studio

### 📋 Course Metadata
* **Course Title & Code:** 23IT721 – Full Stack Development Laboratory
* **Developer Name:** Bhuvanesh S
* **Register Number:** 23IT101
* **Department:** Information Technology

---

## 🚀 Project Overview

**SyncFlow AI** is a professional, high-performance web application designed for **Full Stack Development Laboratory Assignments**:
1. **Assignment 1:** Design a Professional Webpage Using Advanced HTML5 Form Elements
2. **Assignment 4:** Design a Professional Web Page Demonstrating HTML5 Drag and Drop and Web Storage

The application incorporates standard HTML5 semantic tags, native validation, interactive Drag & Drop API event listeners, client-side Web Storage (`localStorage` and `sessionStorage`), and responsive styling.

---

## 📋 Comprehensive Requirements Mapping Matrix

### Assignment 1: Advanced HTML5 Form Elements

| S.No | Section / Component | Implementation Details | Status |
|---|---|---|---|
| 1 | Professional Theme | Sleek Light & Dark console themes with CSS custom variables | ✅ Implemented |
| 2 | HTML5 Header | `<header>` containing title, SVG logo, and tagline | ✅ Implemented |
| 3 | Navigation Menu | Links for Home, About, Features, Registration, Drag & Drop, Storage, Contact, Help | ✅ Implemented |
| 4 | Introduction Section | `<section id="about">` and `<article>` explaining app architecture | ✅ Implemented |
| 5 | Registration Form | `<form id="user-registration-form">` with client validation | ✅ Implemented |
| 6 | Name Field | `<input type="text" id="reg-name" placeholder="..." required>` | ✅ Implemented |
| 7 | Email Field | `<input type="email" id="reg-email" required>` for email validation | ✅ Implemented |
| 8 | Phone Number | `<input type="tel" id="reg-phone" pattern="[\+]?[0-9\s\-]{10,15}">` | ✅ Implemented |
| 9 | Date of Birth | `<input type="date" id="reg-dob" required>` picker | ✅ Implemented |
| 10 | Preferred Time | `<input type="time" id="reg-time" required>` appointment time | ✅ Implemented |
| 11 | Age | `<input type="number" id="reg-age" min="18" max="100" required>` | ✅ Implemented |
| 12 | Editable Area | `<div id="reg-editable-notes" contenteditable="true">` | ✅ Implemented |
| 13 | Spell Check | `spellcheck="true"` attribute on editable comments section | ✅ Implemented |
| 14 | Address | `<textarea id="reg-address" rows="3" required></textarea>` | ✅ Implemented |
| 15 | Gender | `<input type="radio" name="gender">` (Male, Female, Other) | ✅ Implemented |
| 16 | Skills / Interests | `<input type="checkbox" name="skills">` grid | ✅ Implemented |
| 17 | Form Controls | Submit (`Submit Registration`), Reset, and Cancel buttons | ✅ Implemented |
| 18 | HTML5 Footer | `<footer>` with copyright, student name (Bhuvanesh S), Reg No, and links | ✅ Implemented |
| 19 | Semantic Elements | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` | ✅ Implemented |
| 20 | Code Organization | Indented structure, detailed inline comments, standards compliance | ✅ Implemented |

---

### Assignment 4: HTML5 Drag and Drop & Web Storage

| S.No | Section / Component | Implementation Details | Status |
|---|---|---|---|
| 1 | Professional Theme | Unified visual palette and responsive CSS cards | ✅ Implemented |
| 2 | Header | Semantic `<header>` with SVG brand identity | ✅ Implemented |
| 3 | Navigation Menu | Complete navigation links including Storage & DragDrop | ✅ Implemented |
| 4 | Introduction | `<section>` and `<article>` introducing Drag & Drop and Web Storage | ✅ Implemented |
| 5 | Drag Source | Colored module cards with `draggable="true"` | ✅ Implemented |
| 6 | Drop Target | Dynamic dropzones ("Active Workspace" & "Staging Archive") | ✅ Implemented |
| 7 | Drag Events | Implemented `dragstart`, `dragover`, `dragenter`, `dragleave`, and `drop` | ✅ Implemented |
| 8 | Local Storage | Save user data permanently in `localStorage` | ✅ Implemented |
| 9 | Session Storage | Save temporary session tokens in `sessionStorage` | ✅ Implemented |
| 10 | Retrieve Data | Display stored JSON data on button click in output terminal | ✅ Implemented |
| 11 | Clear Data | Buttons to clear `localStorage`, `sessionStorage`, and terminal screen | ✅ Implemented |
| 12 | Footer | Standard `<footer>` with author details and institutional credits | ✅ Implemented |
| 13 | Semantic Elements | Full usage of semantic HTML5 tags throughout layout | ✅ Implemented |
| 14 | Code Organization | Modular JavaScript functions and structured stylesheet | ✅ Implemented |

---

## 📂 Project Structure

```bash
FullStackLab/
├── index.html     # HTML5 Document (Header, Nav, Form, Drag & Drop, Web Storage, Aside, Footer)
├── style.css      # Design Tokens, Layout Grids, Drag & Drop Animations, Storage Terminal
├── script.js      # Form Validation, HTML5 Drag/Drop Listeners, Local & Session Storage APIs
└── README.md      # Comprehensive Assignment Documentation (this file)
```

---

## 💻 Local Execution Guide

1. Clone or open the repository folder:
   ```bash
   cd FullStackLab
   ```
2. Open `index.html` in any modern Web Browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari):
   * **Windows:** `start index.html` or double click `index.html`
3. Testing Key Assignment Features:
   * **Form Validation:** Try submitting the Registration Form with invalid age (<18), improper phone/email formats, or empty fields to verify error messaging. Click **Cancel Operation** to reset.
   * **Drag and Drop:** Drag any module card from *Source Palette* and drop into *Active Workspace* or *Staging Archive*. Watch status banner updates.
   * **Web Storage:** Input values under Local or Session Storage cards, click **Save Data**, then **Retrieve Data** to view entries in the inspection terminal screen.
