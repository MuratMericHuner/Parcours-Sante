import React from "react";
import {View,Text,Slider,Picker} from "react-native";
import {TextInput,Button,Appbar, Switch } from "react-native-paper";
import AppBar from "./AppBar";
import Container from "./Components/Container";
import TabBar from "./Components/TabBar";
import {bdd} from "./Bdd";
import {auth} from "./Components/Auth";

export default class Profile extends React.Component{


  initialState = {
    name: "",
    surname: "",
    age: 0,
    postalcode: 0,
    address: "",
    mail: "",
    country: "",
    gender: "",
    way: {
      distance: 3,
      elevation: 3,
      pavement: 3,
      perimeter: 0,
    },
    health: {
      diabetic: 3,
      handicapped: 3,
      breathing: 3,
      asthmatic: 3,
      skin: 3,
      heart: 3,
      visual: 3,
      weight: 3,
      heat: 3,
      humidity: 3,
    },
    islogged: false
  };

  state = {
    name: "",
    surname: "",
    age: 0,
    postalcode: 0,
    address: "",
    mail: "",
    country: "",
    gender: "",
    way: {
      distance: 3,
      elevation: 3,
      pavement: 3,
      perimeter: 0,
    },
    health: {
      diabetic: 3,
      handicapped: 3,
      breathing: 3,
      asthmatic: 3,
      skin: 3,
      heart: 3,
      visual: 3,
      weight: 3,
      heat: 3,
      humidity: 3,
    },
    islogged: false
  };

  tabs(){
   return {
     routes:
       [
         { key: 'about', title:"Personal" },
         { key: 'health', title:"Health" },
         { key: 'road', title:"Road"},
       ],
     tabs: {
        "about": this.AboutUser(),
        "health":this.Health(),
        "road": this.Way(),
     },
   };
 }

 AboutUser(){
   return(
     <Container padding="5">
       <TextInput label='Name'
         value={this.state.name}
         disabled='true'/>
       <TextInput label='Surname'
         value={this.state.surname}
         disabled='true'/>
      <TextInput label='Gender'
          value={this.state.gender}
          disabled='true' />
       <TextInput label='Age'
         value={this.state.age.toString()}
         disabled='true'/>
       <TextInput label="Mail"
         value={this.state.mail}
         disabled='true'/>
       <TextInput label='Address'
         value={this.state.address}
         disabled='true'/>
       <TextInput label='Postal Code'
         value={this.state.postalcode.toString()}
         disabled='true'/>
       <TextInput label='Country'
         value={this.state.country}
         disabled='true'/>
     </Container>
   );
 }


