import React from 'react';
import './../login-mktpl/marketplace.css';
import ListUsersModal from '../users/list-users';

const host = "https://cobaia-api-backend.herokuapp.com";//https://localhost:4050

class Marketplace extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
          show: false,
          storeCurrent:''
        }  
        this.showModal = this.showModal.bind(this); 

      
    }

    showModal(){
        this.setState({
          show: !this.state.show
        });
      };

    render(){
        return (
        
            <div className='Marketplace'>
                <h4>{this.props.nome}</h4>
                <h5 id='storeCurrent'>{this.state.storeCurrent}</h5>
                
                <label id={this.props.idStoreName}></label>
                <div id={this.props.mktpl} className='MarketplaceCard'>                
                    <button id="btnLogar" onClick={this.props.onClickLogar}>Logar</button>
                    {/* <button id="btnUserMe" onClick={this.props.onClickUserMe}>Obter Dados Meu Usuario</button> */}
                    <button id="btnChooseUser" onClick={this.showModal}>Escolher Usuário de Trabalho</button>
                </div>    
                <ListUsersModal onClose={this.showModal} show={this.state.show}></ListUsersModal>
    
            </div>
    
        );
    }
}

export default Marketplace
