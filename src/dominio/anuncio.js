export async function obterAnuncio(marketplace, anuncio, user_id){

    let url = `${process.env.REACT_APP_API_URL}/${marketplace}/obter-item?anuncio=${anuncio}&user_id=${user_id}`;   

    return await fetch(url)    
    .then((dados) => 
    dados.json().then((resultado) => {
        //colocar esse resultado no text area de resultado da funcao
        return JSON.stringify(resultado);
    })
    )   
    .catch(err => {
        console.error('err ',err)
    })
  }

  export async function obterVisitas (marketplace, anuncios, user_id){
   
    if(anuncios.length > 0){
      let url = `${process.env.REACT_APP_API_URL}/${marketplace}/obter-visitas-all?user_id=${user_id}`;
      let options = {
        method: 'POST',  
        headers: {
          'Content-Type':  'application/json'
        },  
        body : JSON.stringify({ anuncios: anuncios })
      }
    
      return await fetch(url,options)    
      .then((dados) => 
        dados.json().then((resultado) => {
          console.log('resultado galera ',resultado)
            return resultado;
        })
      )   
      .catch(err => {
        console.error('err ',err)
      })
    }
  }


  export async function obterVariacoes(marketplace, anuncio, user_id){

    let url = `${process.env.REACT_APP_API_URL}/${marketplace}/obter-variacoes?anuncio=${anuncio}&user_id=${user_id}`;   

    return await fetch(url)    
    .then((dados) => 
    dados.json().then((resultado) => {
        //colocar esse resultado no text area de resultado da funcao
        return JSON.stringify(resultado);
    })
    )   
    .catch(err => {
        console.error('err ',err)
    })
  }

