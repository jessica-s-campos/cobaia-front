import React from 'react';
import './signup.css';
import {signup} from '../../dominio/user';
import { Link } from "react-router-dom";


const regex = '(?=.*[çÇ\\{}_+=*&%$#@\!><:;?^]).{2,4}(?=.*[A-Za-z0-9]).{8,10}';
class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {            
            email : "",
            username : '',
            password : '',
            password_repeated : '',
            validation : " "
        } 

        this.Submit = this.Submit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordRepeated = this.handlePasswordRepeated.bind(this);
        this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    }

    componentDidMount(){               
        
    }

    handleUsername = event => {
        this.setState({validation: ""})
        this.setState({username: event.target.value})
    };
    handleEmail = event => {
        this.setState({validation: ""})
        this.setState({email: event.target.value})
    };
    handlePassword = event => {
        this.setState({validation: ""})
        this.setState({password: event.target.value})
    }

    handlePasswordRepeated = event => {
        this.setState({validation: ""})
        this.setState({password_repeated: event.target.value})
    }

    handlePasswordBlur = event => {
        let regExp = new RegExp(regex);

        if(regExp.test(event.target.value)){
            
           if(this.state.password !== this.state.password_repeated)
            {
                this.setState({validation: "As senhas não são iguais"})
            }
            else{
                this.setState({validation: ""})
            }
        }   
        
    };

    async Submit(event){
        event.preventDefault();    
        
        signup(this.state.username,this.state.email,this.state.password).then(data=>{  
            data.json().then(response=> {
            
                if(response.auth == true && response.token){
                    localStorage.setItem('token',response.token);      
                    this.setState({authenticated: true});                         
                }
                this.setState({validation: response.message})
            })
            
        })
    }

    render() {
      return (
      <div className='signup'> 

                        
            <form className='' onSubmit={this.Submit}>                           
                <h4>Cadastrar um novo usuário</h4> 

                <label className='label-validation'>{this.state.validation}</label>   

                <div className='field'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='route-button' value={this.state.username} onChange={this.handleUsername}/>
                </div>
                                
                <div className='field'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' value={this.state.email} onChange={this.handleEmail}/>
                </div>
                
                <div className='field'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' value={this.state.password}  onChange={this.handlePassword} onBlur={this.handlePasswordBlur}/>
                    
                </div>
                
                <div className='field'>
                    <label htmlFor='password_repeated'>Repeat Password</label>
                    <input type='password' id='password_repeated' value={this.state.password_repeated} onChange={this.handlePasswordRepeated} onBlur={this.handlePasswordBlur}/>
                
                    
                </div>
                <button className="btn-signup">Cadastrar</button>
            </form> 
            <div className='routes'>
                <Link className='route' to="/login">Login</Link>
                <Link className='route' to="/">Home</Link>
            </div>
          
      </div>
      
      )
    }
    
}

export default SignUp