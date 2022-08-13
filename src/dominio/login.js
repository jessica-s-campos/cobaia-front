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
    {
      
      dados.json().then(async(resultado) => {
        console.log(`dsdsadad `,resultado)
        if(login_type!=='verify')
          window.location.replace(resultado)
        if(marketplace=='meli' && login_type=='new'){
          console.log(resultado.user_id)
          url = `${process.env.REACT_APP_API_URL}/meli/userme?origin=auth&user_id=${resultado.user_id}`;
          await fetch(url).then((res) => {
            console.log('apos userme')
          })
        }
          
      })
    }
    )   
    .catch(err => {
      console.log('err ',err)
      
    })   
  }

  export default login;