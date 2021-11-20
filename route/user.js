const userController = require("../controller/user");
async function routes(fastify, options) {
  fastify.get("/api/v1/users", userController.getUsers);
  fastify.post("/api/v1/users", userController.createUser);
}

module.exports = routes;
