import React from 'react';
import Painel from './../painel/painel';
import Menu from './../menu/menu';
import ListaFuncoes from './../lista-funcoes/lista-funcoes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './../main/main.css';

class Main extends React.Component {
    render() {
      //TODO remover gambiarra        
      localStorage.setItem('id-loja',null)
      localStorage.setItem('nome-loja','')
      localStorage.setItem('marketplace-loja','')

      return (
        <div className='main'>
            <h1>conecta-mktpl</h1>
            <div className='cabecalho'>
            <Painel></Painel>
            <Menu></Menu>
            </div>
            {/* <ListaFuncoes></ListaFuncoes> */}
            <ToastContainer autoClose={2000}/>
            <label href='https://cobaia-api-backend.herokuapp.com/user/getAll'></label>
            
        </div>
      )
    }
}

export default Main