const express = require('express');
const intermediarios = require('./middleware/intermediarios');
const rotas = require('./routers/rotas');

const app = express();

app.use(express.json());

app.use(intermediarios.tratativaErros);

app.use(rotas);



app.listen('3000', () => {
    console.log('Servidor Express iniciado em http://localhost:3000');
});