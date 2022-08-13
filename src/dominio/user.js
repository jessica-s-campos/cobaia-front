

export async function deletarCurrentWorkUser(marketplace, user_id){
    
    let url = `${process.env.REACT_APP_API_URL}/user/delete?marketplace=${marketplace}&user_id=${user_id}`;

    let options = {
      method: 'DELETE'       
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

  let url = `${process.env.REACT_APP_API_URL}/user/getAll`;
  return await fetch(url)
  .catch(err => {
    console.log('err ',err)
  })  
}

export async function addNewUser(marketplace, user){
  console.log(`addNewUser`)  
  
  let url = `${process.env.REACT_APP_API_URL}/user/add-user?marketplace=${marketplace}`;
  let options = {
    method: 'POST',  
    headers: {
      'Content-Type':  'application/json'
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
