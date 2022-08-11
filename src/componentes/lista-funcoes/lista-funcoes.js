import React from 'react';
import Funcao from './../funcao/funcao';

import './../lista-funcoes/lista-funcoes.css';

import * as anuncios from '../../dominio/anuncio';
import eventBus from "./../../eventos";

class ListaFuncoes extends React.Component {
  constructor(props){
      super(props);
      this.state = {        
          anuncio : 0,
          anuncios : ''       
      } 

      this.obterVisitas = this.obterVisitas.bind(this);
      this.obterAnuncio = this.obterAnuncio.bind(this);
     
  }

  componentDidMount(){               

    eventBus.on('obter-visitas',(dados)=>{
        this.setState({
          anuncios : dados.data.split(',')
      })  
    })

    eventBus.on('obter-anuncio',(dados)=>{      
      this.setState({
        anuncio : dados.data
    })  
  })

    
  }

  user = () => {
    let id = localStorage.getItem('id-loja');
    let marketplace = localStorage.getItem('marketplace-loja');

    return {id,marketplace}
  }

  obterVisitas(){   
   
    anuncios.obterVisitas(
      this.user().marketplace,
      this.state.anuncios,
      this.user().id)
      .then((resultado)=>{
        eventBus.dispatch('resultado-obtido', { message: "temos resultado", field: 'obter-visitas-resultado' ,data : resultado });
      })
  }

  obterAnuncio(){
    anuncios.obterAnuncio(
      this.user().marketplace,
      this.state.anuncio,
      this.user().id)
      .then((resultado)=>{       
        eventBus.dispatch('resultado-obtido', { message: "temos resultado", field: 'obter-anuncio-resultado' ,data : resultado });
      })
  }

  render() {
    return (
      <div className="lista-funcoes">
          <Funcao nome="Obter Visitas"                        
            lblEntradaDados="Insira os IDS dos anúncios separados por virgula" 
            lblResultado="Resultado" 
            resultadoId='obter-visitas-resultado'
            nomeEvento="obter-visitas"
            onClickExecutarFuncao={this.obterVisitas}>              
          </Funcao>

          <Funcao nome="Obter Anúncio"             
            lblEntradaDados="Insira o ID do anúncio" 
            lblResultado="Resultado" 
            nomeEvento="obter-anuncio"
            resultadoId='obter-anuncio-resultado'
            onClickExecutarFuncao={this.obterAnuncio}>              
          </Funcao>
      </div>
    )
  }
}

export default ListaFuncoes