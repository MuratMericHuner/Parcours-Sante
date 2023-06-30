import React from "react";
import {BottomNavigation} from "react-native-paper";
import Profile from './Profile';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import {auth} from "./Components/Auth";

export default class NavBar extends React.Component{
  state = {
    index: 0,
    routes: this.props.navs.routes
  };

  constructor(props){
    super(props);
  }

  renderScene = BottomNavigation.SceneMap(this.props.navs.tabs);

  handleIndexChange = index => this.setState({ index });

  render(){
    return (
      <>
      <BottomNavigation
        onTabPress={ (route) => {
          if(auth.expireToken()){
            alert('Your session has expired !');
          }
        }}

        navigationState={this.state}
        onIndexChange={this.handleIndexChange}
        renderScene={({route,jumpTo}) => {
          switch(route.key){
            case "profile": return <Profile loading={this.props.loading} startLoading={this.props.startLoading} stopLoading={this.props.stopLoading} jumpTo={jumpTo} />;
            case "register": return <Register loading={this.props.loading} startLoading={this.props.startLoading} stopLoading={this.props.stopLoading} jumpTo={jumpTo} />;
            case "home": return <Home loading={this.props.loading} startLoading={this.props.startLoading} stopLoading={this.props.stopLoading} jumpTo={jumpTo} />;
            case "login": return <Login loading={this.props.loading} startLoading={this.props.startLoading} stopLoading={this.props.stopLoading} jumpTo={jumpTo} />;
          }
        }}
      />
      </>
    );
  }

}
