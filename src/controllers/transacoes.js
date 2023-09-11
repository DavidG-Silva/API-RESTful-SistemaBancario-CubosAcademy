const { depositos, saques, transferencias, contas } = require('../database/bancodedados');
const { format } = require('date-fns');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    const indiceContaDepositar = contas.findIndex((conta) => { return conta.numero === numero_conta });

    if (indiceContaDepositar < 0) {
        return res.status(404).json({ mensagem: 'A conta informada não existe.' });
    };

    depositos.push(
        {
            data: format(new Date, 'yyyy-MM-dd HH:mm:ss'),
            numero_conta,
            valor
        }
    );

    contas[indiceContaDepositar].saldo += valor;

    return res.status(204).send();
};

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    const indiceContaSacar = contas.findIndex((conta) => { return conta.numero === numero_conta });

    if (indiceContaSacar < 0) {
        return res.status(404).json({ mensagem: 'A conta informada não existe.' });
    };

    if (contas[indiceContaSacar].usuario.senha !== senha) {
        return res.status(403).json({ mensagem: 'A senha do usuário informada é inválida!' });
    };

    if (contas[indiceContaSacar].saldo < valor) {
        return res.status(409).json({ mensagem: 'O saldo é insuficiente para realizar a operação!' });
    };

    saques.push(
        {
            data: format(new Date, 'yyyy-MM-dd HH:mm:ss'),
            numero_conta,
            valor
        }
    );

    contas[indiceContaSacar].saldo -= valor;

    return res.status(204).send();
};

const transferirValoresEntreContas = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    const indiceContaOrigem = contas.findIndex((conta) => { return conta.numero === numero_conta_origem });

    if (indiceContaOrigem < 0) {
        return res.status(404).json({ mensagem: 'A conta de origem informada não existe.' });
    };

    const indiceContaDestino = contas.findIndex((conta) => { return conta.numero === numero_conta_destino });

    if (indiceContaDestino < 0) {
        return res.status(404).json({ mensagem: 'A conta de destino informada não existe.' });
    };

    if (contas[indiceContaOrigem].usuario.senha !== senha) {
        return res.status(403).json({ mensagem: 'A senha do usuário da conta de origem informada é inválida!' });
    };

    if (contas[indiceContaOrigem].saldo < valor) {
        return res.status(409).json({ mensagem: 'O saldo da conta de origem é insuficiente para realizar a transferência!' });
    };

    transferencias.push(
        {
            data: format(new Date, 'yyyy-MM-dd HH:mm:ss'),
            numero_conta_origem,
            numero_conta_destino,
            valor
        }
    );

    contas[indiceContaOrigem].saldo -= valor;
    contas[indiceContaDestino].saldo += valor;

    return res.status(204).send();
};


module.exports = {
    depositar,
    sacar,
    transferirValoresEntreContas
};

