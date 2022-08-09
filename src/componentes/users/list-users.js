import React from 'react';
import './../users/list-users.css';

const host = "https://localhost:4050";//https://cobaia-api-backend.herokuapp.com

class ListUsersModal extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        users : []
      }      
      this.escolheUsuario = this.escolheUsuario.bind(this); 
      this.buscarUsuarios = this.buscarUsuarios.bind(this); 
    }
  
    componentDidMount() {   
        this.buscarUsuarios();
        document.getElementById('storeCurrent').textContent = localStorage.getItem("meli-current-name");
    }

    async buscarUsuarios(){       
        let url = `${host}/meli/usersAll`;
        
        await fetch(url)    
        .then((dados) => 
            dados.json().then(json => {
                console.log(json)
                this.setState({
                    users : json
                })
            })
        )   
        .catch(err => {
            console.log('err ',err)
        })
    }

    escolheUsuario(e){ 
        var item = JSON.parse(e.target.value);        
        document.getElementById('storeCurrent').textContent = item.first_name + ' ' + item.last_name
        
        localStorage.setItem("meli-current-id",item.id);
        localStorage.setItem("meli-current-name",item.first_name + ' ' + item.last_name);
    }
  
    
    render(){
        if (!this.props.show) {
            return null;
        }
        return (
        
            <div className='ListUsers'>             
                {
                    this.state.users.map((item) => (
                        
                        <div className='ListUsers-User' key={item.id}>                  
                            <label>
                                <input id={item.id} type='radio' name="radio" value={JSON.stringify(item)} onChange={this.escolheUsuario}/>{item.first_name + " " + item.last_name}
                            </label>
                        </div>
                            
                    )) 
                }
            </div>
        
        );
    }
  }

export default ListUsersModal

