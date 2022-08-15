import React from 'react';
import './funcao.css';
import eventBus from "../../eventos";

class Funcao extends React.Component {
    constructor(props){
        super(props);
        this.state = {        
            entrada : '',
            resultado: ''    
        } 
       
    }

    componentDidMount(){               
        this.handleChangeValueEntrada = this.handleChangeValueEntrada.bind(this);
        this.handleChangeValueResultado = this.handleChangeValueResultado.bind(this);

        eventBus.on('resultado-obtido',(res)=>{         
            document.getElementById(res.field.toString()).value = JSON.stringify(JSON.parse(res.data),undefined,4);
        })
    }

    handleChangeValueEntrada = event => {
        this.setState({entrada: event.target.value})
        eventBus.dispatch(this.props.nomeEvento, { message: "entrada foi alterada", data : event.target.value });
    };

    handleChangeValueResultado = event => {
        this.setState({resultado: event.target.value})
    };

    render() {
      return (
        <div className="funcao">
            <label className='nome'>{this.props.nome}</label>    
            <div className="entrada-saida">
                <div className='entrada'>
                    <label>{this.props.lblEntradaDados}</label>  
                    <textarea rows="5" cols="50" id="entrada-dados" value={this.props.entrada} onChange={this.handleChangeValueEntrada}></textarea> 
                </div>
                 
                <div className='saida'>
                    <label>{this.props.lblResultado}</label>    
                    <textarea rows="5" cols="50" id={this.props.resultadoId} onChange={this.handleChangeValueResultado}></textarea>
                </div>     
            </div>   
            <button onClick={this.props.onClickExecutarFuncao}>Executar</button>
        </div>
      )
    }
}

export default Funcao