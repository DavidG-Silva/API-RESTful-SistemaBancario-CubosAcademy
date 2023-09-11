const { banco, contas, saques, depositos, transferencias } = require('../database/bancodedados');

let proximoNumeroConta = 1;

const verificarContaPreExistente = (cpf, email, arrayContas) => {
    return arrayContas.find((conta) => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email;
    });

};

const criarConta = (req, res) => {
    const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    } = req.body;

    if (verificarContaPreExistente(cpf, email, contas)) {
        return res.status(409).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
    };

    contas.push({
        numero: proximoNumeroConta.toString(),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    });

    proximoNumeroConta++;

    return res.status(201).send();
};

const listarTodasContas = (req, res) => {
    const { senha_banco } = req.query;

    if (senha_banco !== banco.senha) {
        return res.status(403).json({ mensagem: 'A senha do banco informada é inválida!' });
    };

    return res.status(200).send(contas);

};

const atualizarUsuario = (req, res) => {
    const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    } = req.body;

    const { numeroConta } = req.params;

    const indiceContaAtualizar = contas.findIndex((conta) => { return conta.numero === numeroConta });

    if (indiceContaAtualizar < 0) {
        return res.status(404).json({ mensagem: 'A conta informada não existe.' });
    };

    if (verificarContaPreExistente(cpf, email, contas) && verificarContaPreExistente(cpf, email, contas).numero !== numeroConta) {
        return res.status(409).json({ mensagem: "Já existe outra conta com o cpf ou e-mail informado!" });
    };

    contas[indiceContaAtualizar].usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    };

    return res.status(204).send();
};

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const indiceContaExcluir = contas.findIndex((conta) => { return conta.numero === numeroConta });

    if (indiceContaExcluir < 0) {
        return res.status(404).json({ mensagem: 'A conta informada não existe.' });
    };

    if (contas[indiceContaExcluir].saldo !== 0) {
        return res.status(409).json({ mensagem: 'A conta só pode ser excluída se o saldo for zero!' });
    };

    contas.splice(indiceContaExcluir, 1);

    return res.status(204).send();
};

const consultarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    const indiceContaConsultar = contas.findIndex((conta) => { return conta.numero === numero_conta });

    if (indiceContaConsultar < 0) {
        return res.status(404).json({ mensagem: 'A conta informada não existe.' });
    };

    if (contas[indiceContaConsultar].usuario.senha !== senha) {
        return res.status(403).json({ mensagem: 'A senha do usuário informada é inválida!' });
    };

    return res.status(200).json({ saldo: contas[indiceContaConsultar].saldo })
};

const emitirExtrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    const indiceContaConsultar = contas.findIndex((conta) => { return conta.numero === numero_conta });

    if (indiceContaConsultar < 0) {
        return res.status(404).json({ mensagem: 'A conta informada não existe.' });
    };

    if (contas[indiceContaConsultar].usuario.senha !== senha) {
        return res.status(403).json({ mensagem: 'A senha do usuário informada é inválida!' });
    };

    const extratoConta = {
        depositos: depositos.filter((deposito) => { return deposito.numero_conta === numero_conta }),
        saques: saques.filter((saque) => { return saque.numero_conta === numero_conta }),
        transferenciasEnviadas: transferencias.filter((transferencia) => { return transferencia.numero_conta_origem === numero_conta }),
        transferenciasRecebidas: transferencias.filter((transferencia) => { return transferencia.numero_conta_destino === numero_conta })
    }

    return res.status(200).json(extratoConta);
};


module.exports = {
    criarConta,
    listarTodasContas,
    atualizarUsuario,
    excluirConta,
    consultarSaldo,
    emitirExtrato
};