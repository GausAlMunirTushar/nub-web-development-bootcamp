const { AppError } = require("../utils/AppError");
const { ObjectId } = require("mongodb");

const PROJECT_STATUSES = new Set(["Planned", "In progress", "Completed"]);

function validateProject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new AppError(400, "Request body must be a JSON object.");
  }

  const name = typeof value.name === "string" ? value.name.trim() : "";
  const description = value.description === undefined ? "" : value.description;
  const status = value.status === undefined ? "Planned" : value.status;

  if (!name) {
    throw new AppError(400, "Project name is required.");
  }
  if (name.length > 120) {
    throw new AppError(400, "Project name must be 120 characters or fewer.");
  }
  if (typeof description !== "string") {
    throw new AppError(400, "Project description must be a string.");
  }
  if (description.trim().length > 2000) {
    throw new AppError(
      400,
      "Project description must be 2000 characters or fewer.",
    );
  }
  if (!PROJECT_STATUSES.has(status)) {
    throw new AppError(
      400,
      `Status must be one of: ${Array.from(PROJECT_STATUSES).join(", ")}.`,
    );
  }

  return { name, description: description.trim(), status };
}

function parseProjectId(value) {
  if (!/^[0-9a-f]{24}$/i.test(value)) {
    throw new AppError(400, "Project ID must be a 24-character ObjectId.");
  }
  return new ObjectId(value);
}

function createProjectService(repository) {
  return {
    list() {
      return repository.list();
    },
    async getById(rawId) {
      const project = await repository.findById(parseProjectId(rawId));
      if (!project) {
        throw new AppError(404, "Project not found.");
      }
      return project;
    },
    create(value) {
      return repository.create(validateProject(value));
    },
    async update(rawId, value) {
      const id = parseProjectId(rawId);
      const project = await repository.update(id, validateProject(value));
      if (!project) {
        throw new AppError(404, "Project not found.");
      }
      return project;
    },
    async remove(rawId) {
      const id = parseProjectId(rawId);
      if (!(await repository.remove(id))) {
        throw new AppError(404, "Project not found.");
      }
    },
  };
}

module.exports = { createProjectService };
