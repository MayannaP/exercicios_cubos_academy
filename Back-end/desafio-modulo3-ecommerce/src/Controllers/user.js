const bcrypt = require("bcrypt");
const {
  Unauthorized,
  Conflict
} = require("../Middlewares/errorClasses.js");
const query = require("../Repositories/UserRepository.js");
const { createUserSchema, updateUserSchema } = require('../schemas/user');

async function create(req, res, next) {
  try {
    await createUserSchema.validate(req.body)
    
    const { nome, email, senha, nome_loja } = req.body;
    
    const user = await query.getUser({ email });
    if (user) {
      throw new Conflict("Já existe usuário cadastrado com o e-mail informado");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const newUser = await query.createUser({
      nome,
      email,
      senhaCriptografada,
      nome_loja,
    });

    if (!newUser) {
      return res.status(400).json("Não foi possivel cadastrar o usuário");
    }

    return res.status(201).json();
  } catch (error) {
    return next(error);
  }
}

async function get(req, res, next) {
  try {
    const { user } = req;

    if (!user) {
      throw new Unauthorized(
        "Para acessar este recurso um token de autenticação válido deve ser enviado."
      );
    }

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { id, senha, nome, email, nome_loja } = req.user;
    const {
      senha: newSenha,
      nome: newNome,
      email: newEmail,
      nome_loja: newNome_loja,
    } = req.body;

    await updateUserSchema.validate(req.body);
    if (newEmail) { 
      const user = await query.getUser({ email: newEmail });
      if (user && user.id !== id) {
        throw new Conflict("Já existe usuário cadastrado com o e-mail informado");
      }
    }

    const senhaCriptografada = await bcrypt.hash(newSenha, 10);

    await query.updateUser({
      id,
      nome: newNome?? nome,
      email: newEmail?? email,
      senhaCriptografada: senhaCriptografada ?? senha,
      nome_loja: newNome_loja ?? nome_loja,
    });

    return res.status(200).json();
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, get, update };
