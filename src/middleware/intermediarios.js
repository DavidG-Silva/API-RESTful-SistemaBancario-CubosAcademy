const validadorCpf = require('cpf-cnpj-validator');
const { isValid, parseISO } = require('date-fns');


const validarPreenchimentoSenhaBanco = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(401).json({ mensagem: 'Você deve informar a senha do banco no padrão correto!' });
    };

    next();

};

const validarPreenchimentoDadosUsuario = (req, res, next) => {
    const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Você deve informar todos os dados do usuário para continuar a operação!' });
    };

    if (!validadorCpf.cpf.isValid(cpf)) {
        return res.status(400).json({ mensagem: 'O CPF informado é inválido!' });
    };

    if (isNaN(Number(telefone)) || telefone.length !== 11) {
        return res.status(400).json({ mensagem: 'O telefone informado é inválido!' });
    };

    if (!isValid(parseISO(data_nascimento))) {
        return res.status(400).json({ mensagem: 'A data de nascimento informada é inválida!' });
    };

    next();
};

const validarPreenchimentoNumeroContaParams = (req, res, next) => {
    const { numeroConta } = req.params;

    if (!numeroConta || isNaN(Number(numeroConta))) {
        return res.status(400).json({ mensagem: 'Você deve informar um número de conta válido!' });
    };

    next();
};

const validarPreenchimentoNumeroContaQuery = (req, res, next) => {
    const { numero_conta } = req.query;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'Você deve informar o número da conta para efetuar a consulta!' });
    };

    if (isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: 'Você deve informar um valor válido para o número da conta a ser consultada!' });
    };

    next();
};

const validarPreenchimentoSenhaUsuarioQuery = (req, res, next) => {
    const { senha } = req.query;

    if (!senha) {
        return res.status(401).json({ mensagem: 'Você deve informar a senha do usuario para efetuar a consulta!' })
    };

    next()
};

const validarPreenchimentoNumeroContaBody = (req, res, next) => {
    const { numero_conta } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'Você deve informar o numero da conta para efetuar a operação!' })
    };

    if (isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: 'Você deve informar um valor válido para o número da conta!' });
    };

    next();
};

const validarPreenchimentoNumerosContasTransfBody = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino } = req.body;

    if (!numero_conta_origem || !numero_conta_destino) {
        return res.status(400).json({ mensagem: 'Você deve informar o número da conta de origem e o número da conta de destino para efetuar a operação!' })
    };

    if (isNaN(Number(numero_conta_origem)) || isNaN(Number(numero_conta_destino))) {
        return res.status(400).json({ mensagem: 'Você deve informar valores válidos para os números das contas!' });
    };

    next();
};

const validarPreenchimentoValorBody = (req, res, next) => {
    const { valor } = req.body;

    if (!valor && valor !== 0) {
        return res.status(400).json({ mensagem: 'Você deve informar o valor para efetuar a operação!' })
    };

    if (isNaN(valor)) {
        return res.status(400).json({ mensagem: 'Você deve informar um valor válido para continuar a operação!' });
    };

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor ou igual a zero!' });
    };

    next();
};

const validarPreenchimentoSenhaUsuarioBody = (req, res, next) => {
    const { senha } = req.body;

    if (!senha) {
        return res.status(401).json({ mensagem: 'Você deve informar a senha do usuario para efetuar a operação!' })
    };

    next();
};

const tratativaErros = (err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ mensagem: 'Erro de formatação JSON no corpo da solicitação. Você deve informar todos os dados no formato padrão!' });
    };

    return res.status(500).json({ mensagem: 'Erro inesperado.' });
};

module.exports = {
    validarPreenchimentoSenhaBanco,
    validarPreenchimentoDadosUsuario,
    validarPreenchimentoNumeroContaParams,
    validarPreenchimentoNumeroContaQuery,
    validarPreenchimentoSenhaUsuarioQuery,
    validarPreenchimentoNumeroContaBody,
    validarPreenchimentoNumerosContasTransfBody,
    validarPreenchimentoSenhaUsuarioBody,
    validarPreenchimentoValorBody,
    tratativaErros
};