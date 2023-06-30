import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import AppBar from './AppBar';
import Container from './Components/Container';
import {bdd} from "./Bdd";
import md5 from 'md5';
import {auth} from './Components/Auth';
import Profile from "./Profile";

export default class Login extends React.Component {
  state = {
    Adresse: '',
    Password: '',
    islogged: false
  };

  componentDidMount(){
    auth.onAuthChanged((uid) => {
      if(uid == -1){
        this.setState({islogged: false});
      }
    });
  }

  render(){
    if(!this.state.islogged){
    return (
      <>
      <AppBar title="Login" />
      <Container margin="20">
          <Container padding='5'>
          <View style={styles.input}>
            <TextInput
              keyboardType='email-address'
              label='Mail Address'
              value={this.state.Adresse}
              onChangeText={Adresse => this.setState({ Adresse })}
              //onSubmitEditing={()=>this.Password.focus()}
            />

            <TextInput
              label='Password'
              value={this.state.Password}
              onChangeText={Password => this.setState({ Password })}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.button}>
            <Button
              title="Login"
              color="#FF8C00"
              onPress={this.connexion}/>
          </View>

          <View style={styles.button}>
           <Button
             title="Signup"
             color="#00CED1"
               onPress={() => this.props.jumpTo("register")}
             />
          </View>
          </Container>
        </Container>
      </>
    );
  }else{
    return (
      <>
      <AppBar title="Login" />
      <Container margin="20">
          <Container padding='5'>
            <Text>You're already logged !</Text>
          </Container>
      </Container>
      </>
    );
  }
  }

  connexion = async () => {
    this.props.startLoading();
    let isLogged = await auth.authUser(this.state.Adresse,this.state.Password);
    if(isLogged){
      this.setState({Adresse:"",Password:""});
      alert('Connected successfully');
      this.props.jumpTo('profile');
      this.state.islogged = true;
    }else{
      alert('Error: Check your credentials');
      this.setState({Password:""});
    }
    this.props.stopLoading();
  }

}

const styles = StyleSheet.create({
/*  titleText: {
    marginVertical: 30,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },*/
  input: {
    marginHorizontal: 16,
    marginVertical: 35,
  },
  button: {
    marginVertical: 5,
    marginHorizontal: 10
  },
});
