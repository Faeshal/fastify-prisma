const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// * @route   GET api/users
// @desc      Get all users
// @access    Private
exports.getUsers = async (request, reply) => {
  const data = await prisma.user.findMany();
  reply.code(200).send({ success: true, data });
};

// * @route   POST api/users
// @desc      Create new users
// @access    Private
exports.createUser = async (request, reply) => {
  const { name, email, phone } = request.body;
  const result = await prisma.user.create({ data: { name, email, phone } });
  reply.code(200).send({ success: true, data: result });
};
