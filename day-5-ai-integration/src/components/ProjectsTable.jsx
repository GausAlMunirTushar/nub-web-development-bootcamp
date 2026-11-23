"use client";

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function ProjectsTable({ projects, onDelete, onEdit }) {
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">
          ◫
        </span>
        <h3>No projects yet</h3>
        <p>Create your first project with the form.</p>
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table className="projects-table">
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Status</th>
            <th scope="col">Created</th>
            <th scope="col">
              <span className="visually-hidden">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td data-label="Project">
                <div className="project-cell">
                  <span className="project-avatar" aria-hidden="true">
                    {project.name.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="project-name-group">
                    <strong>{project.name}</strong>
                    <span>{project.description || "No description"}</span>
                  </span>
                </div>
              </td>
              <td data-label="Status">
                <span
                  className={`status-badge status-${project.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  <span className="status-dot" aria-hidden="true" />
                  {project.status}
                </span>
              </td>
              <td data-label="Created" className="date-cell">
                {formatDate(project.createdAt)}
              </td>
              <td data-label="Actions">
                <div className="row-actions">
                  <button
                    className="icon-button"
                    type="button"
                    onClick={() => onEdit(project)}
                    aria-label={`Edit ${project.name}`}
                  >
                    Edit
                  </button>
                  <button
                    className="icon-button delete-action"
                    type="button"
                    onClick={() => onDelete(project)}
                    aria-label={`Delete ${project.name}`}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
