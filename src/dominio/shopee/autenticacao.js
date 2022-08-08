import crypto from 'crypto-js'

var partnerID = 1007898
var partnerKey = "c207fa504273b078d690031b67b70adad5b083e0c29c10f392535978edd44257"
var host = "https://partner.test-stable.shopeemobile.com"
var redirect_url = "https://localhost:3000/autenticacao/shopee/success"   

function createSignature(path,timestamp){     
  //partner_id, api path, timestamp
  var baseString = partnerID + path + timestamp;

  return crypto.HmacSHA256(baseString,partnerKey).toString(crypto.enc.Hex);
}

function Timestamp(){
  return Math.round(new Date().getTime()/1000);
}

export function  obterAutorizacao(){

    let path = "/api/v2/shop/auth_partner"
    let timestamp = Timestamp();        
    let signature = createSignature(path,timestamp);
    
    let url = host+path+"?partner_id="+partnerID+"&timestamp="+timestamp+"&sign="+signature+"&redirect="+redirect_url;

    let options = {
        method: 'GET',
        mode: 'cors'
    };
    console.log(`url :`,url)
    fetch(url,options)    
    .then((resultado) => console.log('resultado shopee: ',resultado))   
    .catch(err => {
      console.err('err ',err)
    })



    /*const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.selecionados)
    };

    fetch('http://localhost:4050/disputa', requestOptions)
    .then(response =>
      { 
        response.json()
        .then((podio) => {
          this.props.navigate("/resultado",{state: {podio : podio} })
        })
      }
    ) */
}

