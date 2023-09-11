const express = require('express');
const { criarConta, listarTodasContas, atualizarUsuario, excluirConta, consultarSaldo, emitirExtrato } = require('../controllers/contas');
const { depositar, sacar, transferirValoresEntreContas } = require('../controllers/transacoes');
const { validarPreenchimentoSenhaBanco, validarPreenchimentoDadosUsuario, validarPreenchimentoNumeroContaParams, validarPreenchimentoNumeroContaQuery, validarPreenchimentoSenhaUsuarioQuery, validarPreenchimentoNumeroContaBody, validarPreenchimentoValorBody, validarPreenchimentoSenhaUsuarioBody, validarPreenchimentoNumerosContasTransfBody } = require('../middleware/intermediarios');

const rotas = express.Router();

rotas.post('/contas', validarPreenchimentoDadosUsuario, criarConta);
rotas.get('/contas', validarPreenchimentoSenhaBanco, listarTodasContas);
rotas.put('/contas/:numeroConta/usuario', validarPreenchimentoNumeroContaParams, validarPreenchimentoDadosUsuario, atualizarUsuario);
rotas.delete('/contas/:numeroConta', validarPreenchimentoNumeroContaParams, excluirConta);
rotas.post('/transacoes/depositar', validarPreenchimentoNumeroContaBody, validarPreenchimentoValorBody, depositar);
rotas.post('/transacoes/sacar', validarPreenchimentoNumeroContaBody, validarPreenchimentoSenhaUsuarioBody, validarPreenchimentoValorBody, sacar);
rotas.post('/transacoes/transferir', validarPreenchimentoNumerosContasTransfBody, validarPreenchimentoSenhaUsuarioBody, validarPreenchimentoValorBody, transferirValoresEntreContas);
rotas.get('/contas/saldo', validarPreenchimentoNumeroContaQuery, validarPreenchimentoSenhaUsuarioQuery, consultarSaldo);
rotas.get('/contas/extrato', validarPreenchimentoNumeroContaQuery, validarPreenchimentoSenhaUsuarioQuery, emitirExtrato);

module.exports = rotas;