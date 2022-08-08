import React from 'react';
import './../home/home.css';
import { obterAutorizacao } from '../../dominio/shopee/autenticacao'; 
import { obterAutorizacaoMeli, obterVisitasItens } from '../../dominio/mercado-livre/autenticacao'; 
import Login from '../login-mktpl/login';

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = {}  
    this.logarMeli = this.logarMeli.bind(this); 
    this.logarShopee = this.logarShopee.bind(this); 
    this.obterVisitas = this.obterVisitas.bind(this); 
  }

  componentDidMount() {   
   
  }

  logarMeli(){
    console.log('chamou logarMeli')
    obterAutorizacaoMeli();
    
  }

  logarShopee(){
    console.log('chamou logarShopee')
    obterAutorizacao();
    
  }

  async obterVisitas(){
    console.log('chamou obterVisitas')    
    let entrada = document.getElementById('obter-visitas-entrada').value.split(',');

    let resultado = await obterVisitasItens(entrada);
    document.getElementById('obter-visitas-resultado').value = JSON.stringify(resultado)
    
  }


  render(){

    return (
      
        <div>
            <div className='Login-Area'>           
              <Login mktplNome = "Mercado Livre" mktpl='meli' onClick={this.logarMeli}></Login>
              <Login mktplNome = "Shopee" mktpl='shopee' onClick={this.logarShopee}></Login>
            </div>
            <div>
              <div className='Home-Funcao'>
                <h3>Obter Vistas</h3>
                <div className='Home-Funcao-in-out'>
                  <div className='Home-Funcao-in'>
                    <label>Insira os IDS dos anúncios separados por virgula</label>
                    <textarea id="obter-visitas-entrada" rows="4" cols="50"></textarea>
                  </div>
                  <div className='Home-Funcao-out'>
                      <label>Resultado</label>
                      <textarea id="obter-visitas-resultado" rows="4" cols="50"></textarea>
                  </div>
                </div>
                <button  onClick={this.obterVisitas}>Obter Vistas</button>
              </div>
            </div>
        </div>
  
    );
  }
}

export default Home

