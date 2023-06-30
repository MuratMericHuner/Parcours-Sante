import React from "react";
import {View, StyleSheet, ScrollView} from "react-native";


export default function Container(props){
  return (
      <ScrollView style={styles(props).container}>
          {props.children}
      </ScrollView>
  );
}

const styles = (props) => StyleSheet.create({
    container: {
        padding: isNaN(parseInt(props.padding)) ? 0 : parseInt(props.padding),
        margin: isNaN(parseInt(props.margin)) ? 0 : parseInt(props.margin),
        backgroundColor: "#E9E9E9",
    },
});
