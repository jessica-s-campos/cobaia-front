import React from 'react';
import './login.css';
import { Link, Navigate } from "react-router-dom";
import {login} from '../../dominio/user';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {                        
            validation : " ",
            authenticated: false,
            email : "",
            username : '',
            password : '',
            password_repeated : ''
        } 

        this.Submit = this.Submit.bind(this);      
        this.handleEmailUsername = this.handleEmailUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
      
    }

    componentDidMount(){               
        
    }

    handleEmailUsername = event => {
        if(event.target.value == "")
            this.setState({validation: " "})

        if(event.target.value.includes("@") || event.target.value.includes(".com")){
            let regex = "[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.*([a-z]*)?";
            let regExp = new RegExp(regex);
            if(regExp.test(event.target.value))
            {
                this.setState({validation: " "})
                this.setState({email: event.target.value})
            }
            else
                this.setState({validation: "Email inválido"})
        }
        else{
            this.setState({username: event.target.value})
        }
    };
    handlePassword = event => {        
        this.setState({password: event.target.value})
    };

    Submit(event){
        event.preventDefault();    
        
        login(this.state.username,this.state.email,this.state.password).then(data=>{  
            data.json().then(response=> {
        
                if(response.auth == true && response.token){
                    localStorage.setItem('username',response.username)
                    localStorage.setItem('token',response.token);      
                    this.setState({authenticated: true});                         
                }
                this.setState({validation: response.message})
            })
            
        })
    }

    render() {
        const authenticated = this.state.authenticated;

        if(authenticated)
            return(<Navigate to="/"/>)
        else
            return (
            <div className='login'> 
                
                    <form className='' onSubmit={this.Submit}>                           
                        <h4>Login</h4>     
    
                        <label className='label-validation'>{this.state.validation}</label>   
    
                        <div className='field'>
                            <label htmlFor='email_username'>Email/Username</label>
                            <input type='text' id='email_username' onChange={this.handleEmailUsername}/>
                        </div>
                        
                        <div className='field'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' value={this.state.password}  onChange={this.handlePassword}/>
                            
                        </div>
                        
                        <button className="btn-login">Entrar</button>
                    </form> 
                    <div className='routes'>
                        <Link className='route' to="/signup">SignUp</Link>
                        <Link className='route' to="/">Home</Link>
                    </div>
            </div>
            
            )
    }
    
}

export default Login