![](https://i.imgur.com/xG74tOh.png)

# API RESTful Sistema Bancário

## Descrição da aplicação

Esse é um projeto piloto de API RESTFUL desenvolvido para atender ao Desafio do Módulo 02 do curso de _BackEnd_ da **Cubos Academy**, ou seja, no futuro outras funcionalidades serão implementadas, portanto, dados do banco (nome, agência, etc.) serão imutáveis. Acompanhe a evolução!!!

Essa aplicação permite:

- Criar conta bancária;
- Listar contas bancárias;
- Atualizar os dados do usuário da conta bancária;
- Excluir uma conta bancária;
- Depósitar em uma conta bancária;
- Sacar de uma conta bancária;
- Transferir valores entre contas bancárias;
- Consultar saldo da conta bancária;
- Emitir extrato bancário.

_Sempre que a validação de uma requisição falha, recebe-se um código de erro e mensagem adequados à situação._

Qualquer valor (dinheiro) é representado em centavos (Ex.: R$ 10.00 = 1000).

Esta aplicação segue o padrão REST, assim o código está organizado e delimitando as responsabilidades de cada arquivo adequadamente.

Existe:

    - um arquivo index.js;
    - um diretório para rotas (routers);
    - um diretório com controladores (controllers);
    - um diretório com intermediários (middlewares);
    - um diretório com bando de dados (database).

## Persistências dos dados

Os dados são persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`. **Todas as transações e contas bancárias são inseridas dentro deste objeto, seguindo a estrutura pré-existente.**

### Estrutura do objeto no arquivo `bancodedados.js`

```javascript
{
    banco: {
        nome: "Cubos Bank",
        numero: "123",
        agencia: "0001",
        senha: "Cubos123Bank",
    },
    contas: [
        // array de contas bancárias
    ],
    saques: [
        // array de saques
    ],
    depositos: [
        // array de depósitos
    ],
    transferencias: [
        // array de transferências
    ],
}
```

## Tecnologias utilizadas

#### JavaScript;

#### Node.js;

#### Express.js;

#### Pacotes do npm.

## Como executar o projeto

### Requerimentos

Você deverá ter instalado previamente:

- Git;
- Node.js;
- Aplicativo para teste de APIs.

### No princípio, havia o GitHub...

Você deve clonar esse repositório em qualquer diretório de sua preferência. Utilize o comando abaixo no terminal de sua preferência:

```
git clone https://github.com/DavidG-Silva/API-RESTful-SistemaBancario-CubosAcademy.git
```

### E então, foram feitas todas as outras coisas...

Dentro do seu diretório, execute a linha abaixo para instalar as dependências necessárias do npm.

```
npm install
```

### E viu que tudo era bom...

Agora, você deverá ter todos os arquivos necessários para rodar a aplicação. Execute a linha abaixo, configure o aplicativo de testes de API de sua preferência com as rotas HTTP descritas pelo corpo desse documento, e divirta-se :)

```
npm run dev
```

## Endpoints

### -- Criar conta bancária

#### `POST` `/contas`

Esse endpoint cria uma nova conta bancária, gerando um número único para identificação da conta _(número da conta)_.

Os campos `CPF` e `e-mail` são únicos, ou seja, não é permitido mais de uma conta com os mesmos valores para esses campos.
Todas as novas contas são criadas com o valor de saldo inicial igual a zero.

Todos os campos abaixo devem ser informados (todos são obrigatórios), sob o risco de impedimento da conclusão da operação.

- **Requisição** - O corpo da requisição (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

```javascript
// POST /contas
{
    "nome": "Foo Bar 2",
    "cpf": "00011122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "foo@bar2.com",
    "senha": "12345"
}
```

- **Resposta** - Em caso de **sucesso**, a aplicação não envia qualquer conteúdo no corpo (body) da resposta. Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e exibe em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

#### Exemplo de Requisição e Resposta
![Captura Criar Conta Sucesso](https://i.imgur.com/sK3088N.png)
![Captura Criar Conta Erro](https://i.imgur.com/VLHZKu7.png)

### -- Listar contas bancárias

#### `GET` `/contas?senha_banco=Cubos123Bank`

Esse endpoint lista todas as contas bancárias existentes.

A aplicação verifica se a senha do banco foi informada (passada como query params na url) e valida se a senha do banco está correta.

- **Requisição** - query params (respeitando este nome):

/contas?**_senha_banco_**=Cubos123Bank

- **Resposta** - listagem de todas as contas bancárias existentes.

#### Exemplo de Requisição e Resposta
![Captura Listar Contas Sucesso](https://i.imgur.com/0k95USP.png)
![Captura Listar Contas Erro](https://i.imgur.com/NadGo26.png)


### -- Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Esse endpoint atualiza apenas os dados do usuário de uma conta bancária.

A aplicação verifica se foi passado todos os campos no body da requisição e se o numero da conta passado como parametro na URL é válida.

Ainda, verifica se o `CPF` e `E-mail` informados já existem em outro registro.

Novamente, todos os campos abaixo devem ser informados (todos são obrigatórios), sob o risco de impedimento da conclusão da operação.

- **Requisição** - O corpo da requisição (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

```javascript
// POST /contas
{
    "nome": "Foo Bar 2",
    "cpf": "00011122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "foo@bar2.com",
    "senha": "12345"
}
```

- **Resposta** - Em caso de **sucesso**, a aplicação não envia qualquer conteúdo no corpo (body) da resposta. Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e exibe em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

#### Exemplo de Requisição e Resposta
![Captura Atualizar Dados Sucesso](https://i.imgur.com/ahKT1hH.png)
![Captura Atualizar Dados Erro](https://i.imgur.com/IZLotZh.png)

### -- Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint exclui uma conta bancária existente.
A aplicação verifica se o numero da conta passado como parametro na URL é válido, existente, e remove a conta do objeto de persistência de dados.

_IMPORTANTE_: apenas é permitido excluir uma conta bancária se o saldo for igual a zero.

- **Requisição** - número da conta bancária (passado como parâmetro na rota):

/contas/**_1_**

- **Resposta** - Em caso de **sucesso**, a aplicação não envia qualquer conteúdo no corpo (body) da resposta. Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e exibe em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

#### Exemplo de Requisição e Resposta
![Captura Excluir Conta Sucesso](https://i.imgur.com/eSmhNks.png)
![Captura Excluir Conta Erro](https://i.imgur.com/f2Ftnvu.png)

### -- Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint soma o valor do depósito ao saldo de uma conta válida e registra essa transação em um log.

A aplicação verifica se o numero da conta e o valor do deposito foram informados no body e se a conta bancária informada existe.

_IMPORTANTE_: não é permitido depósitos com valores negativos ou zerados.

- **Requisição** - O corpo da requisição (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

```javascript
// POST /transacoes/depositar
{
	"numero_conta": "1",
	"valor": 1900
}
```

- **Resposta** - Em caso de **sucesso**, a aplicação não envia qualquer conteúdo no corpo (body) da resposta. Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e exibe em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

- **Registro de depósito** - Em caso de **sucesso**, a aplicação gera um log no array de _depósitos_, seguindo o modelo abaixo:

```javascript
{
    "data": "2023-09-13 23:40:35",
    "numero_conta": "1",
    "valor": 10000
}
```

#### Exemplo de Requisição e Resposta
![Captura Depositar Sucesso](https://i.imgur.com/driPAsI.png)
![Captura Depositar Erro](https://i.imgur.com/DOPD6gl.png)

### -- Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint realiza a subtração de um valor do saldo de uma determinada conta bancária e registra essa transação em um log.

A aplicação verifica se o número da conta, o valor do saque e a senha foram informados no body.

Ainda, verifica se a conta bancária existe e se a senha informada coincide com senha do usuário da conta informada.

_IMPORTANTE_: o valor do saldo da conta deve ser superior ao valor do saque.

- **Requisição** - O corpo da requisição (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

```javascript
// POST /transacoes/sacar
{
    numero_conta": "1",
    "valor": 1900,
    "senha": "123456"
}
```

- **Resposta** - Em caso de **sucesso**, a aplicação não envia qualquer conteúdo no corpo (body) da resposta. Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e exibe em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

- **Registro de saque** - Em caso de **sucesso**, a aplicação gera um log no array de _saques_, seguindo o modelo abaixo:

```javascript
{
    "data": "2023-09-13 23:40:35",
    "numero_conta": "1",
    "valor": 10000
}
```

#### Exemplo de Requisição e Resposta
![Captura Sacar Sucesso](https://i.imgur.com/ysLqmBB.png)
![Captura Sacar Erro](https://i.imgur.com/q2R9CnT.png)

### -- Transferir

#### `POST` `/transacoes/transferir`

Esse endpoint efetua a transferência de recursos (dinheiro) de uma conta bancária para outra e registra essa transação em um log. Desse modo, subtrai o valor da transferência do saldo na conta de origem e soma o valor no saldo da conta de destino.

A aplicação verifica se todas as informações necessárias foram informadas no corpo da requisição (body) e confere se ambas as contas bancárias de origem e de destino existem no banco de dados.

Ainda, faz a validação se a senha informada coincide com senha do usuário da conta origem e se há saldo disponível nessa mesma conta para efetuar a transferência.

- **Requisição** - O corpo da requisição (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

```javascript
// POST /transacoes/transferir
{
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "123456"
}
```

- **Resposta** - Em caso de **sucesso**, a aplicação não envia qualquer conteúdo no corpo (body) da resposta. Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e exibe em seu corpo (body) um objeto com uma propriedade **mensagem** com um texto explicando o motivo da falha.

- **Registro de transferência** - Em caso de **sucesso**, a aplicação gera um log no array de _transferencias_, seguindo o modelo abaixo:

```javascript
{
    "data": "2023-08-15 23:40:35",
    "numero_conta_origem": "1",
    "numero_conta_destino": "2",
    "valor": 10000
}
```

#### Exemplo de Requisição e Resposta
![Captura Transferir Sucesso](https://i.imgur.com/DzB7Zxq.png)
![Captura Transferir Erro](https://i.imgur.com/H4dZYAn.png)

### -- Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint retorna o saldo de uma conta bancária.

A aplicação verifica se o numero da conta e a senha foram informadas, valida se a conta bancária informada existe e se a senha informada coincide com senha do usuário da conta.

- **Requisição** - query params (respeitando estes nomes):

/contas/saldo?**_numero_conta_**=123&**_senha_**=123

- **Resposta** - um objeto com o saldo da conta:

```javascript
// HTTP Status 200
{
    "saldo": 13000
}
```

#### Exemplo de Requisição e Resposta
![Captura Saldo Sucesso](https://i.imgur.com/b8qWfkx.png)
![Captura Saldo Erro](https://i.imgur.com/0PNrCQp.png)

### -- Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Esse endpoint lista todas as transações realizadas por uma conta específica.

A aplicação verifica se o número da conta e a senha foram informadas, se a conta bancária informada existe e valida se a senha informada coincide com senha do usuário da conta.

- **Requisição** - query params (respeitando estes nomes):

/contas/extrato?**_numero_conta_**=123&**_senha_**=123

- **Resposta** - relatório da conta:

```javascript
// HTTP Status 200
{
  "depositos": [
    {
      "data": "2021-08-18 20:46:03",
      "numero_conta": "1",
      "valor": 10000
    },
    {
      "data": "2021-08-18 20:46:06",
      "numero_conta": "1",
      "valor": 10000
    }
  ],
  "saques": [
    {
      "data": "2021-08-18 20:46:18",
      "numero_conta": "1",
      "valor": 1000
    }
  ],
  "transferenciasEnviadas": [
    {
      "data": "2021-08-18 20:47:10",
      "numero_conta_origem": "1",
      "numero_conta_destino": "2",
      "valor": 5000
    }
  ],
  "transferenciasRecebidas": [
    {
      "data": "2021-08-18 20:47:24",
      "numero_conta_origem": "2",
      "numero_conta_destino": "1",
      "valor": 2000
    },
    {
      "data": "2021-08-18 20:47:26",
      "numero_conta_origem": "2",
      "numero_conta_destino": "1",
      "valor": 2000
    }
  ]
}
```

#### Exemplo de Requisição e Resposta
![Captura Extrato Sucesso](https://i.imgur.com/Gzs9l9r.png)
![Captura Extrato Sucesso 2](https://i.imgur.com/cO3zOCz.png)
![Captura Extrato Erro](https://i.imgur.com/YmsxZsJ.png)

###### tags: `backend` `javascript` `express` `nodeJS` `API REST` `RESTful` `sistema bancario`
