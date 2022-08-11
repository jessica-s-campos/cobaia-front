import React from 'react';
import Painel from './../painel/painel';
import Menu from './../menu/menu';
import ListaFuncoes from './../lista-funcoes/lista-funcoes';

import './../main/main.css';

class Main extends React.Component {
    render() {
      //TODO remover gambiarra        
      localStorage.setItem('id-loja',0)
      localStorage.setItem('nome-loja','')
      localStorage.setItem('marketplace-loja','')

      return (
        <div className='main'>
            <div className='cabecalho'>
            <Painel></Painel>
            <Menu></Menu>
            </div>
            <ListaFuncoes></ListaFuncoes>
        </div>
      )
    }
}

export default Main