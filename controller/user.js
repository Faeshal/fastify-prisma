const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// * @route   GET /api/v1/users
// @desc      Get all users
// @access    Private
exports.getUsers = async (req, reply) => {
  console.log("session:", req.session.get("user"));

  const data = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  reply.code(200).send({ success: true, data });
};

// * @route   POST /api/v1/users
// @desc      Create new users
// @access    Private
exports.createUser = async (request, reply) => {
  const { name, email, phone } = request.body;
  const result = await prisma.user.create({ data: { name, email, phone } });
  reply.code(200).send({ success: true, data: result });
};

// * @route   POST /api/v1/users/:id
// @desc      get detail user
// @access    Private
exports.getUser = async (request, reply) => {
  const { id } = request.params;
  const result = await prisma.user.findUnique({ where: { id: parseInt(id) } });
  reply.code(200).send({ success: true, data: result || {} });
};

// * @route   POST /api/v1/users/:id
// @desc      update user
// @access    Private
exports.updateUser = async (request, reply) => {
  const { id } = request.params;
  const result = await prisma.user.update({
    where: { id: parseInt(id) },
    data: request.body,
  });
  reply.code(200).send({ success: true, data: result });
};

// * @route   POST /api/v1/users/:id
// @desc      delete user
// @access    Private
exports.deleteuser = async (request, reply) => {
  const { id } = request.params;
  const result = await prisma.user.delete({ where: { id: parseInt(id) } });
  reply.code(200).send({ success: true, data: result });
};
