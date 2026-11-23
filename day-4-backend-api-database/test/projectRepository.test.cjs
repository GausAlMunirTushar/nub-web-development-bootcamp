const assert = require("node:assert/strict");
const { test } = require("node:test");
const { ObjectId } = require("mongodb");
const { createProjectRepository } = require("../src/repositories/projectRepository");
const { connectToMongo } = require("../src/database/mongoClient");

function createMemoryCollection() {
  const documents = new Map();

  return {
    find() {
      return {
        sort() {
          return this;
        },
        async toArray() {
          return [...documents.values()];
        },
      };
    },
    async findOne({ _id }) {
      return documents.get(_id.toHexString()) || null;
    },
    async insertOne(document) {
      const _id = new ObjectId();
      documents.set(_id.toHexString(), { ...document, _id });
      return { insertedId: _id };
    },
    async updateOne({ _id }, { $set }) {
      const key = _id.toHexString();
      const existing = documents.get(key);
      if (!existing) {
        return { matchedCount: 0 };
      }

      documents.set(key, { ...existing, ...$set });
      return { matchedCount: 1 };
    },
    async deleteOne({ _id }) {
      return { deletedCount: Number(documents.delete(_id.toHexString())) };
    },
    async countDocuments() {
      return documents.size;
    },
    async insertMany(newDocuments) {
      for (const document of newDocuments) {
        await this.insertOne(document);
      }
    },
  };
}

test("MongoDB project repository seeds once and maps CRUD documents", async () => {
  const repository = createProjectRepository(createMemoryCollection());
  await repository.seedIfEmpty();
  await repository.seedIfEmpty();

  const seededProjects = await repository.list();
  assert.equal(seededProjects.length, 2);
  assert.match(seededProjects[0].id, /^[0-9a-f]{24}$/);
  assert.equal(typeof seededProjects[0].createdAt, "string");

  const created = await repository.create({
    name: "Repository test",
    description: "Test MongoDB document mapping.",
    status: "Planned",
  });
  assert.equal((await repository.findById(new ObjectId(created.id))).name, "Repository test");

  const updated = await repository.update(new ObjectId(created.id), {
    name: "Updated repository test",
    description: "",
    status: "Completed",
  });
  assert.equal(updated.status, "Completed");

  assert.equal(await repository.remove(new ObjectId(created.id)), true);
  assert.equal(await repository.findById(new ObjectId(created.id)), null);
});

test("MongoDB startup fails with a clear message when the URI is missing", async () => {
  const originalUri = process.env.MONGODB_URI;
  delete process.env.MONGODB_URI;

  try {
    await assert.rejects(connectToMongo(), /MONGODB_URI is required/);
  } finally {
    if (originalUri === undefined) {
      delete process.env.MONGODB_URI;
    } else {
      process.env.MONGODB_URI = originalUri;
    }
  }
});
