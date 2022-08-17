import React from 'react';
import Funcao from './../funcao/funcao';
import Modal from './../modal/modal';
import './../lista-funcoes/lista-funcoes.css';


import * as anuncios from '../../dominio/anuncio';
import eventBus from "./../../eventos";

class ListaFuncoes extends React.Component {
  constructor(props){
      super(props);
      this.state = {        
          anuncio : 0,
          anuncios : '',
          showModal : false,
          children :''  
      } 

      this.obterVisitas = this.obterVisitas.bind(this);
      this.obterAnuncio = this.obterAnuncio.bind(this);
      this.obterVariacoes = this.obterVariacoes.bind(this);
      this.abrirFuncao = this.abrirFuncao.bind(this);
      this.showModal = this.showModal.bind(this);
     
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

    eventBus.on('obter-variacoes',(dados)=>{      
      this.setState({
        anuncio : dados.data
    })  
  })

  }

  async showModal(){
    this.setState({
      showModal: !this.state.showModal
    },()=>console.log(`showModal`,this.state.showModal));
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

  obterVariacoes(){   
   
    anuncios.obterVariacoes(
      this.user().marketplace,
      this.state.anuncio,
      this.user().id)
      .then((resultado)=>{
        eventBus.dispatch('resultado-obtido', { message: "temos resultado", field: 'obter-variacoes-resultado' ,data : resultado });
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

  async abrirFuncao(tag,nome,funcao,lblEntradaDados,lblResultado){
    console.log(`abrirFuncao ${tag}`)
    let nomeEvento = tag;
    let resultadoId = `${tag}-resultado`;   
    
    await this.showModal();
    
    let children = <Modal onClose={this.showModal}       
      show={this.state.showModal} 
      title={`Função : ${nome}`}
      innerModal={
        <Funcao nome={nome}                        
              lblEntradaDados={lblEntradaDados}
              lblResultado={lblResultado} 
              resultadoId={resultadoId}
              nomeEvento={nomeEvento}
              onClickExecutarFuncao={funcao}>              
        </Funcao>
      }>
    </Modal>


    this.setState({    
      children : children
    })
  }

  render() {
    return (
      <div className="lista-funcoes"> 
          <label className='titulo'>Funções disponíveis</label>
          <ul className='lista'>
            <li>
              <button onClick={()=>this.abrirFuncao('obter-visitas','Obter Visitas',this.obterVisitas,"Insira os IDS dos anúncios separados por virgula",'Resultado')}>Obter Visitas
              <div className='tags'>
                <img className="icons icon-meli "></img>
                <img className="icons icon-shopee"></img>
              </div>
              </button>             
            </li>
            <li>
              <button onClick={()=>this.abrirFuncao('obter-anuncio','Obter Anúncio',this.obterAnuncio,'Insira o ID do anúncio','Resultado')}>Obter Anúncio
              <div className='tags'>
                <img className="icons icon-meli "></img>
                <img className="icons icon-shopee"></img>
              </div>
              </button>
              </li>
            <li>
              <button onClick={()=>this.abrirFuncao('obter-variacoes','Obter Variações',this.obterVariacoes,'Insira o ID do anúncio','Resultado')}>Obter Variações
              <div className='tags'>              
                <img className="icons icon-shopee"></img>
              </div>
              </button>      
              </li>            
          </ul>
          <div className='modal-area'>
          {
            (this.state.showModal) && this.state.children 
          }
          </div>
          {/* <Funcao nome="Obter Visitas"                        
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

          <Funcao nome="Obter Variações"             
            lblEntradaDados="Insira o ID do anúncio" 
            lblResultado="Resultado" 
            nomeEvento="obter-variacoes"
            resultadoId='obter-variacoes-resultado'
            onClickExecutarFuncao={this.obterVariacoes}>              
          </Funcao> */}
      </div>
    )
  }
}

export default ListaFuncoes