const express = require('express')
const roteador = express();
const {
    consultarPessoas,
    consultarPessoasPeloId,
    adicionarPessoas,
    editarPessoas,
    atualizarPessoa,
    deletarPessoa
} = require('../controladores/pessoas');

roteador.get('/pessoas',consultarPessoas)
roteador.get('/pessoas/:id',consultarPessoasPeloId)
roteador.post('/pessoas',adicionarPessoas)
roteador.patch('/pessoas/:id',editarPessoas)
roteador.put('/pessoas/:id',atualizarPessoa)
roteador.delete("/pessoas/:id",deletarPessoa)

module.exports = roteador;