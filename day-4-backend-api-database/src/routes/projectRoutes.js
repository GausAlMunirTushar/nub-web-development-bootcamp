const { Router } = require("express");

function methodNotAllowed(allowedMethods) {
  return (request, response) => {
    response.set("Allow", allowedMethods.join(", "));
    response.status(405).json({ error: "Method not allowed." });
  };
}

function createProjectRouter(controller) {
  const router = Router();

  router.get("/", controller.list);
  router.post("/", controller.create);
  router.all("/", methodNotAllowed(["GET", "POST"]));

  router.get("/:id", controller.get);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);
  router.all("/:id", methodNotAllowed(["GET", "PUT", "DELETE"]));

  return router;
}

module.exports = { createProjectRouter };
