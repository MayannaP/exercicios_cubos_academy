const { contas, banco } = require('../bancodedados');
const {
  validarNome, validarEmail, validarCpf, validarDataNascimento, validarTelefone, validarSenha, buscarConta, NotFound, InvalidArgument,
} = require('./helper');

function listarContas(req, res) {
  const senhaBanco = req.query.senha_banco;

  if (!senhaBanco) {
    res.status(400).json({ mensagem: 'A senha do banco é obrigatória.' });
    return;
  }

  if (senhaBanco !== banco.senha) {
    res.status(400).json({ mensagem: 'Senha do banco incorreta!' });
    return;
  }

  res.status(200).json(contas);
}

function criarConta(req, res) {
  try {
    const {
      nome, email, cpf, data_nascimento, telefone, senha,
    } = req.body;

    validarNome(nome);

    validarCpf(cpf);

    validarDataNascimento(data_nascimento);

    validarTelefone(telefone);

    validarEmail(email);

    validarSenha(senha);

    const cpfCadastrado = contas.find((conta) => conta.usuario.cpf === cpf.trim());
    if (cpfCadastrado) {
      res.status(400).json({
        mensagem: 'CPF já cadastrado no sistema!',
      });
      return;
    }

    const emailCadastrado = contas.find((conta) => conta.usuario.email === email.trim());
    if (emailCadastrado) {
      res.status(400).json({
        mensagem: 'Email já cadastrado no sistema!',
      });
      return;
    }

    const numero = !contas[0] ? 1 : contas[contas.length - 1].numero + 1;

    const novoUsuario = {
      numero,
      saldo: 0,
      usuario: {
        nome: nome.trim(),
        cpf: cpf.trim(),
        data_nascimento: data_nascimento.trim(),
        telefone: telefone.trim(),
        email: email.trim(),
        senha: senha.trim(),
      },
    };
    contas.push(novoUsuario);

    res.status(201).json(novoUsuario);
  } catch (error) {
    if (error instanceof InvalidArgument) {
      res.status(400).json({ mensagem: error.message });
    }
    if (error instanceof NotFound) {
      res.status(404).json({ mensagem: error.message });
    }
    res.status(500).send({ mensagem: 'Erro interno' });
    console.log(error.message);
  }
}

function atualizarUsuarioConta(req, res) {
  try {
    const { conta, indexConta } = buscarConta(req.params.numeroConta, contas);

    const {
      nome, email, cpf, data_nascimento, telefone, senha,
    } = req.body;
    if (!nome && !email && !cpf && !data_nascimento && !telefone && !senha) {
      res.status(400).json({ mensagem: 'Você deve informar ao menos um campo para ser atualizado!' });
      return;
    }

    if (nome) {
      validarNome(nome);
      conta.usuario.nome = nome;
    }

    if (email) {
      validarEmail(email);
      const indexContaEmailCadastrado = contas.findIndex((conta) => email === conta.usuario.email);

      if (indexContaEmailCadastrado !== indexConta && !(indexContaEmailCadastrado === -1)) {
        res.status(400).json({ message: 'Email já consta no sistema' });
        return;
      }
      conta.usuario.email = email;
    }

    if (cpf) {
      validarCpf(cpf);
      const indexContaCpfCadastrado = contas.findIndex((conta) => cpf === conta.usuario.cpf);
      if (indexContaCpfCadastrado !== indexConta && !(indexContaCpfCadastrado === -1)) {
        res.status(400).json({ message: 'CPF já consta no sistema' });
        return;
      }
      conta.usuario.cpf = cpf;
    }

    if (data_nascimento) {
      validarDataNascimento(data_nascimento);
      conta.usuario.data_nascimento = data_nascimento;
    }

    if (telefone) {
      validarTelefone(telefone);
      conta.usuario.telefone = telefone;
    }

    if (senha) {
      validarSenha(senha);
      conta.usuario.senha = senha;
    }
    res.status(200).json({ mensagem: 'Conta atualizada com sucesso' });
  } catch (error) {
    if (error instanceof InvalidArgument) {
      res.status(400).json({ mensagem: error.message });
    }
    if (error instanceof NotFound) {
      res.status(404).json({ mensagem: error.message });
    }
    res.status(500).send({ mensagem: 'Erro interno' });
    console.log(error.message);
  }
}

function excluirConta(req, res) {
  try {
    const { conta, indexConta } = buscarConta(req.params.numeroConta, contas);

    if (conta.saldo !== 0) {
      res.status(400).json({ mensagem: 'Para excluir a conta o saldo deve ser igual a 0.' });
      return;
    }
    contas.splice(indexConta, 1);
    res.json(contas);
  } catch (error) {
    if (error instanceof InvalidArgument) {
      res.status(400).json({ mensagem: error.message });
    }
    if (error instanceof NotFound) {
      res.status(404).json({ mensagem: error.message });
    }
    res.status(500).send({ mensagem: 'Erro interno' });
    console.log(error.message);
  }
}

module.exports = {
  criarConta, atualizarUsuarioConta, excluirConta, listarContas,
};
