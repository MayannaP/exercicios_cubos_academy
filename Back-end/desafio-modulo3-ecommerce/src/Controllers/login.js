const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt_secret.js");
const query = require("../Repositories/UserRepository.js");

async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    const { senha: senhaUser, ...user } = await query.getUser({ email });

    if (!user) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const senhaVerificada = await bcrypt.compare(senha, senhaUser);
    if (!senhaVerificada) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1d" });

    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
}

module.exports = { login };
