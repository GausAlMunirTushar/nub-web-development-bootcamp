"use client";

import { useState } from "react";

const emptyProject = {
  name: "",
  description: "",
  status: "Planned",
};

export default function ProjectForm({
  editingProject,
  isSaving,
  onCancel,
  onSubmit,
}) {
  const [values, setValues] = useState(() =>
    editingProject
      ? {
          name: editingProject.name,
          description: editingProject.description,
          status: editingProject.status,
        }
      : emptyProject,
  );

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const saved = await onSubmit({
      name: values.name.trim(),
      description: values.description.trim(),
      status: values.status,
    });

    if (saved) {
      setValues(emptyProject);
    }
  }

  return (
    <section className="form-panel" aria-labelledby="formTitle">
      <div className="panel-heading">
        <div className="panel-icon" aria-hidden="true">
          {editingProject ? "↻" : "+"}
        </div>
        <div>
          <p className="eyebrow">{editingProject ? "Update details" : "Get started"}</p>
          <h2 id="formTitle">
            {editingProject ? "Edit project" : "Create a project"}
          </h2>
        </div>
      </div>

      <form className="project-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="projectName">Project name</label>
          <input
            id="projectName"
            name="name"
            value={values.name}
            onChange={updateField}
            maxLength={120}
            placeholder="Example: Campus event planner"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="projectDescription">Description</label>
          <textarea
            id="projectDescription"
            name="description"
            value={values.description}
            onChange={updateField}
            maxLength={2000}
            rows={4}
            placeholder="What is your team building?"
          />
        </div>

        <div className="field">
          <label htmlFor="projectStatus">Status</label>
          <select
            id="projectStatus"
            name="status"
            value={values.status}
            onChange={updateField}
          >
            <option>Planned</option>
            <option>In progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="button button-primary" type="submit" disabled={isSaving}>
            {isSaving
              ? "Saving…"
              : editingProject
                ? "Save changes"
                : "Create project"}
          </button>
          {editingProject && (
            <button
              className="button button-secondary"
              type="button"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
