import React from 'react';
import './funcao.css';
import eventBus from "../../eventos";

class FuncaoCustomizada extends React.Component {
    constructor(props){
        super(props);
        this.state = {        
            url : '',
            requestType: 'GET',
            useToken: 'NAO',
            bodyParams: '',
            queryParams: '',
            autoParams : '',
            tagContainer : '',
            response: ''    
        } 

        this.handleURL = this.handleURL.bind(this);
        this.handleRequestType = this.handleRequestType.bind(this);
        this.handleUseToken = this.handleUseToken.bind(this);
        this.handleBodyParams = this.handleBodyParams.bind(this);
        this.handleQueryParams = this.handleQueryParams.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handleAutoParams = this.handleAutoParams.bind(this);
        
        this.executar = this.executar.bind(this);
       
    }

    componentDidMount(){                       
        /*eventBus.on('',(res)=>{         
            
        })*/
    }

    handleURL = event => {this.setState({url: event.target.value})};
    handleRequestType = event => {this.setState({requestType: event.target.value})};
    handleUseToken = event => {this.setState({useToken: event.target.value})};    
    handleBodyParams = event => {this.setState({bodyParams: event.target.value})};
    handleQueryParams = event => {this.setState({queryParams: event.target.value})};
    handleResponse = event => {this.setState({response: event.target.value})};
    
    handleAutoParams = event => {
        let value = event.target.value;
        console.log('handleAutoParams ',event.which)
        if(event.which == 13){
            console.log('13')
            event.preventDefault();
        }
        else if (event.which == 32) {
            console.log('32')
            event.preventDefault();
            
            //this.setState({tagContainer: value})
            let span = document.createElement('span');
            span.className = 'tag';
            span.textContent = value;        
            document.getElementById('tagContainer').appendChild(span)
            event.target.value = '';
        }

        this.setState({autoParams: event.target.value})
    };

    executar(){
        console.log(`execute request `,this.state)


    }

    render() {
      return (
        <div className="fundo">
            <label className='nome'>Função Customizada</label>  
            <div className='url'>
                <label>URL</label>
                <input type='text' onChange={this.handleURL}></input>
            </div>
            <div className='funcao-customizada'>
                <div className='parametros'>
                    
                    <div className='superior'>                        
                        <div>
                            <label>Tipo da Requisicao</label>
                            <select id={this.props.requestType} onChange={this.handleRequestType}>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>                       
                            </select>        
                        </div>           
                        <div>
                            <label>Requer Token</label>
                            <select id={this.props.useToken} onChange={this.handleUseToken}>
                                <option value="SIM">SIM</option>
                                <option value="NAO">NAO</option>                       
                            </select>
                        </div>
                    </div>
                    <div className='param'>
                        <label>Parametros a serem gerados internamente</label>
                        <div className="container">
                            <span className="grupo-tags" id='tagContainer'></span>
                            <input type="text" id="inputText" placeholder="digite os parâmetros aqui" onKeyDown={this.handleAutoParams}/>
                        </div>
                        <p>pressione "space" entre os parametros</p>
                    </div>
                    <div className='param'>
                        <label>Parametros por URL</label>
                        <textarea id={this.props.query}  rows="7" cols="40" onChange={this.handleQueryParams}></textarea>
                    </div>
                    <div className='param'>
                        <label>Parametros por Body</label>
                        <textarea id={this.props.body} rows="7" cols="40" onChange={this.handleBodyParams}></textarea>
                    </div>                    
                </div>
                <div className='response'>
                    <button onClick={this.executar}>Executar</button>
                    <label>Resultado</label>    
                    <textarea rows="17" cols="50" id={this.props.resultadoId} onChange={this.handleResponse}></textarea>
                </div>
            </div>      
            
        </div>
      )
    }
}

export default FuncaoCustomizada