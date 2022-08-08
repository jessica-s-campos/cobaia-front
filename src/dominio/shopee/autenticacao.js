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

