# Day 5 — AI Vibe Coding and Integration

Day 5 practices prompting, inspecting, debugging and verifying code with an
AI coding agent. The deliverable is a Next.js project dashboard connected
to the Day 4 Express and MongoDB API.

## 60-Minute Schedule

| Time | Topic |
|---|---|
| 0–10 minutes | AI coding agents |
| 10–20 minutes | Prompt engineering |
| 20–30 minutes | Inspect AI-generated code |
| 30–40 minutes | Debug and modify generated code |
| 40–55 minutes | Build a mini startup website |
| 55–60 minutes | Individual/team evaluation |

## Implemented CampusConnect App

The app includes:

- Responsive navigation and dashboard
- Project summary cards
- Project creation form
- Projects table with edit and delete actions
- Loading, empty, success and error states
- Day 4 API integration through a Next.js rewrite
- A copyable AI prompt and code-review checklist

The prompt card helps prepare a request for an AI coding agent. It does not
pretend to generate AI responses or require an AI API key. The actual
project dashboard calls the Express API and saves data in MongoDB.

## Architecture

```text
Next.js dashboard
       |
       | fetch("/api/projects")
       v
Next.js rewrite (CAMPUS_API_URL)
       |
       v
Day 4 Express REST API
       |
       v
MongoDB: campusconnect.projects
```

The Next.js rewrite keeps browser requests same-origin. `CAMPUS_API_URL`
is read by Next.js on the server and defaults to `http://127.0.0.1:3004`.

## Run Both Projects

Requires Node.js 24 or newer and a running MongoDB instance.

### 1. Start Day 4 API

In the first terminal:

```powershell
cd day-4-backend-api-database
npm install
Copy-Item .env.example .env
npm run dev
```

Configure `MONGODB_URI` in `day-4-backend-api-database/.env` for your local
MongoDB or Atlas instance. Keep real credentials private.

### 2. Start Day 5 Next.js app

In a second terminal:

```powershell
cd day-5-ai-integration
npm install
npm run dev
```

Open `http://localhost:3000`. To use another API host, set
`CAMPUS_API_URL` in `day-5-ai-integration/.env` and restart Next.js.

## Project Structure

```text
day-5-ai-integration/
├── next.config.mjs
├── package.json
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.js
    │   └── page.js
    └── components/
        ├── AiWorkflowCard.jsx
        ├── Dashboard.jsx
        ├── Navbar.jsx
        ├── ProjectForm.jsx
        └── ProjectsTable.jsx
```

| File | Purpose |
|---|---|
| `src/app/page.js` | App Router page entry point |
| `src/app/layout.js` | Shared HTML layout and site metadata |
| `src/app/globals.css` | Responsive dashboard styling |
| `src/components/Dashboard.jsx` | Loads API data and coordinates CRUD state |
| `src/components/ProjectForm.jsx` | Creates and edits projects |
| `src/components/ProjectsTable.jsx` | Displays project records and actions |
| `src/components/Navbar.jsx` | Responsive site navigation |
| `src/components/AiWorkflowCard.jsx` | Copies an AI prompt and shows a review checklist |
| `next.config.mjs` | Proxies `/api/*` requests to the Day 4 Express server |

## AI Coding Prompt

The app's AI workflow card provides this scoped prompt:

```text
Build a campus project dashboard with Next.js.
First inspect the existing files and explain the current architecture.
Add only the requested feature, reuse existing components, and preserve current behavior.
After editing, explain each changed file and run the project's lint and build commands.
If a command fails, read the full error and fix the root cause. Do not invent backend data.
```

## Verification Checklist

- Start the Day 4 API and Day 5 app
- Confirm the dashboard loads projects from MongoDB
- Create a project and verify it appears
- Edit the project and verify the updated values
- Delete the project and verify it disappears
- Try a mobile viewport and test navigation/form layout
- Review the changed files and run lint/build
- Check that errors are visible instead of silently showing fake data

## Homework

Each team presents its startup's frontend framework, routes, components,
backend, API, database, data flow, and how AI-generated code was verified.

## Learning Outcomes

After completing the five-day bootcamp, learners should be able to explain
frontend, backend, database, API, framework, components, routing, and
responsible use of AI-generated code.
