import React from 'react';
import Painel from './../painel/painel';
import Menu from './../menu/menu';
import ListaFuncoes from './../lista-funcoes/lista-funcoes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Navigate } from "react-router-dom";
import './../main/main.css';

class Main extends React.Component {
  constructor(props){
    super(props);    

    this.logout = this.logout.bind(this);
    
  }

  async logout(){        
    localStorage.removeItem('token')
    localStorage.removeItem('id-loja')
    localStorage.removeItem('nome-loja')
    localStorage.removeItem('username')
    localStorage.removeItem('marketplace-loja')
    window.location.reload(false)
  }

  render() {
      //TODO remover gambiarra        
      localStorage.setItem('id-loja',null)
      localStorage.setItem('nome-loja','')    
      localStorage.setItem('marketplace-loja','')

      return (
        <div className='main'>            
            <div className='cabecalho'>
            <Painel username={this.props.username}></Painel>
            <Menu></Menu>
            </div>
            <div className='routes'>
              <Link className='route' to="/signup">SignUp</Link>
              <Link className='route' onClick={this.logout}>Logout</Link>
              <Link className='route' to="/">Home</Link>
          </div>  
            {/* <ListaFuncoes></ListaFuncoes> */}
            <ToastContainer autoClose={2000}/>
            <label href='https://cobaia-api-backend.herokuapp.com/contas-de-usuario/obter-todos'></label>
            
        </div>
      )
    }
}

export default Main