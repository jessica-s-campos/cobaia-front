async function obterStatusCredenciais(marketplace, user_id){
    
    let url = `${process.env.REACT_APP_API_URL}/user/getStatusCredencial?marketplace=${marketplace}&user_id=${user_id}`;

    return await fetch(url)    
    .then((resultado) =>     
      {
        //Atualizar na tela   
        return resultado.json();
        
      }
    )   
    .catch(err => {
      console.err('err ',err)
    })  
  }

  export default obterStatusCredenciais;