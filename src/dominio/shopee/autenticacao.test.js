const assert = require('assert')
const { isTypedArray } = require('util/types')
const autenticacao = require('./autenticacao')

it('deve obter autorizacao da shopee',async() =>{
    //let array = [{id:1,nome:'Jessica',idade:30,signo:'peixes'},{id:2,nome:'Joana',idade:15,signo:'aquario'},{id:3,nome:'Pedro',idade:28,signo:'sargitario'},{id:4,nome:'Luisa',idade:23,signo:'peixes'},{id:5,nome:'Lucas',idade:19,signo:'sargitario'}]    
    let dados = await autenticacao.obterAutorizacao();
    console.log('resultado do teste :',dados)
    //assert.deepEqual(keys,'signo;dados')
    
})