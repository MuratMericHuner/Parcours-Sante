import React from "react";
import {bdd} from "../Bdd";
import md5 from "md5";
import Event from 'rn-event-emitter';

function generateToken(){
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for(let i = 0; i < 15; i++){
        let lastLetter = characters.indexOf('z');
        let lastNumber = characters.indexOf('9');
        let c = '';
        if(i%2 == 0){
          let index = Math.floor(Math.random()*lastLetter);
          c = characters.substr(index,1);
        }else{
          let index = Math.floor(Math.random()*(lastNumber-lastLetter)+lastLetter+1);
          c = characters.substr(index,1);
        }
        token += c;
    }
    return token;
}



class Auth{

  _state = {
    token: null,
    isConnected: false,
    user_id: -1,
    token_expiration_time: 15*60,
    token_start_time: null
  }

  async authUser(mail, password){
    if(!this._state.isConnected){
      await bdd.ref('/User').once('value').then( async (users) => {
        await users.forEach((user) => {
            let u = user.val();
            if(u.mail == mail && u.password == md5(password)){
                this._state.isConnected = true;
                this._state.user_id = user.key;
                this._state.token_start_time = Date.now();
                this._state.token = generateToken();
                Event.emit('auth',this._state.user_id);
            }
        });
      });
    }
    return this._state.isConnected;
  }

  onAuthChanged(funct){
    Event.subscribe('auth', funct);
  }

  getUserId(){
    return this._state.user_id;
  }

  isConnected(){
    return this._state.isConnected;
  }

  getToken(){
    return this._state.token;
  }

  expireToken(){
    if(this._state.user_id != -1){
      let now = Date.now();
      if(now-this._state.token_start_time >= this._state.token_expiration_time*1000){
        this._state.isConnected = false;
        this._state.user_id = -1;
        this._state.token = null;
        Event.emit('auth',this._state.user_id);
        return true;
      }
    }
    return false;
  }

  logout(){
    if(this._state.user_id != -1){
        this._state.isConnected = false;
        this._state.user_id = -1;
        this._state.token = null;
        Event.emit('auth',this._state.user_id);
        return true;
    }
    return false;
  }

}

var auth = new Auth();

export {
  auth
};
