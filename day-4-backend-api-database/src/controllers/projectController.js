function createProjectController(service) {
  return {
    async list(request, response) {
      response.json({ projects: await service.list() });
    },
    async get(request, response) {
      response.json({ project: await service.getById(request.params.id) });
    },
    async create(request, response) {
      const project = await service.create(request.body);
      response.status(201).json({ project });
    },
    async update(request, response) {
      const project = await service.update(request.params.id, request.body);
      response.json({ project });
    },
    async remove(request, response) {
      await service.remove(request.params.id);
      response.status(204).end();
    },
  };
}

module.exports = { createProjectController };
