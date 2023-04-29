import React from 'react';
import './../painel/painel.css';
import * as user from '../../dominio/useraccount';
import obterStatusCredenciais from '../../dominio/credenciais';
import eventBus from "./../../eventos";
import login from '../../dominio/login';
import { Link, Navigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Painel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user_id : 0,         
            nome_loja: '',
            nickname: '',
            marketplace:'',
            status:'',
            username : props.username,
            user_id_class : "user_id"
        } 

        this.deletar = this.deletar.bind(this);
        this.refresh = this.refresh.bind(this);
        this.obterStatus = this.obterStatus.bind(this);
    }

    componentDidMount(){              

        this.carregarDadosLojaTrabalho();
        
        eventBus.on("change-user-current", async (item) => {   

            if(item.showMessage == true)
            {
                toast(item.message,{osition:"top-center",hideProgressBar:true,type:'success',autoClose: 4000,theme:"colored"});               
            }

            if(item.data || (localStorage.getItem('id-loja') !== 'null' && localStorage.getItem('id-loja') !== null && localStorage.getItem('id-loja') !== undefined))
            {
                localStorage.setItem('id-loja',item.data.id)
                localStorage.setItem('nickname',`${item.data.nickname}`)
                localStorage.setItem('nome-loja',`${item.data.first_name} ${item.data.last_name}`)
                localStorage.setItem('marketplace-loja',item.data.marketplace)

            }
            else{
                localStorage.removeItem('id-loja')
                localStorage.removeItem('nome-loja')
                localStorage.removeItem('nickname')
                localStorage.removeItem('marketplace-loja')
                
                setTimeout(() => {
                    window.location.reload(false);
                }, 8000);
                
                
            }

            this.carregarDadosLojaTrabalho();
        });
    }

    
    async carregarDadosLojaTrabalho(){       

        let id = localStorage.getItem('id-loja');
        let nomeLoja = localStorage.getItem('nome-loja');
        let nickname = localStorage.getItem('nickname');
        let marketplace = localStorage.getItem('marketplace-loja');
        
        if(id == null || id == "null")
            this.setState({user_id_class : "aviso heartbeat"}) 
        else
            this.setState({user_id_class : "user_id"}) 
        
        this.setState({
            user_id : id == null || id == "null" ? "Selecione uma Conta de Trabalho ou Adicione Uma Nova Conta para começar" : id,
            nome_loja: !nomeLoja ? '-' :nomeLoja,
            marketplace: !marketplace ? '-' : marketplace,
            status:  '-',
            nickname : nickname
        })       
                
    }

    async obterStatus(){
        if(localStorage.getItem('id-loja') != "null"){
            await obterStatusCredenciais(this.state.marketplace,this.state.user_id)
            .then((res) => {
                this.setState({      
                    status: res.status
                }) 
            })
        }
        
    }

    deletar(){      
        var usuario = localStorage.getItem('nickname');
        var options = {
            title: 'Atenção',
            message: `Confirma exclusão da conta de trabalho ${usuario} ?`,
            buttons: [
              {
                label: 'Sim',
                onClick: () => {
                    user.deletarCurrentWorkUser(this.state.marketplace,this.state.user_id)
                    .then((res) => {
                    
                        if(res.status == 200){
                            localStorage.removeItem('id-loja')
                            localStorage.removeItem('nickname')
                            localStorage.removeItem('nome-loja')
                            localStorage.removeItem('marketplace-loja')
                                                

                            eventBus.dispatch("change-user-current", { message: `Usuário ${usuario} excluído com sucesso!`, showMessage : true });
                        }
                    })
                }
              },
              {
                label: 'Não',
                onClick: () => {}
              }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            willUnmount: () => {},
            afterClose: () => {},
            onClickOutside: () => {},
            onKeypress: () => {},
            onKeypressEscape: () => {},
            overlayClassName: "overlay-custom-class-name"
          };

          
        if(localStorage.getItem('id-loja') && localStorage.getItem('id-loja') != "null"){
            confirmAlert(options);            
        }
       
    }

    async refresh(){
        if(localStorage.getItem('id-loja') != "null")
            await login('refresh',this.state.marketplace, this.state.user_id)
    }

    render() {
      return (
       <div className='root'>
            <label className="username">{this.state.username}</label>                   
            <div className='painel'>
                    
                    <div className="conta-de-trabalho-dados">
                        <label className="descricao">CONTA DE TRABALHO</label>
                        <label className="nickname">{this.state.nickname}</label>
                        <label className="nome-loja">{this.state.nome_loja}</label>                        
                        <label className={this.state.user_id_class}>{this.state.user_id}</label>
                        <label className="marketplace">{this.state.marketplace}</label>
                    </div>
                    
                    <div className='conta-de-trabalho-opcoes'>
                        <div className="status">
                            <button className='status-descricao' onClick={this.obterStatus}>STATUS</button>
                            <label className="status-value">{this.state.status}</label>
                        </div>
                        <div className="acoes">
                            <button className="refresh" onClick={this.refresh}>Refresh</button>
                            <button className="deletar" onClick={this.deletar}>Deletar</button>
                        </div>
                        
                    </div>
                    
                    
        </div>
        
       </div>
       
      )
    }
}

export default Painel