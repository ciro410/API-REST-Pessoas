const express = require('express')
const app = express();
app.use(express.json());

const pessoas = [
    {
        id: 1,
        nome: 'Ciro',
        idade: 21,
        profissao: 'Programador'
    },
    {
        id: 2,
        nome: 'Amanda',
        idade: 21,
        profissao: 'Cientista Social'
    },
    {
        id: 3,
        nome: 'André',
        idade: 23,
        profissao: 'Engenheiro Mecânico'
    },
    {
        id: 4,
        nome: 'Yukki',
        idade: 5,
        profissao: 'Dorminhoco'
    },
];

let proximoId = 5;

app.get('/pessoas', (req, res) => {
    res.json(pessoas)
})

app.get('/pessoas/:id', (req, res) => {
    let id = Number(req.params.id)
    const pessoa = pessoas.find(pessoa => pessoa.id === id)
    res.json(pessoa)
})

app.post('/pessoas', (req, res) => {
    const novaPessoa = {
        id: proximoId,
        nome: req.body.nome,
        idade: req.body.idade,
        profissao: req.body.profissao
    }
    pessoas.push(novaPessoa)
    res.json(novaPessoa)
    proximoId++
})

app.patch('/pessoas/:id',(req,res)=>{
    let id = Number(req.params.id)
    const pessoa = pessoas.find(pessoa => pessoa.id === id)
    if(req.body.nome!== undefined){
        pessoa.nome = req.body.nome
    }
    if(req.body.idade!== undefined){
        pessoa.idade = req.body.idade
    }
    if(req.body.profissao!== undefined){
        pessoa.profissao = req.body.profissao
    }
    res.json(pessoa)

})

app.put('/pessoas/:id',(req,res)=>{
    let id = Number(req.params.id)
    const pessoa = pessoas.find(pessoa => pessoa.id === id)

    if(pessoa){
        pessoa.nome = req.body.nome
        pessoa.idade = req.body.idade
        pessoa.profissao = req.body.profissao
        res.json(pessoa)
       
    }else{
        const novaPessoa = {
            id: id,
            nome: req.body.nome,
            idade: req.body.idade,
            profissao: req.body.profissao
        }
        pessoas.push(novaPessoa);
        res.json(novaPessoa)
        
    }

    

    

})

app.delete("/pessoas/:id",(req,res)=>{
    let id = Number(req.params.id)
    const pessoa = pessoas.find(pessoa => pessoa.id === id)
    const indice = pessoas.indexOf(pessoa);
    pessoas.splice(indice,1)
    res.send(pessoa)
})




app.listen(8000)