# Technical Documentation

## Overview

This version of the portfolio adds Assignment-2 enhancements focused on practical interactivity, clear user feedback, and a small API integration. The site includes live project search, collapsible project details, a GitHub repository count checker, form validation with inline messages, and hover animations for a more polished feel.

---

## Technologies Used

### HTML5
- Semantic sections (`<section>`) and accessible labels/status regions (e.g., `aria-live` for form status)

### CSS3
- Hover/elevation animations for cards/sections
- Consistent spacing and responsive layout

### JavaScript
- **Live search** for projects (filters cards by title as the user types)
- **Contact form validation** with inline error messages and a success status
- **GitHub repo count** fetch with loading message, friendly error, and retry

---

## Files

- `index.html`: Semantic structure, sections (About, Projects, GitHub Stats, Contact), accessible labels/status text.
- `css/styles.css`: Layout, hover animations, card/section visuals, form styling.
- `js/script.js`: Live search, contact form validation, GitHub repo count fetch with loading/retry.

---

## Features

1. **Project Interaction**
   - **Live search bar** to filter projects
   - **Collapsible** project descriptions via `<details>`

2. **Contact Experience**
   - Input validation and **inline** error messages
   - Clear success/failure status message

3. **API Dynamic Section**
   - **GitHub Stats**: fetches public repository count for a given username/URL
   - Includes **Loading…** text, friendly error message, and **Retry** button

4. **Polish**
   - Hover/elevation animations on rectangles and project cards


5. **Scrolling**
   - Smooth scrolling when navigating between sections for a better user experience
---

## Project Structure

Assignment-2/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
└── docs/
├── ai-usage-report.md
└── technical-documentation.md