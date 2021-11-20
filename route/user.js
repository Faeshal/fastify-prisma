const userController = require("../controller/user");
const schema = require("../schema/user");

async function routes(fastify, options) {
  fastify.get("/api/v1/users", userController.getUsers);
  fastify.post(
    "/api/v1/users",
    { schema: schema.createUser },
    userController.createUser
  );
  fastify.get(
    "/api/v1/users/:id",
    { schema: schema.getUser },
    userController.getUser
  );
  fastify.put(
    "/api/v1/users/:id",
    { schema: schema.updateUser },
    userController.updateUser
  );
  fastify.delete(
    "/api/v1/users/:id",
    { schema: schema.deleteUser },
    userController.deleteuser
  );
}

module.exports = routes;
