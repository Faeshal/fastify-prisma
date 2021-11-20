const userController = require("../controller/user");

async function routes(fastify, options) {
  fastify.get("/api/v1/users", userController.getUsers);
  fastify.post("/api/v1/users", userController.createUser);
  fastify.get("/api/v1/users/:id", userController.getUser);
  fastify.put("/api/v1/users/:id", userController.updateUser);
  fastify.delete("/api/v1/users/:id", userController.deleteuser);
}

module.exports = routes;
