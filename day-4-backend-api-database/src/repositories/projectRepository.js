function toProject(document) {
  if (!document) {
    return null;
  }

  return {
    id: document._id.toHexString(),
    name: document.name,
    description: document.description,
    status: document.status,
    createdAt: document.createdAt.toISOString(),
  };
}

function createProjectRepository(collection) {
  async function findById(id) {
    return toProject(await collection.findOne({ _id: id }));
  }

  return {
    async list() {
      const documents = await collection.find({}).sort({ _id: -1 }).toArray();
      return documents.map(toProject);
    },
    findById,
    async create(project) {
      const document = { ...project, createdAt: new Date() };
      const result = await collection.insertOne(document);
      return toProject({ ...document, _id: result.insertedId });
    },
    async update(id, project) {
      const result = await collection.updateOne(
        { _id: id },
        { $set: project },
      );
      if (result.matchedCount === 0) {
        return null;
      }

      return findById(id);
    },
    async remove(id) {
      const result = await collection.deleteOne({ _id: id });
      return result.deletedCount > 0;
    },
    async seedIfEmpty() {
      if ((await collection.countDocuments()) > 0) {
        return;
      }

      await collection.insertMany([
        {
          name: "CampusConnect website",
          description: "Build the first version of the student project workspace.",
          status: "In progress",
          createdAt: new Date(),
        },
        {
          name: "Student orientation",
          description: "Plan a welcome event for incoming students.",
          status: "Planned",
          createdAt: new Date(),
        },
      ]);
    },
  };
}

module.exports = { createProjectRepository };
