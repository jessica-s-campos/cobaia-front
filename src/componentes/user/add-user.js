import React from 'react';
import './add-user.css';

import eventBus from "./../../eventos";

class AddUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {        
            marketplace:'',
            firstName : '',      
            lastName : '',      
            nickName : '',      
            id : '',      
        } 

        this.salvar = this.salvar.bind(this);
        this.handleNickName = this.handleNickName.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleId = this.handleId.bind(this);
    }

    componentDidMount(){               
        
    }

    salvar(){

        let user = {
            id : this.state.id,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            nickName : this.state.nickName
        }

        eventBus.dispatch("save-new-user", { message: "o usuario pode ser salvo", user : user });
    }

    handleNickName = event => {this.setState({nickName: event.target.value})};
    handleFirstName = event => {this.setState({firstName: event.target.value})};
    handleLastName = event => {this.setState({lastName: event.target.value})};
    handleId = event => {this.setState({id: event.target.value})};

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className='modal'>
            <div className='btn'>
                <button onClick={this.props.onClose}>Fechar</button>
            </div>
            <label className='title'>Dados para cadastro de um novo usuário/seller</label> 
            <div className='add-user'>                
                    <div className='inputs'>
                        <label htmlFor='id'>Id(SellerId)</label>
                        <input id='id' type='text' onChange={this.handleId}></input>

                        <label htmlFor='nickname'>Nickname (Apelido)</label>
                        <input id='nickname' type='text' onChange={this.handleNickName}></input>

                        <label htmlFor='first-name'>First Name</label>
                        <input id='first-name' type='text' onChange={this.handleFirstName}></input>

                        <label htmlFor='last-name'>Last Name</label>
                        <input id='last-name' type='text' onChange={this.handleLastName}></input>
                    </div>
                    <button onClick={this.salvar}>Salvar</button>
            </div>
        </div>
        )
    }
}

export default AddUser