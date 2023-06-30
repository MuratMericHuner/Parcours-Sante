import React from 'react';
import { TextInput,Button,HelperText } from 'react-native-paper';
import Container from "./Components/Container";
import AppBar from "./AppBar"
import {bdd} from './Bdd'
import md5 from 'md5';

export default class Register extends React.Component{

  initialState = {
    name: '',
    surname:'',
    age: '',
    password:'',
    confirmpassword:'',
    postalcode: '',
    address: '',
    mail: '',
    country: '',
    gender: '',
    token: null,
  };

  state = {
    name: '',
    surname:'',
    age: '',
    password:'',
    confirmpassword:'',
    postalcode: '',
    address: '',
    mail: '',
    country: '',
    gender: '',
    token: null,
  };


  _hasErrors = () => {
    return !this.validateEmail(this.state.mail);
  }
  _hasErrorsName = () => {
    return this.state.name.length < 3 ;
  }
  _hasErrorsSurname = () => {
    return this.state.surname.length < 3 ;
  }
  _hasErrorsAge = () => {
    return (this.state.age.match(/^\S[0-9]/) <= 0) ;
  }
  _hasErrorsPassword = () => {
    return !this.state.password ;
  }
  _hasErrorsConfirmPassword = () => {
    return !this.state.confirmpassword ;
  }


  _hasErrorsPostalcode = () => {
    return !this.state.postalcode.match("^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$") ;
  }
  _hasErrorsAdresse = () => {
    return !this.state.address ;
  }
  _hasErrorsCountry = () => {
    return !this.state.country ;
  }
  _hasErrorsGender = () => {
    return !this.state.gender.match("/^{m,M,f,F}$/") ;
  }
  _hasErrorsPwAndConf= () => {
    return this.state.password !== this.state.confirmpassword ;
  }



  validateEmail = (mail) => {
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(mail);
};



  Constraints = () => {
  let check = {
    result: true,
    msg: "Erreur inconnue"
  }

  if(!this.validateEmail(this.state.mail)){
    check.result = false;
    }

  if(this.state.name.length < 3) {
    check.result = false;
    //check.msg = "3 characters minemum";
  }

  if(this.state.surname.length < 3){
    check.result = false;
  //  check.msg = "3 characters minemum";
  }

  if(this.state.age.match(/^\S[0-9]/) <= 0){
    check.result = false;
   //heck.msg = "Only numeric value for Age ";
  }

  if(!this.state.address) {
    check.result = false;
    //check.msg = "Please enter your Address ";
  }

  if(!this.state.postalcode.match("^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$")) {
    check.result = false;
    //check.msg = "Please enter right Postalcode ";
  }

  if(!this.state.password){
  check.result = false;
//  check.msg = "Please enter new password ";
  }

  if(!this.state.confirmpassword){
  check.result = false;
  //check.msg = "Please enter your password again ";
  }

  if(this.state.password !== this.state.confirmpassword){
      check.result = false;
    //  check.msg = "Your password and confirmation password do not match ";
  }

  if(this.state.gender.match("/^{m,M,f,F}$/")){
    check.result = false;
    //check.msg = "acceptable parameters M or F ";
  }

  if(!this.state.country){
  check.result = false;
  //check.msg = "Please enter your country ";
  }
  return check;
}

