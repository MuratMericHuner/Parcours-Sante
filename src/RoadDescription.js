import React from "react";
import {List} from "react-native-paper";
import {Text} from "react-native";
import {bdd} from "./Bdd";

export default class Comments extends React.Component{
  state = {
    road_data: {},
    expanded: true
  }

  constructor(props){
    super(props);
  }

  loadRoadData(){
    let road_id = this.props.road_id;
    bdd.ref('/Roads').orderByChild('road_id').equalTo(road_id).once('value').then( (data) => {
        this.setState({road_data: data.val()[Object.keys(data.val())[0]]});
    });
  }

  componentDidMount(){
    this.loadRoadData();
  }

  render(){
    return (
      <List.Section>
        <List.Accordion
          title="Route description"
          left={props => <List.Icon icon="comment-text" />}
          expanded={this.state.expanded}
          onPress={() => this.setState({expanded: !this.state.expanded})}
        >
          <Text>Address: {this.state.road_data.address}</Text>
        </List.Accordion>
      </List.Section>
    );
  }

}
