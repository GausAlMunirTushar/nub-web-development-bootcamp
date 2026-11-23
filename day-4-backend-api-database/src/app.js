const express = require("express");
const { join } = require("node:path");
const { createProjectController } = require("./controllers/projectController");
const { createProjectRouter } = require("./routes/projectRoutes");
const { createProjectService } = require("./services/projectService");
const { AppError } = require("./utils/AppError");
const { errorHandler } = require("./middleware/errorHandler");

const PUBLIC_DIRECTORY = join(__dirname, "..", "public");
const JSON_CONTENT_TYPE = /^application\/json(?:\s*;|$)/i;

function requireJsonForMutations(request, response, next) {
  if (
    ["POST", "PUT"].includes(request.method) &&
    !JSON_CONTENT_TYPE.test(request.get("content-type") || "")
  ) {
    next(new AppError(415, "Content-Type must be application/json."));
    return;
  }
  next();
}

function createApp(projectRepository) {
  const app = express();
  const service = createProjectService(projectRepository);
  const controller = createProjectController(service);

  app.disable("x-powered-by");
  app.use((request, response, next) => {
    response.set("X-Content-Type-Options", "nosniff");
    response.set("Referrer-Policy", "same-origin");
    next();
  });
  app.use(express.static(PUBLIC_DIRECTORY));
  app.use("/api", (request, response, next) => {
    response.set("Cache-Control", "no-store");
    next();
  });
  app.use(
    "/api/projects",
    requireJsonForMutations,
    express.json({ limit: "16kb" }),
    createProjectRouter(controller),
  );
  app.use("/api", (request, response) => {
    response.status(404).json({ error: "API route not found." });
  });
  app.use((request, response) => {
    response.status(404).json({ error: "Page not found." });
  });
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
