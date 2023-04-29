

export async function deletarCurrentWorkUser(marketplace, user_id){
    
    let url = `${process.env.REACT_APP_API_URL}/contas-de-usuario/delete?marketplace=${marketplace}&user_id=${user_id}`;

    let options = {
      method: 'DELETE' ,
      headers: {
        'authorization':  localStorage.getItem('token')
      }    
    }

    return await fetch(url,options)    
    .then((resultado) =>     
      {        
        return resultado;
      }
    )   
    .catch(err => {
      console.log('err ',err)
    })  
  }

export async function getAllUsers(){

  let url = `${process.env.REACT_APP_API_URL}/contas-de-usuario/obter-todos`;
  let options = {
    method: 'GET',  
    headers: {
      'authorization':  localStorage.getItem('token')
    }
  }

  return await fetch(url,options)     
  .catch(err => {
    console.error('err ',err)
  }) 
}

export async function addNewUser(marketplace, user){
  
  let url = `${process.env.REACT_APP_API_URL}/contas-de-usuario/add-user?marketplace=${marketplace}`;
  let options = {
    method: 'POST',  
    headers: {
      'Content-Type':  'application/json',
      'authorization':  localStorage.getItem('token')
    },  
    body : JSON.stringify({ user: user })
  }

  return await fetch(url,options)    
  .then((dados) => 
    dados.json().then((resultado) => {
        return resultado;
    })
  )   
  .catch(err => {
    console.error('err ',err)
  })
}
