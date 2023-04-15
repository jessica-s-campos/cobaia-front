import React from 'react';
import './modal.css';

class Modal extends React.Component {

    constructor(props){
        super(props);
        this.state = {    
     
        } 
        
    }

    componentDidMount(){  
       console.log(this.props.title,this.props.show)
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
                <label className='title'>{this.props.title}</label> 
                {this.props.innerModal}            
             </div> 
        )
    }
}

export default Modal