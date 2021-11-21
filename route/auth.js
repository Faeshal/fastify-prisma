const authController = require("../controller/auth");

async function routes(fastify, options) {
  fastify.post("/api/v1/auth/register", authController.register);
  fastify.post("/api/v1/auth/login", authController.login);
  fastify.post("/api/v1/auth/logout", authController.logout);
}

module.exports = routes;
