const {pessoas} = require('../dados/dados')
const {profissoes} = require('../dados/dados')


let proximoId = 5;

function consultarPessoas(req, res){
    res.json(pessoas)
}

function consultarPessoasPeloId (req, res){
    const pessoa = validarPessoaPeloId(req.params)
    if(req.method === "DELETE"){
        if (!pessoa){
            res.status(404)
            res.json({erro: "Pessoa não existe"})
            return;
        }else{
            return
        }
    }
    if (!pessoa){
        res.status(404)
        res.json({erro: "Pessoa não existe"})
        return;
    }
    res.json(pessoa)
}

function validarPessoaPeloId(pessoaConsultada){
    let id = Number(pessoaConsultada.id)
    const pessoa = pessoas.find(pessoa => pessoa.id === id)
    return pessoa;
}

function validarPessoa(pessoa){
        
    if(!pessoa.nome || typeof pessoa.nome !== "string" ){
        return "Nome inválido, por favor preencha um nome válido"
    }

    if(typeof pessoa.idade !== "number"){
        return "Formato de Idade Inválido"
    }

    if(pessoa.idade< 18){
        return "Pessoas menor de idade, não podem ser cadastradas no sistema"
    }
    if(!profissoes.includes(pessoa.profissao)){
        return "Profissão não consta no sistema"
    }
}

function adicionarPessoas (req, res){
    const erro = validarPessoa(req.body)
    if(erro){
        res.status(400)
        res.json({erro})
    }
    const novaPessoa = {
        id: proximoId,
        nome: req.body.nome,
        idade: req.body.idade,
        profissao: req.body.profissao
    }
    pessoas.push(novaPessoa)
    res.status(200)
    res.json({mensagem: `Pessoa adicionada com sucesso`})
    proximoId++
}

function editarPessoas (req,res){
    const pessoa = validarPessoaPeloId(req.params)
    if (!pessoa){
        res.status(404)
        res.json({erro: "Pessoa não existe"})
        return;
    }

    const erro = validarPessoa({
        nome: req.body.nome ?? pessoa.nome,
        idade: req.body.idade ?? pessoa.idade,
        profissao: req.body.profissao ?? pessoa.profissao
    })

    if(erro){
        res.status(400)
        res.json({erro})
        return;
    }

    if(req.body.nome!== undefined){
        pessoa.nome = req.body.nome
    }
    if(req.body.idade!== undefined){
        pessoa.idade = req.body.idade
    }
    if(req.body.profissao!== undefined){
        pessoa.profissao = req.body.profissao
    }
    res.status(200)
    res.json({mesagem:"Pessoa editada com sucesso"})

}

function atualizarPessoa(req,res){
     
    let id = Number(req.params.id)
    const pessoa = pessoas.find(pessoa => pessoa.id === id)

    if(req.body.id !== id){
        res.status(400);
        res.json({erro:"Id informado é diferente do do body da requisição"})
    }
    const erro = validarPessoa(req.body)
        if(erro){
        res.status(400)
        res.json({erro})
        }

    if(pessoa){
        pessoa.nome = req.body.nome
        pessoa.idade = req.body.idade
        pessoa.profissao = req.body.profissao
        res.status(200)
        res.json({mensagem:"Pessoa atualizada com sucesso"})
       
    }else{

        const novaPessoa = {
            id: id,
            nome: req.body.nome,
            idade: req.body.idade,
            profissao: req.body.profissao
        }
        pessoas.push(novaPessoa);
        res.status(200)
        res.json("Pessoa não existe, porem foi adicionada")
        
    }
}

function deletarPessoa(req,res){
    consultarPessoasPeloId(req,res)
    let id = Number(req.params.id)
    const pessoa = pessoas.find(pessoa => pessoa.id === id)
    const indice = pessoas.indexOf(pessoa);
    pessoas.splice(indice,1)
    res.status(200)
    res.json({mensagem: `Pessoa com o id ${id} foi deletada com sucesso`})
}

module.exports = {
    consultarPessoas,
    consultarPessoasPeloId,
    adicionarPessoas,
    atualizarPessoa,
    editarPessoas,
    deletarPessoa
}