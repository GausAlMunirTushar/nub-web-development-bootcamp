# Day 3 — Next.js and Routing

Day 3 introduces Next.js website architecture, the App Router and reusable
layout components. The live example is a three-page CampusConnect website.

The project was scaffolded with the latest Next.js CLI using JavaScript,
the App Router, ESLint and npm. To create a fresh project with the same
options, run:

```bash
npx create-next-app@latest campusconnect --javascript --app --use-npm --eslint --no-tailwind --import-alias "@/*"
```

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

The implemented project structure is:

```text
day-3-nextjs-routing/
├── package.json
├── public/
└── src/
    ├── app/
    │   ├── layout.js
    │   ├── page.js
    │   ├── globals.css
    │   ├── about/
    │   │   └── page.js
    │   └── dashboard/
    │       └── page.js
    └── components/
        ├── Navbar.js
        └── Footer.js
```

| File | Purpose |
|---|---|
| `app/page.js` | Main website page |
| `app/about/page.js` | About page |
| `app/dashboard/page.js` | Dashboard page |
| `app/layout.js` | Shared layout for the application |
| `src/components/Navbar.js` | Reusable navigation component using Next.js `Link` |
| `src/components/Footer.js` | Shared footer rendered by the root layout |

## Explore App Router Concepts

- `src/app/page.js` maps to `/`.
- `src/app/about/page.js` maps to `/about`.
- `src/app/dashboard/page.js` maps to `/dashboard`.
- `src/app/layout.js` wraps every route with the same navigation and footer.
- Pages and shared components render as Server Components by default.
- `next/link` navigates between internal routes without a full page reload.
- Each page exports route-specific metadata for its document title.

## Run the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

- `http://localhost:3000`
- `http://localhost:3000/about`
- `http://localhost:3000/dashboard`

Create a production build:

```bash
npm run build
```

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
