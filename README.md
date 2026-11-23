# CSE 3292 — Web Development Bootcamp

A five-day, project-based course that develops **CampusConnect**, a
student project management application.

## Learning Path

| Day | Folder | Topic | Practical result |
|---|---|---|---|
| 1 | [day-1-web-basics](./day-1-web-basics) | HTML, CSS and JavaScript | Responsive registration and landing page |
| 2 | [day-2-react-fundamentals](./day-2-react-fundamentals) | React and Vite | Interactive task manager |
| 3 | [day-3-nextjs-routing](./day-3-nextjs-routing) | Next.js App Router | Multi-page website with shared layouts |
| 4 | [day-4-backend-api-database](./day-4-backend-api-database) | Express and MongoDB | REST API with CRUD operations |
| 5 | [day-5-ai-integration](./day-5-ai-integration) | AI-assisted integration | Full-stack project dashboard |

## Architecture

```text
Browser
   |
   v
Next.js frontend
   |
   v
Express REST API
   |
   v
MongoDB
```

Each day includes a 60-minute schedule, implementation guide, homework,
and learning outcomes.

## Prerequisites

- Node.js 24 or newer
- npm
- Visual Studio Code
- A modern web browser
- MongoDB local or MongoDB Atlas for Days 4 and 5

Verify the Node.js installation:

```powershell
node --version
npm --version
```

## Getting Started

### Day 1

Open [day-1-web-basics/index.html](./day-1-web-basics/index.html) directly,
or run:

```powershell
cd day-1-web-basics
python -m http.server 4173
```

Open `http://localhost:4173`.

### Day 2

```powershell
cd day-2-react-fundamentals
npm install
npm run dev
```

### Day 3

```powershell
cd day-3-nextjs-routing
npm install
npm run dev
```

### Day 4

```powershell
cd day-4-backend-api-database
npm install
Copy-Item .env.example .env
npm run dev
```

Configure `MONGODB_URI` and `MONGODB_DATABASE` in `.env`. The API runs at
`http://localhost:3004`.

### Day 5

Start the Day 4 API, open a second terminal, and run:

```powershell
cd day-5-ai-integration
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

| Project | Verification commands |
|---|---|
| Day 2 | `npm run build` |
| Day 3 | `npm run lint` and `npm run build` |
| Day 4 | `npm test` |
| Day 5 | `npm run lint` and `npm run build` |

For the integrated project, verify project creation, editing, deletion,
error handling, and responsive layout.

## Repository Guidelines

- Never commit `.env` files or database credentials.
- Keep `node_modules`, build output, and framework caches untracked.
- Use HTTPS or a trusted local database connection.
- Review and test AI-generated changes before keeping them.
