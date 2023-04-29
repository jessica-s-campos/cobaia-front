

export async function verify(){

  let url = `${process.env.REACT_APP_API_URL}/user/verify`;
  let options = {
    method: 'GET',  
    headers: {
      'authorization':  localStorage.getItem('token')
    }
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

export async function login(username, email, password){

  let url = `${process.env.REACT_APP_API_URL}/user/login`;
  let options = {
    method: 'POST',  
    headers: {
      'Content-Type':  'application/json'
    },  
    body : JSON.stringify({ username: username ,email : email, password : password})
  }

  return await fetch(url,options).then(resp => {
    return resp
  });
}

export async function signup(username, email, password){
  
  let url = `${process.env.REACT_APP_API_URL}/user/signup`;
  let options = {
    method: 'POST',  
    headers: {
      'Content-Type':  'application/json'
    },  
    body : JSON.stringify({ username: username ,email : email, password : password})
  }

  return await fetch(url,options).then(resp => {
    return resp
  }); 
 
}
