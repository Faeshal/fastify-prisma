// * @service   get all users
exports.getUsers = async (request, reply) => {
  const data = await prisma.user.findMany();
  reply.code(200).send({ success: true, data });
};

// * @service   create user
exports.getUsers = async (request, reply) => {
  const data = await prisma.user.findMany();
  reply.code(200).send({ success: true, data });
};
