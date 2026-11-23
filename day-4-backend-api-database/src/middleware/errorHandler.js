const { AppError } = require("../utils/AppError");

function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof AppError) {
    response.status(error.status).json({ error: error.message });
    return;
  }

  if (error.type === "entity.parse.failed") {
    response.status(400).json({ error: "Request body must contain valid JSON." });
    return;
  }

  if (error.type === "entity.too.large") {
    response.status(413).json({ error: "Request body must be 16 KB or smaller." });
    return;
  }

  if (error.type === "encoding.unsupported") {
    response.status(415).json({ error: "Request encoding is not supported." });
    return;
  }

  console.error("Request failed:", error);
  response.status(500).json({ error: "An unexpected server error occurred." });
}

module.exports = { errorHandler };
