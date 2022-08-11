import React from 'react';
import './../menu/menu.css';

import login from '../../dominio/login';
import {addNewUser} from '../../dominio/user';
import AddUser from '../user/add-user';
import ListUsers from '../user/list-users';

import eventBus from "./../../eventos";

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user_id :0,          
      marketplace:'', 
      showListUsers : false,
      showAddUserInfo : false
    } 

    this.newAccountShopee = this.newAccountShopee.bind(this);
    this.newAccountMeli = this.newAccountMeli.bind(this);
    this.OnChangeListUsers = this.OnChangeListUsers.bind(this);
    this.showListUsers = this.showListUsers.bind(this);
    this.showAddUserInfo = this.showAddUserInfo.bind(this);
}

componentDidMount(){ 
  this.setState({
    marketplace: localStorage.getItem('marketplace-loja')
  })   

  eventBus.on('save-new-user', (data)=>{
    this.salvarUser(data.user);
  })
}

async showListUsers(){
  this.setState({
    showListUsers: !this.state.showListUsers
  });
}

async showAddUserInfo(){
  this.setState({
    showAddUserInfo: !this.state.showAddUserInfo
  });
}

async OnChangeListUsers(e){
  
  let item = JSON.parse(e.target.value);      
  let name = item.first_name + ' ' + item.last_name;  
  console.log(`novo usuario de trabalho : ${name} | ${item.marketplace}`)
 
  eventBus.dispatch("change-user-current", { message: "usuario foi alterado", data : item });
}

async newAccountShopee(){
  this.showAddUserInfo();  
}

async newAccountMeli(){
  await login('new','meli')
}

async salvarUser(user){
  await addNewUser('shopee',user)
  .then(async (res)=>{
    console.log(res)
    if(res.status == 'ok')
      await login('new','shopee')
  });
  
}

  render() {
    return (
      <div className='menu'>
        <div className="menu-acoes">
          <button onClick={this.newAccountMeli}>Add Conta Meli</button>
          <button onClick={this.newAccountShopee}>Add Conta Shopee</button>
          <button onClick={this.showListUsers}>Trocar Conta de Trabalho</button>
        </div>
        <div className='menu-modal'>
        {
          (this.showListUsers) &&      
          <ListUsers 
              onClose={this.showListUsers} 
              OnChange={this.OnChangeListUsers}
              show={this.state.showListUsers} >
          </ListUsers> 
        } 

        {
          (this.showAddUserInfo) &&      
          <AddUser 
              onClose={this.showAddUserInfo}            
              user = {this.state.user}           
              show={this.state.showAddUserInfo} >
          </AddUser> 
        } 
        </div>        
      </div>
    )
  }
}

export default Menu