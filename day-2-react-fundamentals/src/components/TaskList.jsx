import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggleTask, onRemoveTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h2>No tasks yet</h2>
        <p>Add a task to start your project plan.</p>
      </div>
    );
  }

  return (
    <div className="task-list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onRemove={onRemoveTask}
        />
      ))}
    </div>
  );
}
