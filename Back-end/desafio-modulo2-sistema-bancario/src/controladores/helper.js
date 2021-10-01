class InvalidArgument extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidArgument';
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
  }
}

function validarNome(nome) {
  if (!nome) {
    throw new InvalidArgument('O parâmetro nome é obrigatório');
  }
}

function validarEmail(email) {
  if (!email) {
    throw new InvalidArgument('O parâmetro email é obrigatório');
  } else if (!email.includes('@')) {
    throw new InvalidArgument('O parâmetro email deve conter @');
  }
}

function validarCpf(cpf) {
  if (!cpf) {
    throw new InvalidArgument('O parâmetro cpf é obrigatório');
  } else if (cpf.trim().length !== 11) {
    throw new InvalidArgument('O parâmetro cpf deve conter 11 dígitos');
  }
}

function validarDataNascimento(data_nascimento) {
  if (!data_nascimento) {
    throw new InvalidArgument('O parâmetro data de nascimento é obrigatório');
  } else if (data_nascimento.trim().length < 10) {
    throw new InvalidArgument('O parâmetro data de nascimento deve conter 10 caracteres, no formato: 2020-01-31');
  }
}

function validarSenha(senha, senhaCorreta) {
  if (!senha) {
    throw new InvalidArgument('O parâmetro senha é obrigatório');
  } else if (senha.trim().length !== 4) {
    throw new InvalidArgument('O parâmetro senha deve conter 4 números');
  }
  if (senhaCorreta) {
    if (senha !== senhaCorreta) {
      throw new InvalidArgument('Senha incorreta');
    }
  }
}

function validarTelefone(telefone) {
  if (!telefone) {
    throw new InvalidArgument('O parâmetro telefone é obrigatório');
  } else if (telefone.trim().length != 11) {
    throw new InvalidArgument('O parâmetro telefone deve conter 11 caracteres.');
  }
}

function buscarConta(numeroConta, contas) {
  if (!numeroConta) {
    throw new InvalidArgument('O parâmetro número de conta é obrigatório');
  }
  const conta = contas.find((conta) => conta.numero === Number(numeroConta));
  const indexConta = contas.findIndex((conta) => conta.numero === Number(numeroConta));
  if (!conta) {
    throw new NotFound(`Conta de número ${numeroConta} não encontrada`);
  }
  return { conta, indexConta };
}

function validarValor(valor) {
  if (!valor) {
    throw new InvalidArgument('O parâmetro valor é obrigatório');
  }
  if (valor < 0) {
    throw new InvalidArgument('O parâmetro valor deve ser positivo');
  }
}

module.exports = {
  validarNome,
  validarEmail,
  validarCpf,
  validarDataNascimento,
  validarTelefone,
  validarSenha,
  buscarConta,
  validarValor,
  InvalidArgument,
  NotFound,
};
