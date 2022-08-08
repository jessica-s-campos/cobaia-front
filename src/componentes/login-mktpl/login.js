import React from 'react';
import './../login-mktpl/login.css';


function Login(props){

    return (
        
        <div className='Login'>
            <h4>{props.mktplNome}</h4>
            <div id={props.mktpl} className='LoginCard'>                
                <button id="btnLogar" onClick={props.onClick}>Logar</button>
            </div>    
        </div>

    );
}

export default Login

