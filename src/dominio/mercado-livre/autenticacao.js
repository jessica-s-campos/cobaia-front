

export function obterAutorizacaoMeli(){
    let url = "https://cobaia-api-backend.herokuapp.com/meli/verify-credentials";
    //let url = "https://localhost:4050/meli/verify-credentials";
    
    fetch(url)    
    .then((dados) => 
      dados.json().then(_url => window.location.assign(_url))
    )   
    .catch(err => {
      console.log('err ',err)
    })
}


export function obterVisitasItem(codigo){
  let url = "https://cobaia-api-backend.herokuapp.com/meli/obter-visitas?ids="+codigo;
  //let url = "https://localhost:4050/meli/obter-visitas?ids="+codigo;
  
  fetch(url)    
  .then((dados) => 
    dados.json().then(item => console.log(item))
  )   
  .catch(err => {
    console.log('err ',err)
  })
}

export async function obterVisitasItens(itens){

  if(itens.length > 0){
    let url = "https://cobaia-api-backend.herokuapp.com/meli/obter-visitas-all";
    //let url = "https://localhost:4050/meli/obter-visitas-all";
    let options = {
      method: 'POST',  
      headers: {
        'Content-Type':  'application/json'
      },  
      body : JSON.stringify({ itens: itens })
    }
  
    return fetch(url,options)    
    .then((dados) => 
      dados.json().then((item) => {
        //console.log(item)
        return item;
      })
    )   
    .catch(err => {
      console.log('err ',err)
    })
  }
  
}


