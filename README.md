#  Interactive Calendar Component

A polished, interactive calendar built with React, TypeScript, and Tailwind CSS, inspired by a physical wall calendar design.  
The component focuses on usability, visual aesthetics, and smooth user interaction.

---

## Features

-  **Date & Range Selection**
  - Select single dates or a full date range
  - Visual highlighting for start, end, and in-between days

-  **Notes System**
  - Add notes to a specific date or a selected range
  - Instant UI updates with local persistence

-  **Dynamic Monthly Themes**
  - Each month has a unique hero image and color theme
  - Theme automatically adapts across UI elements

-  **Smooth Flip Animation**
  - Month navigation with 3D flip animation (Framer Motion)

-  **Holiday Indicators**
  - Important holidays marked directly on calendar
  - Tooltip support for quick identification

-  **Fully Responsive**
  - Optimized layout for mobile, tablet, and desktop
  - Touch-friendly interactions

---

## Tech Stack

- **React + TypeScript**
- **Tailwind CSS**
- **Zustand** (State Management)
- **Framer Motion** (Animations)

---

##  Key Technical Decisions

- Used **Zustand** for lightweight global state (range, notes, navigation)
- Avoided redundant state by deriving UI state (range, highlights)
- Implemented **localStorage** for persistence (no backend required)
- Used **responsive-first design** instead of patch-based fixes
- Optimized rendering by subscribing only to required state slices

---

##  Trade-offs

- Holidays are partially hardcoded for demonstration purposes
- No backend integration (as per assignment scope)
- Notes are scoped per date/range using key-based mapping

---

## 🧪 How to Run

```bash
npm install
npm run dev
