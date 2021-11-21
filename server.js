const fastify = require("fastify")({
  logger: { prettyPrint: true },
});
const fs = require("fs");
const path = require("path");
// const fastifySession = require("fastify-session");
// const fastifyCookie = require("fastify-cookie");

// * Middleware
// fastify.register(fastifyCookie);
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
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
