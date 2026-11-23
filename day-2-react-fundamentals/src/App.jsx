import { useState } from "react";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const initialTasks = [
  {
    id: 1,
    title: "Prepare project proposal",
    category: "Planning",
    completed: true,
  },
  {
    id: 2,
    title: "Create the homepage wireframe",
    category: "Design",
    completed: false,
  },
  {
    id: 3,
    title: "Build the registration form",
    category: "Development",
    completed: false,
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  function addTask(title) {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title,
        category: "New task",
        completed: false,
      },
    ]);
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function removeTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <>
      <Navbar />
      <main className="task-page">
        <section className="task-shell">
          <div className="task-heading">
            <div>
              <p className="eyebrow">Web Development</p>
              <h1>My tasks</h1>
            </div>
            <div className="task-count" aria-label={`${completedCount} tasks completed`}>
              <strong>{completedCount}</strong>
              <span>completed</span>
            </div>
          </div>

          <TaskForm onAddTask={addTask} />
          <TaskList
            tasks={tasks}
            onToggleTask={toggleTask}
            onRemoveTask={removeTask}
          />
        </section>
      </main>
    </>
  );
}
