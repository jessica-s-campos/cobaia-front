async function obterStatusCredenciais(marketplace, user_id){
    
    let url = `${process.env.REACT_APP_API_URL}/contas-de-usuario/status-credencial?marketplace=${marketplace}&user_id=${user_id}`;
    let options = {
      method: 'GET',  
      headers: {
        'authorization':  localStorage.getItem('token')
      }
    }
  
    return await fetch(url,options)
    .then((resultado) =>     
      {
        //Atualizar na tela   
        return resultado.json();
        
      }
    )   
    .catch(err => {
      console.error('err ',err)
    })  
  }

  export default obterStatusCredenciais;