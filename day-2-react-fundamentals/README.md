# Day 2 — React Fundamentals

This practical uses React and Vite to build a CampusConnect task manager.
It introduces components, props, state and event handling.

## 60-Minute Schedule

| Time | Topic |
|---|---|
| 0–10 minutes | React and component-based development |
| 10–20 minutes | Vite setup and JSX |
| 20–30 minutes | Components and props |
| 30–40 minutes | State and event handling |
| 40–55 minutes | Live coding: task manager |
| 55–60 minutes | Review and quick quiz |

## Component Structure

```text
App
├── Navbar
├── TaskForm
├── TaskList
│   └── TaskItem
```

| Component | Responsibility |
|---|---|
| `App` | Stores task state and coordinates operations |
| `Navbar` | Displays branding and profile information |
| `TaskForm` | Accepts a task title and adds the task |
| `TaskList` | Renders task rows and an empty state |
| `TaskItem` | Shows task controls and completion status |

## Implemented Features

- Add a task
- Complete or reopen a task
- Remove a task
- Count completed tasks
- Display an empty state
- Responsive layout

## Run the Project

```powershell
cd day-2-react-fundamentals
npm install
npm run dev
```

Create a production build:

```powershell
npm run build
```

## Key Concepts

- JSX combines markup and JavaScript expressions.
- Props transfer data and callbacks between components.
- `useState` stores values that trigger re-rendering.
- Event handlers process form and button interactions.
- `map()` renders a collection as React elements.

## Homework

Identify at least four reusable components in your startup website.
For each component, document:

- Component name
- Props or data received
- Primary responsibility
- Possible reuse locations

## Learning Outcomes

After completing this day, you should be able to:

- Explain component-based development
- Create reusable React components
- Pass props and callback functions
- Store state with `useState`
- Handle form and button events
- Render lists with `map`
