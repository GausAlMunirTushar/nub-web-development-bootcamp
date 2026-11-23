# Day 2 — React Fundamentals

Day 2 introduces component-based development with React. The practical
example is a CampusConnect task management application that demonstrates
JSX, components, props, state and event handling.

## 60-Minute Schedule

| Time | Topic |
|---|---|
| 0–10 minutes | What is React? Why do we need it? |
| 10–20 minutes | JSX and components |
| 20–30 minutes | Props and reusable components |
| 30–40 minutes | State and event handling |
| 40–55 minutes | Live coding: Task management application |
| 55–60 minutes | Quick quiz |

## Core Concepts

You must understand:

- Components
- JSX
- Props
- State
- Events

## Application Components

```text
App
├── Navbar
├── TaskForm
├── TaskList
└── TaskItem
```

| Component | Purpose |
|---|---|
| `App` | Owns the task state and coordinates task operations |
| `Navbar` | Displays the CampusConnect brand and profile area |
| `TaskForm` | Collects a task title and submits a new task |
| `TaskList` | Renders tasks and handles the empty state |
| `TaskItem` | Shows one task and complete/remove controls |

## Features

- Add a task
- Display the task list
- Mark a task as completed
- Mark a completed task as incomplete
- Remove a task
- Show the number of completed tasks
- Show an empty state when every task is removed
- Responsive mobile layout

## Project Structure

```text
day-2-react-fundamentals/
├── index.html
├── package.json
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   └── components/
│       ├── Navbar.jsx
│       ├── TaskForm.jsx
│       ├── TaskList.jsx
│       └── TaskItem.jsx
└── README.md
```

## Run the Project

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## React Concepts Used

### JSX

JSX lets JavaScript and HTML-like markup be written together in a React
component.

### Props

Props pass data and functions from parent components to child components.
For example, `TaskList` receives tasks and callback functions from `App`.

### State

The task array is stored in `App` using `useState`. Updating state makes
the interface re-render automatically.

### Events

Form submit, checkbox-style task button and remove button interactions
use React event handlers to change the application state.

## Homework

Identify at least four reusable components in your startup website.
Write down:

- The component name
- What information it receives
- Why it can be reused
- An example where it will appear

Useful examples include Navbar, Footer, Card, Button, Form and ProjectItem.

## Learning Outcomes

After completing Day 2, you should be able to:

- Explain JSX and component-based development
- Create reusable React components
- Pass props between components
- Store and update state with `useState`
- Handle button and form events
- Render lists using `map`
