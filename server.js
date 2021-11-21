const fastify = require("fastify")();
const fs = require("fs");
const path = require("path");
const log4js = require("log4js");
const log = log4js.getLogger("entrypoint");
log.level = "info";
require("pretty-error").start();

// * Middleware
fastify.register(require("fastify-secure-session"), {
  // the name of the session cookie, defaults to 'session'
  cookieName: "fastprisma-cookie",
  // adapt this to point to the directory where secret-key is located
  key: fs.readFileSync(path.join(__dirname, "secret-key")),
  cookie: {
    path: "/",
    httpOnly: false,
  },
});

// * Routes
const userRoutes = require("./route/user");
const authRoutes = require("./route/auth");

// * middleware
fastify.register(userRoutes);
fastify.register(authRoutes);

// Declare a route
fastify.get("/", async (request, reply) => {
  reply.code(200).send({ success: true, message: "hello from fastify" });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(1313);
    log.info("server is running");
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
};
start();
