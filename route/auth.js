const authController = require("../controller/auth");
const log4js = require("log4js");
const log = log4js.getLogger("auth");
log.level = "info";
require("pretty-error").start();

async function routes(fastify, options) {
  fastify.post("/api/v1/auth/register", authController.register);
  fastify.post("/api/v1/auth/login", authController.login);
  fastify.post("/api/v1/auth/logout", authController.logout);
}

module.exports = routes;
