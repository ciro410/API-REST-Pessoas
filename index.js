const express = require('express');
const { travadeSenha } = require('./intermediarios/intermediarios');
const roteador = require('./roteadores/rotas');
const app = express();


app.use(express.json());
app.use(travadeSenha)
app.use(roteador)
app.listen(8000)