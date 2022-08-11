export async function obterAnuncio(marketplace, anuncio, user_id){

    let url = `${process.env.REACT_APP_API_URL}/${marketplace}/obter-item?anuncio=${anuncio}&marketplace=${marketplace}&user_id=${user_id}`;   

    return await fetch(url)    
    .then((dados) => 
    dados.json().then((resultado) => {
        //colocar esse resultado no text area de resultado da funcao
        return JSON.stringify(resultado);
    })
    )   
    .catch(err => {
        console.err('err ',err)
    })
  }

  export async function obterVisitas (marketplace, anuncios, user_id){
   
    if(anuncios.length > 0){
      let url = `${process.env.REACT_APP_API_URL}/${marketplace}/obter-visitas-all?marketplace=${marketplace}&user_id=${user_id}`;
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
            return resultado;
        })
      )   
      .catch(err => {
        console.err('err ',err)
      })
    }
  }
