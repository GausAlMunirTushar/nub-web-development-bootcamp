import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      return;
    }

    onAddTask(cleanTitle);
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="taskTitle">Add a new task</label>
      <div className="task-form-row">
        <input
          id="taskTitle"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add task</button>
      </div>
    </form>
  );
}
