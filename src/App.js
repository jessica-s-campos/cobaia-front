import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';

import Main from './../src/componentes/main/main';
import { Link } from 'react-router-dom';
import {verify} from '../src/dominio/user';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket,faUserPlus } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
    constructor(props){
        super(props);      
        this.state = {            
          ok : false ,
          username : ""         
      } 

    }

    componentDidMount(){    
      document.title = "Conecta MKTPL" ;
       
      if(localStorage.getItem('token') !== null)
        verify().then(response => {

          if(response.status == 200){
            this.setState({ok : true}) 
            
            if(!response.message.includes('undefined'))
              this.setState({username : response.message}) 
            else
              this.setState({username : ""}) 
          }
          else
            this.setState({ok : false})          
        });

        window.addEventListener('storage', ()=>{    
          toast("Login Inválido, recarregando página",{position:"top-center",hideProgressBar:true,type:'error',autoClose: 2000,theme:"colored"})
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          
        }, false);
    }

    
    render() {
      if(this.state.ok || 1 == 1){
        return(<div className="App"><Main username={this.state.username}/></div> )
      }
      else{
        
        return(
        <div className="App">
          <div className="routes" > 
            <Link className="route" to="/login"><button className='route-button'><FontAwesomeIcon icon={faArrowRightToBracket} size="2x" className='route-btn-ico'/>Login</button></Link>
            <Link className="route" to="/signup"><button className='route-button'><FontAwesomeIcon icon={faUserPlus} size="2x" className='route-btn-ico'/>Cadastrar</button></Link>           
          </div>
        </div>)
      }
      
    }
    
}

export default App


