import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

export default class TabBar extends React.Component{

  state = {
    index: 0,
    routes: this.props.render.routes,
  };

  initialLayout = { width: Dimensions.get('window').width };

  handleIndexChange = index => this.setState({ index });

  constructor(props){
    super(props);
  }

  render(){
    return (
      <TabView
          navigationState={this.state}
          renderScene={({route}) => {
            return this.props.render.tabs[route.key];
          }}
          onIndexChange={this.handleIndexChange}
          initialLayout={this.initialLayout}
        />
    );
  }
}
