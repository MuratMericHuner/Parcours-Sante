import React from 'react'
import { Component } from 'react';
import { Appbar, Drawer, Snackbar, Button } from 'react-native-paper';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Map from "./Components/Map";
import {auth} from "./Components/Auth";
import Location from 'expo-location';

export default class Home extends Component {
  state = {
    ModalVisible: false,
    location: {
      lat: 43.2937233,
      long: 5.3705167
    }
  }

  setLoading(bool){
    this.setState({loading:bool});
  }

  componentDidMount(){
    navigator.geolocation.watchPosition((position) => {
      this.setState({location:{lat:position.coords.latitude,long:position.coords.longitude}});
      //console.log({lat:position.coords.latitude,long:position.coords.longitude});
    }, (err) => console.log(err),{ enableHighAccuracy: true});
  }

  disconnected(){
    return <>
            <Drawer.Item
              style={{ backgroundColor: '#FF4C4C' }}
              icon="alert-box"
              onPress={() => this.setState({ModalVisible: true})}
              label="for benefit of all fonctionnality of map please connect on your account"
            />
            <Snackbar
              visible={this.state.ModalVisible}
              onDismiss={() => this.setState({ModalVisible: false})}
              action={{
                label: 'Login now',
                onPress: () => {
                  this.props.jumpTo("login");
                  this.setState({ModalVisible: false});
                },
              }}
            >
              For benefit of all fonctionnality of map please connect on your account
            </Snackbar>
            </>;
  }

  connected(){
    return <Drawer.Item
              style={{ backgroundColor: '#ffbe46' }}
              icon="alert"
              onPress={() => this.setState({ModalVisible: true})}
              label="Press the refresh icon button for rerun recommandation"
            />;
  }

  render() {
    return (
      <>
        <Map location={this.state.location} startLoading={this.props.startLoading} stopLoading={this.props.stopLoading}  />
        {auth.getUserId() == -1 ? this.disconnected() : this.connected()}
      </>
    );
  }

}
