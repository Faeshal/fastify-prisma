const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.protect = async (req, reply, done) => {
  try {
    // const authHeader = req.get("Authorization");
    console.log("header:", req.headers);
    const authHeader = req.headers.Authorization;
    const token = authHeader.split(" ")[1];
    if (!token) {
      return reply
        .code(403)
        .send({ success: false, message: "token not found" });
    }

    const user = await prisma.user.findUnique({ where: { apiKey: token } });
    if (token !== user.apiKey) {
      return reply.code(403).send({ success: false, message: "unauthorized" });
    }

    // * Save to session
    req.session.set("user", { id: result.id, email });

    done();
  } catch (err) {
    consle.error("Auth Middleware Error:", err);
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
