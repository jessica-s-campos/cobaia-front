import React from 'react';
import './user.css';

class User extends React.Component {
    constructor(props){
        super(props);
        this.state = {        
            marketplace:'',
            id : 0,
            nickname : '',
            firstName : '',
            lastName : ''
        } 
    }

    componentDidMount(){               
        
    }

    render() {
      return (
      <div className='user'>                
            <div className='dados'>              
                <label id='id'>{this.state.id}</label>
                <label id='nickname'>{this.state.nickname}</label>
                <label id='first-name'>{this.state.firstName}</label>
                <label id='last-name'>{this.state.lastName}</label>
            </div>            
      </div>
      )
    }
}

export default User