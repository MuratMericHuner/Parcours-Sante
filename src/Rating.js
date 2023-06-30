import React from "react";
import {Text, ScrollView, Picker} from "react-native";
import {TextInput, Button, Modal, Portal, Divider} from "react-native-paper";
import {auth} from "./Components/Auth";
import {bdd} from "./Bdd";
import {createLog} from "./scripts/Logs";
import Comments from "./Comments";
import RoadDescription from "./RoadDescription";

type Props = {
  visible: boolean;
  onhide?: () => void;
  road_id: number;
};

export default class Rating extends React.Component<Props>{

state= {
  stars: 0,
  comment: "",
  visible: this.props.visible
};

Pressed(){
    this.props.onhide();
    let log = createLog(auth.getUserId(),this.props.road_id,{stars: this.state.stars, comment: this.state.comment},this.props.location);
    if(log instanceof Object){
      alert('Thank for giving score !');
    }else{
      alert(log);
    }

    this.setState({stars:0, comment:""});
}

render(){
  return(
  <Portal>
  <Modal
  visible={this.props.visible}>
  <ScrollView style={{padding:10, backgroundColor:"#ffffff", margin:30, height: 500}}>
  <Text>Was this recommendation useful to you?</Text>
  <Picker
  selectedValue= {this.state.stars}
  onValueChange={(itemValue, itemIndex) => this.setState({stars: itemValue})}>
  <Picker.Item label="0" value="0" />
  <Picker.Item label="1" value="1" />
  <Picker.Item label="2" value="2" />
  <Picker.Item label="3" value="3" />
  <Picker.Item label="4" value="4" />
  <Picker.Item label="5" value="5" />
  <Picker.Item label="6" value="6" />
  <Picker.Item label="7" value="7" />
  <Picker.Item label="8" value="8" />
  <Picker.Item label="9" value="9" />
  <Picker.Item label="10" value="10" />
  </Picker>
  <TextInput
  label="Comment (Optionnal)"
  multiline
  value={this.state.comment}
  onChangeText={comment => this.setState({ comment })}>
  </TextInput>
  <Button  style={{height:40, marginTop: 10, fontsize:111 }}
   mode="contained"
   onPress={() => this.Pressed()}>Rate</Button>
   <Button  style={{height:40, marginTop: 10, fontsize:111 }}
    mode="contained"
    onPress={() => this.props.onhide()}>Don't Rate</Button>
   <Divider />
   <RoadDescription road_id={this.props.road_id} />
   <Divider />
   <Comments road_id={this.props.road_id} />
   </ScrollView>
  </Modal>
  </Portal>
)
}}
