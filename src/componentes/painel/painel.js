import React from 'react';
import './../painel/painel.css';
import * as user from '../../dominio/user';
import obterStatusCredenciais from '../../dominio/credenciais';
import eventBus from "./../../eventos";

class Painel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user_id : 0,         
            nomeLoja: '',
            marketplace:'',
            status:''
        } 

        this.deletar = this.deletar.bind(this);
        this.refresh = this.refresh.bind(this);
        this.obterStatus = this.obterStatus.bind(this);
    }

    componentDidMount(){               
        this.carregarDadosLojaTrabalho();
        eventBus.on("change-user-current", (item) => {
            if(item.data)
            {
                localStorage.setItem('id-loja',item.data.id)
                localStorage.setItem('nome-loja',`${item.data.first_name} ${item.data.last_name}`)
                localStorage.setItem('marketplace-loja',item.data.marketplace)
            }
            else{
                localStorage.removeItem('id-loja')
                localStorage.removeItem('nome-loja')
                localStorage.removeItem('marketplace-loja')
            }


            this.carregarDadosLojaTrabalho();
        });
    }

    
    async carregarDadosLojaTrabalho(){       

        let id = localStorage.getItem('id-loja');
        let nomeLoja = localStorage.getItem('nome-loja');
        let marketplace = localStorage.getItem('marketplace-loja');
        
        this.setState({
            user_id : id ,
            nomeLoja: !nomeLoja ? '-' :nomeLoja,
            marketplace: !marketplace ? '-' : marketplace,
            status:  '-'
        })       
                
    }

    async obterStatus(){
        await obterStatusCredenciais(this.state.marketplace,this.state.user_id)
        .then((res) => {
            this.setState({      
                status: res.status
            }) 
        })
    }

    deletar(){      
        
        user.deletarCurrentWorkUser(this.state.marketplace,this.state.user_id)
        .then((res) => {
            if(res.status == 200){
                localStorage.removeItem('id-loja')
                localStorage.removeItem('nome-loja')
                localStorage.removeItem('marketplace-loja')

                eventBus.dispatch("change-user-current", { message: "usuario foi alterado", data : null });
            }
        })
    }

    async refresh(){
       
    }

    render() {
      return (
        <div className='painel'>
                <div className="conta-de-trabalho-dados">
                    <label className="descricao">Conta de Trabalho</label>
                    <label className="nome-loja">{this.state.nomeLoja}</label>
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
      )
    }
}

export default Painel