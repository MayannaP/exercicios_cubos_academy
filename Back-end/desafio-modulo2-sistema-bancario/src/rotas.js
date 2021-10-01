const express = require('express');
const { criarConta, atualizarUsuarioConta, excluirConta, listarContas} = require('./controladores/contas');
const { depositar, sacar, transferir, saldo, extrato } = require('./controladores/transacoes');

const roteador = express();

roteador.get('/contas', listarContas);
roteador.post('/contas', criarConta);
roteador.put('/contas/:numeroConta/usuario', atualizarUsuarioConta);
roteador.delete('/contas/:numeroConta', excluirConta);
roteador.get('/contas/saldo', saldo);
roteador.get('/contas/extrato', extrato);


roteador.post('/transacoes/depositar', depositar);
roteador.post('/transacoes/sacar', sacar);
roteador.post('/transacoes/transferir', transferir);


module.exports = roteador;