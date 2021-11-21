const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");

// * @route   GET /api/v1/auth/register
// @desc      register
// @access    Public
exports.register = async (req, reply) => {
  const { name, email, password, role, phone } = req.body;

  // * Check Double Email
  const isExist = await prisma.user.findUnique({ where: { email } });
  if (isExist) {
    return reply
      .code(400)
      .send({ success: false, message: "Email Already Exist" });
  }

  // * Hash Password
  const hashedPw = await bcrypt.hash(password, 12);

  // * Generate Api_Key
  const apiKey = uniqid() + uniqid.process();

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPw,
      apiKey,
      role: "admin",
      phone,
    },
  });
  req.log.info("result db:", result);

  reply.code(200).send({ success: true, data: { name, email, role, apiKey } });
};

// * @route   POST /api/v1/auth/login
// @desc      login an admin
// @access    Public
exports.login = async (req, reply) => {
  const { email, password } = req.body;

  // * Check is email exist ?
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return reply.code(400).send({
      success: false,
      message: "User / Password Doesn't Match or Exist",
    });
  }

  // * Compare Password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return reply.code(400).send({
      success: false,
      message: "User / Password Doesn't Match or Exist",
    });
  }

  // * Send Back Data Without Sensitive Information
  const result = await prisma.user.findUnique({
    where: { email },
    exclude: {
      password: true,
    },
  });

  reply.code(200).send({ success: true, data: result });
};

// * @route   POST /api/v1/auth/logout
// @desc      logout an admin
// @access    Private
exports.logout = async (req, reply) => {
  if (!req.session.user) {
    return reply.code(400).send({
      success: false,
      message: "You Dont Have Any Session, Please Login to the system",
    });
  }
  // * Generate New api_key
  const new_api_key = uniqid() + uniqid.process();
  await prisma.user.update({
    where: {
      id: req.session.user,
    },
    data: { apiKey: new_api_key },
  });
  // * Destroy Session from DB
  req.session.delete();
  reply.code(200).send({ success: true, message: "Successfully Logout" });
};
