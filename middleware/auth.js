const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const log4js = require("log4js");
const log = log4js.getLogger("auth");
log.level = "info";
require("pretty-error").start();

exports.protect = async (req, reply, done) => {
  try {
    // const authHeader = req.get("Authorization");
    console.log("header:", req.headers);
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (!token) {
      return reply
        .code(403)
        .send({ success: false, message: "token not found" });
    }

    const user = await prisma.user.findFirst({ where: { apiKey: token } });
    if (token !== user.apiKey) {
      return reply.code(403).send({ success: false, message: "unauthorized" });
    }

    // * Save to session
    req.session.set("user", { id: user.id, email: user.email });

    done();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return reply.code(401).send({ success: false, message: "Unauthorized" });
  }
};

exports.authorize = (...roles) => {
  return (req, reply, done) => {
    if (!roles.includes(req.session.role)) {
      return reply.code(401).send({
        success: false,
        message: `${req.session.role} Role is not Authorize to access this route`,
      });
    }
    done();
  };
};