  Pressed = () => {
  this.props.startLoading();
  let check = this.Constraints();
  if(check.result){
  const newReference = bdd
  .ref('/User')
  .push();

console.log('Auto generated key: ', newReference.key);

newReference
  .set({
    name: this.state.name,
    surname:this.state.surname,
    age: this.state.age,
    password:md5(this.state.password),
    postalcode: this.state.postalcode,
    address: this.state.address,
    mail: this.state.mail,
    country: this.state.country,
    gender: this.state.gender,
    token: this.state.token,
  })
  .then(() => console.log('Data updated.'));
    this.setState(this.initialState);
    this.props.jumpTo("login");
    alert("User registered successfully");
  }
  else{
    alert("Please fill in all fields");
  }
  this.props.stopLoading();
}

render(){
  return (
    <>
    <AppBar title="Register" />
    <Container margin="20">
      <Container padding='5'>

      <TextInput
      style={{ marginTop: 5 ,height:50  }}
        mode = 'outlined'
        label='Email'
        keyboardType='email-address'
        textContentType = 'emailAddress'
        value={this.state.mail}
        onChangeText={mail => this.setState({ mail })}
      />
      <HelperText
          type="error"
          visible={this._hasErrors()}
        >
          Email address is invalid!
        </HelperText>

      <TextInput
      mode = 'outlined'
      style={{ marginTop: 5 ,height:50 }}
      label='Name'
      value={this.state.name}
      onChangeText={name => this.setState({ name })}
      />
      <HelperText
          type="error"
          visible={this._hasErrorsName()}
        >
        Please enter atleast 3 characters !
        </HelperText>

      <TextInput
      mode = 'outlined'
      style={{ marginTop: 5 ,height:50 }}
        label='Surname'
        value={this.state.surname}
        onChangeText={surname => this.setState({ surname })}
      />
      <HelperText
          type="error"
          visible={this._hasErrorsSurname()}
        >
        Please enter atleast 3 characters !
        </HelperText>

      <TextInput
      mode = 'outlined'
      style={{ marginTop: 5 ,height:50 }}
        label='Password '
        secureTextEntry={true}
        value={this.state.motdepass}
        onChangeText={password => this.setState({ password })}
      />
      <HelperText
          type="error"
          visible={this._hasErrorsPassword()}
        >
          Please enter new password!
        </HelperText>

      <TextInput
      mode = 'outlined'
      style={{ marginTop: 5 ,height:50 }}
        label='Confirm password '
        secureTextEntry={true}
        value={this.state.confirmpassword}
        onChangeText={confirmpassword => this.setState({ confirmpassword })}
      />
      <HelperText
          type="error"
          visible={this._hasErrorsConfirmPassword()}
        >
          Please enter your password again !
        </HelperText>
        <HelperText
            type="error"
            visible={this._hasErrorsPwAndConf()}
          >
            Your password and confirmation password do not match !
          </HelperText>

      <TextInput
      mode = 'outlined'
      style={{ marginTop: 5 ,height:50 }}
        label='Age '
        keyboardType='numeric'
        value={this.state.age}
        onChangeText={age => this.setState({ age })}
      />
      <HelperText
          type="error"
          visible={this._hasErrorsAge()}
        >
          Please enter only numeric value for Age !
        </HelperText>

      <TextInput
      mode = 'outlined'
      style={{ marginTop: 5 ,height:50 }}
        label='Address '
        value={this.state.address}
        onChangeText={address => this.setState({ address })}
      />
      <HelperText
          type="error"
          visible={this._hasErrorsAdresse()}
        >
          Please enter your Address !
        </HelperText>

      <TextInput
      mode = 'outlined'
      style={{ marginTop: 5 ,height:50 }}
        label='Postal code'
        keyboardType='numeric'
        textContentType= 'postalCode'
        value={this.state.postalcode}
        onChangeText={postalcode => this.setState({ postalcode })}
      />
      <HelperText
          type="error"
          visible={this._hasErrorsPostalcode()}
        >
          Please enter a valid Postalcode !
        </HelperText>

      <TextInput
      mode = 'outlined'
      style={{ marginTop: 5 ,height:50 }}
        label='Gender'
        value={this.state.gender}
        onChangeText={gender => this.setState({ gender })}
      />
      <HelperText
          type="error"
          visible={this._hasErrorsGender()}
        >
          Acceptable parameters : M or m for male , F or f for female
        </HelperText>

      <TextInput
      mode = 'outlined'
      style={{ marginTop: 5 ,height:50 }}
        label='Country'
        textContentType='countryName'
        value={this.state.country}
        onChangeText={country => this.setState({ country })}
      />
      <HelperText
          type="error"
          visible={this._hasErrorsCountry()}
        >
        Please enter your country !
        </HelperText>


      <Button  style={{marginRight :40 ,marginLeft : 40, marginTop: 10 ,height:40, fontsize:111 }}
       mode="contained"
       onPress={() => this.Pressed()}>Signup</Button>

       </Container>
    </Container>
    </>
  );
}
}
