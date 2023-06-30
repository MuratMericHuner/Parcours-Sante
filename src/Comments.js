import React from "react";
import {List} from "react-native-paper";
import {bdd} from "./Bdd";

export default class Comments extends React.Component{
  state = {
    comments: [],
    expanded: true
  }

  constructor(props){
    super(props);
  }

  async loadComments(count){
    let cmts = [];
    let road_id = this.props.road_id;
    await bdd.ref('/Logs').orderByChild('way/road_id').equalTo(road_id).limitToLast(count).once('value').then( async (logs) => {
      logs.forEach( (log) => {
          let l = log.val();
          cmts.push({
            comment: l.rating.comment,
            stars: l.rating.stars,
            key: Math.floor(Math.random()*100)+Math.floor(Math.random()*100)+Math.floor(Math.random()*100)
          });
      });
      this.setState({comments: cmts});
    });
  }

  componentDidMount(){
    this.loadComments(10);
  }

  render(){
    return (
      <List.Section>
        <List.Accordion
          title="List of comments"
          left={props => <List.Icon icon="comment-text" />}
          expanded={this.state.expanded}
          onPress={() => this.setState({expanded: !this.state.expanded})}
        >
          {
            this.state.comments.map(
              comment => (
                <List.Item key={comment.key} title={comment.stars+" stars"} description={comment.comment} />
              )
            )
          }
        </List.Accordion>
      </List.Section>
    );
  }

}