 Health(){
   return(
     <Container padding="5">
     <View>
     <Text>Diabetics Type</Text>
     <Picker
        selectedValue={this.state.health.diabetic}
        onValueChange={(itemValue, itemIndex) => this.setState({health:{
          diabetic:itemValue,
          handicapped: this.state.health.handicapped,
          breathing: this.state.health.breathing,
          asthmatic: this.state.health.asthmatic,
          skin: this.state.health.skin,
          heart: this.state.health.heart,
          visual: this.state.health.visual,
          weight: this.state.health.weight,
          heat: this.state.health.heat,
          humidity: this.state.health.humidity,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="Not Diabetic" value={0} />
        <Picker.Item label="Type 1" value={1} />
        <Picker.Item label="Type 2" value={2} />
      </Picker>
     </View>
     <View>
     <Text>Handicap</Text>
     <Picker
     selectedValue={this.state.health.handicapped}
     onValueChange={(itemValue, itemIndex) => this.setState({health:{
       diabetic: this.state.health.diabetic,
       handicapped:itemValue,
       breathing: this.state.health.breathing,
       asthmatic: this.state.health.asthmatic,
       skin: this.state.health.skin,
       heart: this.state.health.heart,
       visual: this.state.health.visual,
       weight: this.state.health.weight,
       heat: this.state.health.heat,
       humidity: this.state.health.humidity,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="No" value={0} />
        <Picker.Item label="Yes" value={1} />
      </Picker>
     </View>
     <View>
     <Text>Breathing Problems</Text>
     <Picker
     selectedValue={this.state.health.breathing}
     onValueChange={(itemValue, itemIndex) => this.setState({health:{
       diabetic: this.state.health.diabetic,
       handicapped: this.state.health.handicapped,
       breathing:itemValue,
       asthmatic: this.state.health.asthmatic,
       skin: this.state.health.skin,
       heart: this.state.health.heart,
       visual: this.state.health.visual,
       weight: this.state.health.weight,
       heat: this.state.health.heat,
       humidity: this.state.health.humidity,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="No" value={0} />
        <Picker.Item label="Yes" value={1} />
      </Picker>
     </View>
     <View>
     <Text>Asthmatic</Text>
     <Picker
     selectedValue={this.state.health.asthmatic}
     onValueChange={(itemValue, itemIndex) => this.setState({health:{
       diabetic: this.state.health.diabetic,
       handicapped: this.state.health.handicapped,
       breathing: this.state.health.breathing,
       asthmatic:itemValue,
       skin: this.state.health.skin,
       heart: this.state.health.heart,
       visual: this.state.health.visual,
       weight: this.state.health.weight,
       heat: this.state.health.heat,
       humidity: this.state.health.humidity,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="No" value={0} />
        <Picker.Item label="Yes" value={1} />
      </Picker>
     </View>
     <View>
     <Text>Sensible Skin</Text>
     <Picker
     selectedValue={this.state.health.skin}
     onValueChange={(itemValue, itemIndex) => this.setState({health:{
       diabetic: this.state.health.diabetic,
       handicapped: this.state.health.handicapped,
       breathing: this.state.health.breathing,
       asthmatic: this.state.health.asthmatic,
       skin:itemValue,
       heart: this.state.health.heart,
       visual: this.state.health.visual,
       weight: this.state.health.weight,
       heat: this.state.health.heat,
       humidity: this.state.health.humidity,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="No" value={0} />
        <Picker.Item label="Yes" value={1} />
      </Picker>
     </View>
     <View>
     <Text>Heart Diseases</Text>
     <Picker
     selectedValue={this.state.health.heart}
     onValueChange={(itemValue, itemIndex) => this.setState({health:{
       diabetic: this.state.health.diabetic,
       handicapped: this.state.health.handicapped,
       breathing: this.state.health.breathing,
       asthmatic: this.state.health.asthmatic,
       skin: this.state.health.skin,
       heart:itemValue,
       visual: this.state.health.visual,
       weight: this.state.health.weight,
       heat: this.state.health.heat,
       humidity: this.state.health.humidity,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="No" value={0} />
        <Picker.Item label="Yes" value={1} />
      </Picker>
     </View>
     <View>
     <Text>Visual Problems</Text>
     <Picker
     selectedValue={this.state.health.visual}
     onValueChange={(itemValue, itemIndex) => this.setState({health:{
       diabetic: this.state.health.diabetic,
       handicapped: this.state.health.handicapped,
       breathing: this.state.health.breathing,
       asthmatic: this.state.health.asthmatic,
       skin: this.state.health.skin,
       heart: this.state.health.heart,
       visual:itemValue,
       weight: this.state.health.weight,
       heat: this.state.health.heat,
       humidity: this.state.health.humidity,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="No" value={0} />
        <Picker.Item label="Yes" value={1} />
      </Picker>
     </View>
     <View>
     <Text>Body Type</Text>
     <Picker
     selectedValue={this.state.health.weight}
      onValueChange={(itemValue, itemIndex) => this.setState({health:{
        diabetic: this.state.health.diabetic,
        handicapped: this.state.health.handicapped,
        breathing: this.state.health.breathing,
        asthmatic: this.state.health.asthmatic,
        skin: this.state.health.skin,
        heart: this.state.health.heart,
        visual: this.state.health.visual,
        weight:itemValue,
        heat: this.state.health.heat,
        humidity: this.state.health.humidity,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="Underweight" value={1} />
        <Picker.Item label="Healthy" value={0} />
        <Picker.Item label="OverWeight" value={2} />
      </Picker>
     </View>
     <View>
     <Text>Heat Tolerance</Text>
     <Picker
     selectedValue={this.state.health.heat}
      onValueChange={(itemValue, itemIndex) => this.setState({health:{
        diabetic: this.state.health.diabetic,
        handicapped: this.state.health.handicapped,
        breathing: this.state.health.breathing,
        asthmatic: this.state.health.asthmatic,
        skin: this.state.health.skin,
        heart: this.state.health.heart,
        visual: this.state.health.visual,
        weight: this.state.health.weight,
        heat: itemValue,
        humidity: this.state.health.humidity,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="Cannot Tolerate Heat" value={5} />
        <Picker.Item label="0°-10°" value={4} />
        <Picker.Item label="10°-30°" value={2} />
        <Picker.Item label="30°-50°" value={1} />
        <Picker.Item label="50°+" value={0} />
      </Picker>
     </View>
     <View>
     <Text>Humidity Tolerance</Text>
     <Picker
     selectedValue={this.state.health.humidity}
      onValueChange={(itemValue, itemIndex) => this.setState({health:{
        diabetic: this.state.health.diabetic,
        handicapped: this.state.health.handicapped,
        breathing: this.state.health.breathing,
        asthmatic: this.state.health.asthmatic,
        skin: this.state.health.skin,
        heart: this.state.health.heart,
        visual: this.state.health.visual,
        weight: this.state.health.weight,
        heat: this.state.health.heat,
        humidity: itemValue,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="Can Tolerate" value={0} />
        <Picker.Item label="Cannot Tolerate" value={1} />
        <Picker.Item label="Has Rheumatism" value={2} />
      </Picker>
     </View>
     <Button  style={{marginRight :40 ,marginLeft : 40, marginTop: 10 ,height:40, fontsize:111 }}
      mode="contained"
      onPress={() => this.Pressed()}>Save</Button>
     </Container>
   );
 }
 Way(){
   return(
     <Container padding="5">
     <View>
     <Text>Distance</Text>
     <Picker
     selectedValue={this.state.way.distance}
      onValueChange={(itemValue, itemIndex) => this.setState({way:{
        distance: itemValue,
        elevation: this.state.way.elevation,
        pavement: this.state.way.pavement,
        perimeter: this.state.way.perimeter,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="0-2 km" value={0} />
        <Picker.Item label="2-4 km" value={1} />
        <Picker.Item label="4+ km" value={2} />
      </Picker>
     </View>
     <View>
     <Text>Elevation</Text>
     <Picker
     selectedValue={this.state.way.elevation}
      onValueChange={(itemValue, itemIndex) => this.setState({way:{
        distance: this.state.way.distance,
        elevation: itemValue,
        pavement: this.state.way.pavement,
        perimeter: this.state.way.perimeter,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="Flat" value={0} />
        <Picker.Item label="Inclined" value={1} />
        <Picker.Item label="Strongly Inclined" value={2} />
      </Picker>
     </View>
     <View>
     <Text>Pavement</Text>
     <Picker
     selectedValue={this.state.way.pavement}
      onValueChange={(itemValue, itemIndex) => this.setState({way:{
      distance: this.state.way.distance,
      elevation: this.state.way.elevation,
      pavement: itemValue,
      perimeter: this.state.way.perimeter,}})}>
        <Picker.Item label="Select" value={3} />
        <Picker.Item label="Adapted" value={0} />
        <Picker.Item label="Not Adapted" value={1} />
      </Picker>
     </View>
     <View>
     <Text>Perimeter (For Best Recommendation)</Text>
     <Picker
     selectedValue={this.state.way.perimeter}
      onValueChange={(itemValue, itemIndex) => this.setState({way:{
        distance: this.state.way.distance,
        elevation: this.state.way.elevation,
        pavement: this.state.way.pavement,
        perimeter: itemValue,}})}>
        <Picker.Item label="Select" value={0} />
        <Picker.Item label="1 km" value={1} />
        <Picker.Item label="2 km" value={2} />
        <Picker.Item label="3 km" value={3} />
        <Picker.Item label="4 km" value={4} />
        <Picker.Item label="5 km" value={5} />
      </Picker>
     </View>
     <Button  style={{marginRight :40 ,marginLeft : 40, marginTop: 10 ,height:40, fontsize:111 }}
      mode="contained"
      onPress={() => this.Pressed()}>Save</Button>
     </Container>
   );
 }

Pressed(){
  this.props.startLoading();
  bdd.ref("User/"+auth.getUserId()).update({
    way: {
      distance: this.state.way.distance,
      elevation: this.state.way.elevation,
      pavement: this.state.way.pavement,
      perimeter: this.state.way.perimeter,
    },
    health: {
      diabetic: this.state.health.diabetic,
      handicapped: this.state.health.handicapped,
      breathing: this.state.health.breathing,
      asthmatic: this.state.health.asthmatic,
      skin: this.state.health.skin,
      heart: this.state.health.heart,
      visual: this.state.health.visual,
      weight: this.state.health.weight,
      heat: this.state.health.heat,
      humidity: this.state.health.humidity,
    }
  });
  alert("Data saved !");
  this.props.stopLoading();
}
  constructor(props){
    super(props);
  }

  componentDidMount(){
    bdd.ref('User/'+auth.getUserId()).once('value').then( (data) => {
      this.setState(data.val());
      if(data.val() != null)
        this.setState({islogged: true});
    });
    auth.onAuthChanged((uid) => {
      if(uid != -1){
        this.setState({islogged: true});
        bdd.ref('User/'+uid).once('value').then( (data) => {
          this.setState(data.val());
        });
      }else{
        this.setState({islogged: false});
        this.setState(this.initialState);
      }
    });
  }

  render(){
    if(this.state.islogged){
      return (
            <>
              <AppBar title="Profile" />
              <Container margin='20'>
                <TabBar render={this.tabs()} />
              </Container>
            </>
      );
    }else{
      return (
        <>
          <AppBar title="Profile" />
          <Container margin='20'>
            <Text>You are not logged !</Text>
          </Container>
        </>
      );
    }
  }
}
