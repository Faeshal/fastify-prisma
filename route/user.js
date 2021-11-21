const userController = require("../controller/user");
const schema = require("../schema/user");
const { protect } = require("../middleware/auth");
const log4js = require("log4js");
const log = log4js.getLogger("user");
log.level = "info";
require("pretty-error").start();

async function routes(fastify, options) {
  fastify.get(
    "/api/v1/users",
    { preHandler: [protect] },
    userController.getUsers
  );
  fastify.post(
    "/api/v1/users",
    { schema: schema.createUser, preHandler: [protect] },
    userController.createUser
  );
  fastify.get(
    "/api/v1/users/:id",
    { schema: schema.getUser, preHandler: [protect] },
    userController.getUser
  );
  fastify.put(
    "/api/v1/users/:id",
    { schema: schema.updateUser, preHandler: [protect] },
    userController.updateUser
  );
  fastify.delete(
    "/api/v1/users/:id",
    { schema: schema.deleteUser, preHandler: [protect] },
    userController.deleteuser
  );
}

module.exports = routes;
