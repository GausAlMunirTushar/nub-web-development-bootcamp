# Day 4 — Express, API and MongoDB

Day 4 demonstrates how data moves from a browser frontend through an
Express 5 REST API into MongoDB.

The PDF's database exercise mentions PostgreSQL or Supabase. This
implementation uses MongoDB as requested; the frontend → API → database
flow and CRUD learning goals stay the same.

## 60-Minute Schedule

| Time | Topic |
|---|---|
| 0–10 minutes | Frontend vs backend vs database |
| 10–20 minutes | What is an API? What is REST? |
| 20–30 minutes | GET, POST, PUT and DELETE |
| 30–40 minutes | JSON request/response and validation |
| 40–55 minutes | Live demo: Express API and MongoDB |
| 55–60 minutes | Quick quiz |

## Implemented CampusConnect Lab

The browser dashboard lets users create, view, edit, and delete projects.
Express receives the HTTP requests, the service validates input, and the
repository reads or writes documents in MongoDB.

```text
public/index.html + app.js
          |
          | fetch() with JSON over HTTP
          v
server.js → src/app.js → routes → controllers → services
                                             |
                                             v
                                      repositories
                                             |
                                             v
                              MongoDB: campusconnect.projects
```

The app connects once at startup and reuses the MongoClient. When the
`projects` collection is empty, it inserts two sample projects.

The Node.js driver defaults are used for connection pooling because this
teaching app has no measured production concurrency. If workload grows,
monitor request latency and MongoDB `connections.current` /
`connections.available` before adjusting pool settings.

## Project Structure

```text
day-4-backend-api-database/
├── .env.example
├── package.json
├── server.js
├── src/
│   ├── app.js
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── utils/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── test/
    └── api.test.cjs
```

## Requirements and Setup

Requires Node.js 24 or newer, Express 5, and a reachable MongoDB instance
(local MongoDB or MongoDB Atlas).

Install dependencies and make a local environment file:

```powershell
cd day-4-backend-api-database
npm install
Copy-Item .env.example .env
```

Update `.env` if needed:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DATABASE=campusconnect
PORT=3004
```

For Atlas, use your Atlas connection URI as `MONGODB_URI`. Do not commit
`.env` or share database credentials.

Start the app in watch mode:

```bash
npm run dev
```

Open `http://localhost:3004`. Use `npm start` to start without watch mode.

Run API tests:

```bash
npm test
```

The API tests use an in-memory repository and do not require a live MongoDB
instance.

## MongoDB Document Model

Projects are stored as documents in a single `projects` collection. The
dashboard reads and updates these fields together, so they live together
in each document:

```json
{
  "_id": "MongoDB ObjectId",
  "name": "Campus event planner",
  "description": "Help student teams organize campus events.",
  "status": "Planned",
  "createdAt": "BSON Date"
}
```

The example has no related collections or unbounded embedded arrays.
MongoDB's built-in `_id` index supports individual project lookups; no
additional index is needed for this small demo.

## REST API

| Method | Route | Behavior |
|---|---|---|
| `GET` | `/api/projects` | Read all projects |
| `GET` | `/api/projects/:id` | Read one project |
| `POST` | `/api/projects` | Create a project |
| `PUT` | `/api/projects/:id` | Update a project |
| `DELETE` | `/api/projects/:id` | Delete a project |

Project IDs are 24-character MongoDB ObjectIds. Create/update requests
accept JSON with a required `name` (maximum 120 characters), optional
`description` (maximum 2000 characters), and a `status` of `Planned`,
`In progress`, or `Completed`.

Example request:

```bash
curl.exe -X POST http://localhost:3004/api/projects ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Campus event planner\",\"description\":\"Plan a student event.\",\"status\":\"Planned\"}"
```

Invalid input returns `400`, missing projects return `404`, unsupported
methods return `405`, oversized bodies return `413`, and unsupported
content types return `415`. API errors are returned as JSON.

## Request Flow

1. A student submits the project form.
2. The browser sends a JSON `POST` or `PUT` request using `fetch`.
3. Express routes the request to a controller.
4. The service validates the input and MongoDB ObjectId.
5. The repository reads or writes the MongoDB document.
6. Express responds with JSON and an HTTP status code.
7. The frontend refreshes the project list.

## Homework

Draw your startup's frontend-backend-database architecture and identify
the information that needs to be stored.

Include:

- Frontend or Next.js
- API request and response
- Backend server and business logic
- MongoDB database and collections
- The HTTP method for each major operation
- Possible data: name, email, department, project, task, status, timestamp,
  and user role
- If authentication is included, use an auth provider or a password hash;
  never store a plain-text password

## Learning Outcomes

After completing Day 4, you should be able to explain:

- Frontend, backend and database responsibilities
- Express routes, controllers, services and repositories
- REST, JSON and HTTP status codes
- CRUD operations
- How a request moves through the application
