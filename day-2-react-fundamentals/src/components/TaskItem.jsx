export default function TaskItem({ task, onToggle, onRemove }) {
  return (
    <article className={`task-item ${task.completed ? "task-completed" : ""}`}>
      <button
        className="task-check"
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={
          task.completed
            ? `Mark ${task.title} as incomplete`
            : `Mark ${task.title} as completed`
        }
        aria-pressed={task.completed}
      >
        {task.completed ? "\u2713" : ""}
      </button>

      <div className="task-details">
        <h2>{task.title}</h2>
        <p>{task.category}</p>
      </div>

      <button
        className="remove-button"
        type="button"
        onClick={() => onRemove(task.id)}
        aria-label={`Remove ${task.title}`}
      >
        Remove
      </button>
    </article>
  );
}
