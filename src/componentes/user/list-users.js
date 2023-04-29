import React from 'react';
import './list-users.css';
import * as user from '../../dominio/useraccount';

class ListUsers extends React.Component {

    constructor(props){
        super(props);
        this.state = {    
            users : []     
        } 

        this.buscarDados = this.buscarDados.bind(this);     
    }

    componentDidMount(){  
    
       this.buscarDados();
       
    }

    async buscarDados(){          
        await user.getAllUsers()
            .then((dados) => {
                dados.json()
                .then(json => {    
                            
                    this.setState({
                        users : json
                    })        
                })
                
                
            })
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className='modal'>
                <div className='btn'>
                    <button onClick={this.props.onClose}>Fechar</button>
                </div>
                <label className='title'>Lista de contas disponíveis</label> 
                <div className='lista' id={this.props.marketplace}>                                
                    {
                        this.state.users.map((item) => (
                            
                                <div className='item' key={item.id}>                  
                                    <label className='nome'>
                                        <input id={item.id} type='radio' name="radio" value={JSON.stringify(item)} onChange={this.props.OnChange}/>{item.nickname + " (" + item.first_name + " " + item.last_name + ")" }
                                    </label>
                                    <label className='marketplace'>
                                        {item.marketplace}
                                    </label>
                                </div>
                            
                        )) 
                    }
                </div>
             
             </div> 
        )
    }
}

export default ListUsers