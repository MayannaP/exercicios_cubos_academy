const jwtSecret = require("../jwt_secret.js");
const jwt = require("jsonwebtoken");
const query = require("../Repositories/UserRepository.js");
const {
  InvalidToken,
  NotFound,
  InvalidArgument,
} = require("./errorClasses.js");

async function authentication(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new InvalidArgument("Token não informado");
    }

    const token = authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, jwtSecret);
    const userInfo = await query.getUser({ id });

    if (!id) {
      throw new InvalidToken(
        "Para acessar este recurso um token de autenticação válido deve ser enviado."
      );
    }

    if (!userInfo) {
      throw new NotFound("Usuário não encontrado.");
    }

    const { senha, ...user } = userInfo;

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
