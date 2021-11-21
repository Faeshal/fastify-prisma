const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// * @route   GET /api/v1/auth/register
// @desc      register
// @access    Public
exports.register = async (request, reply) => {
  reply.code(200).send({ success: true, data });
};

// * @route   POST /api/v1/auth/login
// @desc      login an admin
// @access    Public
exports.login = async (request, reply) => {
  reply.code(200).send({ success: true, data: result });
};

// * @route   POST /api/v1/auth/logout
// @desc      logout an admin
// @access    Private
exports.logout = async (request, reply) => {
  reply.code(200).send({ success: true, data: result || {} });
};
