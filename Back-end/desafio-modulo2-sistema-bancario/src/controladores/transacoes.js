const { format } = require('date-fns');
const {
  buscarConta, validarValor, InvalidArgument, NotFound, validarSenha,
} = require('./helper');
const {
  contas, depositos, saques, transferencias,
} = require('../bancodedados');

function depositar(req, res) {
  try {
    const { conta } = buscarConta(req.body.numero_conta, contas);

    const valorDeposito = Number(req.body.valor);
    validarValor(valorDeposito);
    conta.saldo += valorDeposito;

    const registroDeposito = {
      data: format(new Date(), 'Pp'),
      numero_conta: conta.numero,
      valor: valorDeposito,
    };
    depositos.push(registroDeposito);

    res.status(200).send({ mensagem: 'Depósito realizado com sucesso!' });
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

function sacar(req, res) {
  try {
    const { senha, numero_conta: numeroConta, valor } = req.body;

    const { conta } = buscarConta(numeroConta, contas);

    const valorSaque = Number(valor);

    validarSenha(senha, conta.usuario.senha);

    validarValor(valorSaque);
    if (valorSaque > conta.saldo) {
      res.status(400).send({ mensagem: `O valor do saque deve ser igual ou inferior a ${conta.saldo}!` });
      return;
    }

    conta.saldo -= valorSaque;

    const registroSaque = {
      data: format(new Date(), 'Pp'),
      numero_conta: conta.numero,
      valor: valorSaque,
    };
    saques.push(registroSaque);

    res.status(200).send({ mensagem: 'Saque realizado com sucesso!' });
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

function transferir(req, res) {
  try {
    const {
      numero_conta_origem, numero_conta_destino, valor, senha,
    } = req.body;

    const { conta: contaOrigem } = buscarConta(numero_conta_origem, contas);
    const { conta: contaDestino } = buscarConta(numero_conta_destino, contas);

    validarSenha(senha, contaOrigem.usuario.senha);
    validarValor(valor);

    if (valor > contaOrigem.saldo) {
      res.status(400).send({ mensagem: `O valor da transferência deve ser igual ou inferior a ${contaOrigem.saldo}!` });
      return;
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const registroTransferencia = {
      data: format(new Date(), 'Pp'),
      numero_conta_origem: contaOrigem.numero,
      numero_conta_destino: contaDestino.numero,
      valor,
    };
    transferencias.push(registroTransferencia);

    res.status(200).send({ mensagem: 'Transferência realizada com sucesso!' });
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

function saldo(req, res) {
  try {
    const { conta } = buscarConta(req.query.numero_conta, contas);

    const senhaUsuario = req.query.senha;
    validarSenha(senhaUsuario, conta.usuario.senha);

    res.status(200).send({ saldo: conta.saldo });
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

function extrato(req, res) {
  try {
    const { conta } = buscarConta(req.query.numero_conta, contas);
    validarSenha(req.query.senha, conta.usuario.senha);

    const depositosConta = depositos.filter((depositos) => depositos.numero_conta === conta.numero);
    const saquesConta = saques.filter((saques) => saques.numero_conta === conta.numero);
    const transferenciasEnviadas = transferencias.filter((transferencias) => transferencias.numero_conta_origem === conta.numero);
    const transferenciasRecebidas = transferencias.filter((transferencias) => transferencias.numero_conta_destino === conta.numero);

    res.status(200).send({
      depositos: depositosConta,
      saques: saquesConta,
      transferenciasEnviadas,
      transferenciasRecebidas,
    });
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
  depositar, sacar, transferir, saldo, extrato,
};
