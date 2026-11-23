const { createApp } = require("./src/app");
const { connectToMongo } = require("./src/database/mongoClient");
const { createProjectRepository } = require("./src/repositories/projectRepository");

const PORT = Number(process.env.PORT || 3004);

async function startServer() {
  const { client, database } = await connectToMongo();
  const projectRepository = createProjectRepository(
    database.collection("projects"),
  );
  await projectRepository.seedIfEmpty();

  const app = createApp(projectRepository);
  const server = app.listen(PORT, "127.0.0.1", () => {
    console.log(`CampusConnect API ready at http://localhost:${PORT}`);
    console.log(`MongoDB database: ${database.databaseName}`);
  });

  server.on("close", () => {
    client.close().catch((error) => {
      console.error("Could not close the MongoDB connection cleanly:", error);
      process.exitCode = 1;
    });
  });

  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => {
      server.close((error) => {
        if (error) {
          console.error("Could not close the server cleanly:", error);
          process.exitCode = 1;
        }
      });
    });
  }
}

startServer().catch((error) => {
  console.error("Could not start CampusConnect:", error);
  process.exitCode = 1;
});
