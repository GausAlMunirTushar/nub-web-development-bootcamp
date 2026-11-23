"use client";

import { useState } from "react";
import AiWorkflowCard from "./AiWorkflowCard";
import Navbar from "./Navbar";
import ProjectForm from "./ProjectForm";
import ProjectsTable from "./ProjectsTable";

async function requestApi(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    cache: "no-store",
    headers: {
      ...(options.body ? { "content-type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || `Request failed (${response.status}).`);
  }
  return payload;
}

export default function Dashboard({ initialProjects, initialError }) {
  const [projects, setProjects] = useState(initialProjects);
  const [editingProject, setEditingProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(initialError);
  const [notice, setNotice] = useState("");

  async function loadProjects() {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const { projects: loadedProjects } = await requestApi("/api/projects");
      setProjects(loadedProjects);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveProject(values) {
    setIsSaving(true);
    setErrorMessage("");
    try {
      const isEditing = editingProject !== null;
      const url = isEditing
        ? `/api/projects/${editingProject.id}`
        : "/api/projects";

      await requestApi(url, {
        method: isEditing ? "PUT" : "POST",
        body: JSON.stringify(values),
      });

      setEditingProject(null);
      setNotice(isEditing ? "Project updated successfully." : "Project created.");
      await loadProjects();
      return true;
    } catch (error) {
      setErrorMessage(error.message);
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  function refreshProjects() {
    setIsLoading(true);
    setErrorMessage("");
    setNotice("");
    loadProjects();
  }

  async function deleteProject(project) {
    if (!window.confirm(`Delete "${project.name}"? This cannot be undone.`)) {
      return;
    }

    setErrorMessage("");
    try {
      await requestApi(`/api/projects/${project.id}`, { method: "DELETE" });
      if (editingProject?.id === project.id) {
        setEditingProject(null);
      }
      setNotice("Project deleted.");
      await loadProjects();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const activeCount = projects.filter(
    (project) => project.status === "In progress",
  ).length;
  const completedCount = projects.filter(
    (project) => project.status === "Completed",
  ).length;

  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">Campus workspace · powered by teamwork</p>
              <h1>Make good ideas happen.</h1>
              <p>
                Plan campus projects, keep your team aligned, and make progress
                visible from one simple workspace.
              </p>
              <a className="button button-primary" href="#projects">
                View projects <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-visual" aria-label="Project progress overview">
              <div className="visual-topline">
                <span className="visual-dot" />
                <span className="visual-dot" />
                <span className="visual-dot" />
                <span className="visual-label">team workspace</span>
              </div>
              <div className="visual-main">
                <span className="visual-kicker">PROJECT OVERVIEW</span>
                <strong>{projects.length.toString().padStart(2, "0")}</strong>
                <span>projects in your workspace</span>
                <div className="visual-bars" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="visual-footer">
                <span>Plan together</span>
                <span>Build better</span>
              </div>
            </div>
          </div>
        </section>

        <section className="container dashboard-section" id="projects">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Project management</p>
              <h2>Your dashboard</h2>
              <p className="section-description">
                Project changes are saved through the Express API to MongoDB.
              </p>
            </div>
            <button
              className="button button-secondary refresh-button"
              type="button"
              onClick={refreshProjects}
              disabled={isLoading}
            >
              {isLoading ? "Refreshing…" : "Refresh"}
            </button>
          </div>

          <div className="stats-grid" aria-label="Project summary">
            <article className="stat-card">
              <span className="stat-icon stat-icon-purple" aria-hidden="true">▦</span>
              <span className="stat-label">Total projects</span>
              <strong>{projects.length}</strong>
            </article>
            <article className="stat-card">
              <span className="stat-icon stat-icon-orange" aria-hidden="true">◷</span>
              <span className="stat-label">In progress</span>
              <strong>{activeCount}</strong>
            </article>
            <article className="stat-card">
              <span className="stat-icon stat-icon-green" aria-hidden="true">✓</span>
              <span className="stat-label">Completed</span>
              <strong>{completedCount}</strong>
            </article>
          </div>

          <div className="workspace-grid">
            <ProjectForm
              key={editingProject?.id || "new"}
              editingProject={editingProject}
              isSaving={isSaving}
              onCancel={() => setEditingProject(null)}
              onSubmit={saveProject}
            />
            <section className="table-panel" aria-labelledby="project-list-title">
              <div className="table-heading">
                <div>
                  <p className="eyebrow">Your team’s work</p>
                  <h2 id="project-list-title">All projects</h2>
                </div>
                <span className="result-count">{projects.length} total</span>
              </div>

              {notice && (
                <p className="message message-success" role="status">
                  {notice}
                </p>
              )}
              {errorMessage && (
                <p className="message message-error" role="alert">
                  {errorMessage}
                </p>
              )}
              {isLoading ? (
                <p className="loading-state" role="status">
                  Loading projects…
                </p>
              ) : errorMessage && projects.length === 0 ? (
                <p className="loading-state" role="status">
                  Projects are unavailable until the Day 4 API reconnects.
                </p>
              ) : (
                <ProjectsTable
                  projects={projects}
                  onDelete={deleteProject}
                  onEdit={(project) => {
                    setNotice("");
                    setEditingProject(project);
                  }}
                />
              )}
            </section>
          </div>
        </section>

        <section className="container learning-section" id="architecture">
          <AiWorkflowCard />
          <div className="architecture-panel">
            <div>
              <p className="eyebrow">Application architecture</p>
              <h2>One request, three layers.</h2>
              <p>
                The Next.js page calls its same-origin API path. A rewrite
                forwards it to Express, which validates the request and stores
                the project document in MongoDB.
              </p>
            </div>
            <ol className="architecture-flow">
              <li><span>01</span> Next.js UI</li>
              <li><span>02</span> Express REST API</li>
              <li><span>03</span> MongoDB collection</li>
            </ol>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-content">
          <span>CampusConnect</span>
          <span>Plan together. Build better.</span>
        </div>
      </footer>
    </>
  );
}
