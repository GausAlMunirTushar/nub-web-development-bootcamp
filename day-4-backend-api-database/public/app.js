const projectForm = document.getElementById("projectForm");
const projectList = document.getElementById("projectList");
const projectCount = document.getElementById("projectCount");
const apiStatus = document.getElementById("apiStatus");
const notice = document.getElementById("notice");
const nameInput = document.getElementById("projectName");
const descriptionInput = document.getElementById("projectDescription");
const statusInput = document.getElementById("projectStatus");
const saveButton = document.getElementById("saveButton");
const cancelEditButton = document.getElementById("cancelEdit");
const refreshButton = document.getElementById("refreshButton");

let editingProjectId = null;

function setNotice(message, isError = false) {
  notice.textContent = message;
  notice.classList.toggle("notice-error", isError);
  notice.hidden = !message;
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
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

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

function renderProjects(projects) {
  projectCount.textContent = String(projects.length);
  projectList.replaceChildren();

  if (projects.length === 0) {
    projectList.append(
      createElement(
        "p",
        "empty-message",
        "No projects yet. Create one using the form.",
      ),
    );
    return;
  }

  for (const project of projects) {
    const card = createElement("article", "project-card");
    const topLine = createElement("div", "project-card-top");
    const title = createElement("h4", "", project.name);
    const status = createElement(
      "span",
      `status-badge status-${project.status.toLowerCase().replaceAll(" ", "-")}`,
      project.status,
    );
    const description = createElement(
      "p",
      "project-description",
      project.description || "No description provided.",
    );
    const meta = createElement(
      "p",
      "project-meta",
      `Project #${project.id} · Created ${new Date(project.createdAt).toLocaleDateString()}`,
    );
    const actions = createElement("div", "project-actions");
    const editButton = createElement("button", "small-button", "Edit");
    const deleteButton = createElement(
      "button",
      "small-button delete-button",
      "Delete",
    );

    editButton.type = "button";
    editButton.addEventListener("click", () => beginEdit(project));
    deleteButton.type = "button";
    deleteButton.addEventListener("click", () => deleteProject(project));

    topLine.append(title, status);
    actions.append(editButton, deleteButton);
    card.append(topLine, description, meta, actions);
    projectList.append(card);
  }
}

async function loadProjects() {
  refreshButton.disabled = true;
  try {
    const { projects } = await requestJson("/api/projects");
    renderProjects(projects);
    apiStatus.classList.remove("api-offline");
    apiStatus.lastChild.textContent = " API connected";
    setNotice("");
  } catch (error) {
    apiStatus.classList.add("api-offline");
    apiStatus.lastChild.textContent = " API unavailable";
    setNotice(error.message, true);
    projectList.replaceChildren(
      createElement("p", "empty-message", "Could not load projects."),
    );
  } finally {
    refreshButton.disabled = false;
  }
}

function resetForm() {
  editingProjectId = null;
  projectForm.reset();
  saveButton.textContent = "Create project";
  cancelEditButton.hidden = true;
  document.getElementById("formTitle").textContent = "Create a project";
}

function beginEdit(project) {
  editingProjectId = project.id;
  nameInput.value = project.name;
  descriptionInput.value = project.description;
  statusInput.value = project.status;
  saveButton.textContent = "Save changes";
  cancelEditButton.hidden = false;
  document.getElementById("formTitle").textContent = "Edit project";
  nameInput.focus();
  setNotice(`Editing project #${project.id}.`);
}

async function deleteProject(project) {
  if (!window.confirm(`Delete "${project.name}"? This cannot be undone.`)) {
    return;
  }

  try {
    await requestJson(`/api/projects/${project.id}`, { method: "DELETE" });
    if (editingProjectId === project.id) {
      resetForm();
    }
    setNotice(`Deleted "${project.name}".`);
    await loadProjects();
  } catch (error) {
    setNotice(error.message, true);
  }
}

projectForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const project = {
    name: nameInput.value.trim(),
    description: descriptionInput.value.trim(),
    status: statusInput.value,
  };
  const isEditing = editingProjectId !== null;

  saveButton.disabled = true;
  try {
    const url = isEditing
      ? `/api/projects/${editingProjectId}`
      : "/api/projects";
    await requestJson(url, {
      method: isEditing ? "PUT" : "POST",
      body: JSON.stringify(project),
    });

    setNotice(isEditing ? "Project updated." : "Project created.");
    resetForm();
    await loadProjects();
  } catch (error) {
    setNotice(error.message, true);
  } finally {
    saveButton.disabled = false;
  }
});

cancelEditButton.addEventListener("click", resetForm);
refreshButton.addEventListener("click", loadProjects);

loadProjects();
