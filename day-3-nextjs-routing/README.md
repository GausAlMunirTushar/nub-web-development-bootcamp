# Day 3 — Next.js and Routing

Day 3 introduces Next.js website architecture, the App Router and reusable
layout components. The live example is a three-page CampusConnect website.

## 60-Minute Schedule

| Time | Topic |
|---|---|
| 0–10 minutes | What is Next.js? React vs Next.js |
| 10–20 minutes | Next.js project structure |
| 20–30 minutes | App Router and routing |
| 30–40 minutes | Layout and reusable components |
| 40–55 minutes | Live coding: Three-page website |
| 55–60 minutes | Quick quiz |

## Core Goal

Understand:

- Routing
- Layouts
- Components
- Project architecture

## Three-Page Structure

```text
app/
├── page.js
├── about/
│   └── page.js
├── dashboard/
│   └── page.js
└── layout.js

components/
├── Navbar.js
└── Footer.js
```

| File | Purpose |
|---|---|
| `app/page.js` | Main website page |
| `app/about/page.js` | About page |
| `app/dashboard/page.js` | Dashboard page |
| `app/layout.js` | Shared layout for the application |
| `components/Navbar.js` | Reusable navigation component |
| `components/Footer.js` | Reusable footer component |

## Homework

Prepare the complete folder structure for your startup website. Include:

- A home page
- An about page
- A dashboard or feature page
- A shared layout
- A components folder
- A Navbar
- A Footer
- Any startup-specific reusable components

## Learning Outcomes

After completing Day 3, you should be able to explain:

- The difference between React and Next.js
- How folders represent routes
- How a layout is shared between pages
- Where reusable components belong
- How a Next.js project is organized
