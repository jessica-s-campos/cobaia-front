import React from 'react';
import './../dialog-confirmation/dialog-confirmation.css';
import * as user from '../../dominio/user';
import obterStatusCredenciais from '../../dominio/credenciais';
import eventBus from "./../../eventos";

class Dialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                   
        } 

    }

    componentDidMount(){               
        
    }

    render() {
      return (
        <div className='painel'>
                <div className="message">
                    <label>{this.props.message}</label>
                </div>
                
                <div className='botoes'>
                    <button onClick={this.props.onClickSim}>Sim</button>      
                    <button onClick={this.props.onClickNao}>Não</button>      
                    <button onClick={this.props.onClickCancelar}>Cancelar</button>      
                </div>                             
      </div>
      )
    }
}

export default Dialog