const { MongoClient } = require("mongodb");

async function connectToMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is required. Copy .env.example to .env and configure MongoDB.",
    );
  }

  const client = new MongoClient(uri);
  await client.connect();

  const databaseName = process.env.MONGODB_DATABASE || "campusconnect";
  return {
    client,
    database: client.db(databaseName),
  };
}

module.exports = { connectToMongo };
