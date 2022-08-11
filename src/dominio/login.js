async function login(login_type, marketplace, user_id){    

    let url = `${process.env.REACT_APP_API_URL}/autenticacao/verify-credentials?login_type=${login_type}&marketplace=${marketplace}`;

    if(login_type=='verify' || login_type=='delete'){
      url = `${process.env.REACT_APP_API_URL}/autenticacao/verify-credentials
      ?login_type=${login_type}
      &marketplace=${marketplace}
      &user_id=${user_id}`;//user_id é o que fica no localStorage
    }

    await fetch(url)    
    .then((dados) =>     
      dados.json().then((resultado) => {
        console.log(resultado)
        if(login_type!=='verify')
          window.location.replace(resultado)

      })
    )   
    .catch(err => {
      console.log('err ',err)
      
    })   
  }

  export default login;