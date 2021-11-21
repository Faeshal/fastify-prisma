const fastify = require("fastify")({
  logger: { prettyPrint: true },
});
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
    fastify.log.error("server is down");
    process.exit(1);
  }
};
start();
