# Day 4 — Backend, API and Database

Day 4 explains how data moves through a website. The example follows a
request from a Next.js frontend through a backend and into a database.

## 60-Minute Schedule

| Time | Topic |
|---|---|
| 0–10 minutes | Frontend vs backend vs database |
| 10–20 minutes | What is an API? What is REST? |
| 20–30 minutes | GET, POST, PUT and DELETE |
| 30–40 minutes | JSON and API request/response |
| 40–55 minutes | Live demonstration: API and database |
| 55–60 minutes | Quick quiz |

## Core Goal

Understand how data moves through a website.

## Request Flow

```text
Frontend
   |
   | HTTP request
   v
API / Backend
   |
   | Read or write
   v
Database
```

The request flow is:

1. The frontend sends a request.
2. The backend applies its business logic.
3. The database stores or returns data.
4. The backend sends a JSON response.
5. The frontend displays the result.

## HTTP Methods

| Method | Meaning | CampusConnect Example |
|---|---|---|
| GET | Read data | View projects |
| POST | Create data | Add a project |
| PUT | Update data | Edit a project |
| DELETE | Remove data | Remove a project |

## JSON Example

```json
{
  "name": "Rahim",
  "department": "CSE",
  "project": "CampusConnect"
}
```

## Homework

Draw your startup's frontend-backend-database architecture and identify
the information that needs to be stored.

The architecture should show:

- Frontend or Next.js
- API request and response
- Backend server
- Business logic
- Database such as PostgreSQL or Supabase
- The operations used for each request

Include possible records such as:

- User name
- Email
- Department
- Password or authentication reference
- Project name
- Project description
- Task name
- Status
- Timestamp
- User role

For every major action, identify whether it uses GET, POST, PUT or DELETE.

## Learning Outcomes

After completing Day 4, you should be able to explain:

- Frontend, backend and database responsibilities
- API and REST concepts
- JSON request and response data
- CRUD operations
- How a request moves through a full application
