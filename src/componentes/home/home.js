import React from 'react';
import './../home/home.css';
import Marketplace from '../login-mktpl/marketplace';

const host = "https://localhost:4050";//https://cobaia-api-backend.herokuapp.com

class Home extends React.Component{

  constructor(props){
    super(props);
    
    this.logarMeli = this.logarMeli.bind(this); 
    this.logarShopee = this.logarShopee.bind(this); 
    this.obterVisitas = this.obterVisitas.bind(this); 
   
  }

  componentDidMount() {   
   
  }

  async logarMeli(){    
    let url = `${host}/meli/verify-credentials`;
    
    await fetch(url)    
    .then((dados) => 
      dados.json().then(_url => window.location.assign(_url))
    )   
    .catch(err => {
      console.log('err ',err)
    })   
  }

  async logarShopee(){
    console.log('chamou logarShopee')    
  }

  async obterVisitas(){
      
    let entrada = document.getElementById('obter-visitas-entrada').value.split(',');
    
    if(entrada.length > 0){
      let url = `${host}/meli/obter-visitas-all`;
      let options = {
        method: 'POST',  
        headers: {
          'Content-Type':  'application/json'
        },  
        body : JSON.stringify({ itens: entrada })
      }
    
      await fetch(url,options)    
      .then((dados) => 
        dados.json().then((resultado) => {
          //console.log(resultado)
          document.getElementById('obter-visitas-resultado').value = JSON.stringify(resultado)
        })
      )   
      .catch(err => {
        console.log('err ',err)
      })
    }
  }


  

  render(){

    return (
      
        <div>           
            <div className='Login-Area'>           
              <Marketplace nome = "Mercado Livre" mktpl='meli' idStoreName = "meli-store-name" 
              onClickLogar={this.logarMeli}></Marketplace>
              <Marketplace nome = "Shopee" mktpl='shopee' onClickLogar={this.logarShopee}></Marketplace>
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

