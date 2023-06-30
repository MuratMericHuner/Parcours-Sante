import * as React from 'react';
import {View, Text} from "react-native";
import NavBar from './Navbar';
import {auth} from "./Components/Auth";
import Loader from "./Components/Loader";

export default class App extends React.Component{

  state = {
    loading: false
  }

  navs(){
    return {
      routes:
        [
          { key: 'home', icon: 'home' },
          { key: 'login', icon: 'login' },
          { key: 'register', icon: 'account-plus' },
          { key: 'profile', icon: 'account' },
        ]
    };
  }

  render(){
    return (
      // Le composant Menu principal à intégrer ici
      // Si vous voulez réaliser des tests pour vérifier que votre composant fonctionne
      // N'oubliez pas d'importer votre composant et de l'ajouter ici
      <>
        <Loader loading={this.state.loading} />
        <NavBar loading={this.state.loading} startLoading={() => this.setState({loading: true})} stopLoading={() => this.setState({loading: false})} navs={this.navs()} />
      </>
    )
  }
}
