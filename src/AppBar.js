import React from "react";
import { Appbar, Dialog, Portal, Button } from "react-native-paper";
import {auth} from "./Components/Auth";

export default class AppBar extends React.Component{

  state = {
    visible: false
  };

  constructor(props){
    super(props);
    this.handleMore = this.handleMore.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
  }

  handleMore(){
    this.setState({visible: true});
  }

  hideDialog(){
    if(auth.isConnected() && auth.logout()){
      alert('logout successfully !');
    }else{
      alert('You are not connected !');
    }
    this.setState({visible: false});
  }


  componentDidMount(){

  }

  render(){
    return (
      <>
      <Appbar.Header>
        <Appbar.Content title={this.props.title}  />
        <Appbar.Action icon="dots-vertical" onPress={this.handleMore} />
      </Appbar.Header>
      <Portal>
        <Dialog
           visible={this.state.visible}
           onDismiss={() => this.setState({visible: false})}>
          <Dialog.Title>Actions</Dialog.Title>
          <Dialog.Content>
                <Button mode="contained" onPress={this.hideDialog}>Sign out</Button>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => this.setState({visible: false})}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      </>
    );
  }

}
