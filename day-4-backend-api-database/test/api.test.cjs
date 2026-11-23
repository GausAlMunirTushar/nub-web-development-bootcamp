const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const { ObjectId } = require("mongodb");
const { createApp } = require("../src/app");

let server;
let baseUrl;
let projects;

function createMemoryRepository() {
  const records = new Map();
  const sampleProjects = [
    {
      name: "CampusConnect website",
      description: "Build the student project workspace.",
      status: "In progress",
    },
    {
      name: "Student orientation",
      description: "Plan a welcome event.",
      status: "Planned",
    },
  ];

  for (const project of sampleProjects) {
    const record = {
      ...project,
      id: new ObjectId().toHexString(),
      createdAt: new Date().toISOString(),
    };
    records.set(record.id, record);
  }

  return {
    async list() {
      return [...records.values()].sort((left, right) =>
        right.id.localeCompare(left.id),
      );
    },
    async findById(id) {
      return records.get(id.toHexString()) || null;
    },
    async create(project) {
      const record = {
        ...project,
        id: new ObjectId().toHexString(),
        createdAt: new Date().toISOString(),
      };
      records.set(record.id, record);
      return record;
    },
    async update(id, project) {
      const recordId = id.toHexString();
      const current = records.get(recordId);
      if (!current) {
        return null;
      }

      const updated = { ...current, ...project };
      records.set(recordId, updated);
      return updated;
    },
    async remove(id) {
      return records.delete(id.toHexString());
    },
  };
}

before(async () => {
  projects = createMemoryRepository();
  server = createApp(projects).listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("projects support the full create, read, update and delete flow", async () => {
  const initialResponse = await fetch(`${baseUrl}/api/projects`);
  assert.equal(initialResponse.status, 200);
  assert.equal((await initialResponse.json()).projects.length, 2);

  const createResponse = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "API lab",
      description: "Practice CRUD with MongoDB.",
      status: "Planned",
    }),
  });
  assert.equal(createResponse.status, 201);
  const { project: created } = await createResponse.json();
  assert.match(created.id, /^[0-9a-f]{24}$/);
  assert.equal(created.name, "API lab");

  const readResponse = await fetch(`${baseUrl}/api/projects/${created.id}`);
  assert.equal(readResponse.status, 200);
  assert.equal((await readResponse.json()).project.id, created.id);

  const updateResponse = await fetch(`${baseUrl}/api/projects/${created.id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Updated API lab",
      description: "Practice all four REST methods.",
      status: "In progress",
    }),
  });
  assert.equal(updateResponse.status, 200);
  assert.equal((await updateResponse.json()).project.status, "In progress");

  const deleteResponse = await fetch(`${baseUrl}/api/projects/${created.id}`, {
    method: "DELETE",
  });
  assert.equal(deleteResponse.status, 204);

  const missingResponse = await fetch(`${baseUrl}/api/projects/${created.id}`);
  assert.equal(missingResponse.status, 404);
});

test("project creation validates JSON, fields and MongoDB ObjectIds", async () => {
  const unsupportedTypeResponse = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: '{"name":"Wrong content type"}',
  });
  assert.equal(unsupportedTypeResponse.status, 415);

  const invalidJsonResponse = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{invalid",
  });
  assert.equal(invalidJsonResponse.status, 400);

  const missingNameResponse = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "   " }),
  });
  assert.equal(missingNameResponse.status, 400);

  const invalidStatusResponse = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Bad status", status: "Unknown" }),
  });
  assert.equal(invalidStatusResponse.status, 400);

  const oversizedResponse = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Large body", description: "x".repeat(17_000) }),
  });
  assert.equal(oversizedResponse.status, 413);

  const invalidIdResponse = await fetch(`${baseUrl}/api/projects/not-an-id`);
  assert.equal(invalidIdResponse.status, 400);
});

test("project endpoints reject unsupported methods with an Allow header", async () => {
  const response = await fetch(`${baseUrl}/api/projects`, { method: "DELETE" });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "GET, POST");
});

test("the frontend assets are served by Express", async () => {
  const pageResponse = await fetch(baseUrl);
  assert.equal(pageResponse.status, 200);
  assert.match(pageResponse.headers.get("content-type"), /text\/html/);
  assert.match(await pageResponse.text(), /Student projects/);

  const scriptResponse = await fetch(`${baseUrl}/app.js`);
  assert.equal(scriptResponse.status, 200);
  assert.match(await scriptResponse.text(), /\/api\/projects/);
});
