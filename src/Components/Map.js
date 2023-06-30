import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {FAB} from "react-native-paper";
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';
import {bdd} from "../Bdd"
import {auth} from "./Auth";
import {Knnbl} from "../scripts/Knnbl";
import Rating from "../Rating";
import Constants from 'expo-constants';
import * as TaskManager from 'expo-task-manager';

var isRunning = false;

export default function Map(props) {
  const [markers, setMarkers] = useState([]);
  const [showRating, setShowRating] = useState(false);
  const [roadId, setRoadId] = useState(-1);

  let loadKnnbl = async (location) => {
                let user = null;
                let id = auth.getUserId();
                await bdd.ref("User/"+id).once('value').then(  data => {
                  user = data.val();
                });
                if(user != null){
                  user.user_id = id;
                  if(!isRunning){
                    isRunning = true;
                      props.startLoading();
                      Knnbl(user,async (data) => {
                        let d = await data;
                        let marks = [];
                        d.forEach((road)=> {
                          console.log(road);
                          marks.push({title:road.address,id: road.road_id,lat: road.lat,
                          long: road.long});
                        });
                        setMarkers(marks);
                        props.stopLoading();
                        isRunning = false;
                      });
                  }
                }
  };

  return (
        <>
          <Rating location={props.location} visible={showRating} onhide={() => setShowRating(false)} road_id={roadId} />
          <MapView
            style={{
              flex: 1,
              marginTop: Constants.statusBarHeight
            }}
            region={{
              latitude: props.location.lat,
              longitude: props.location.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            onMapReady={
              () => {
                if(auth.getUserId() != -1){
                  loadKnnbl({
                    lat: props.location.lat,
                    long: props.location.long
                  });
                }
              }
            }
            loadingEnabled={true}
            moveOnMarkerPress={false}
            userLocationAnnotationTitle={"You're position"}
            followsUserLocation={true}
            minZoomLevel={12}
            showsUserLocation={true}
            showsTraffic={true}
          >
          {markers.map(marker =>
            (
              <Marker onPress={() => {
                setRoadId(marker.id);
                setShowRating(true);
              }
              } key={marker.id} title={marker.title} coordinate={{latitude:marker.lat,longitude:marker.long}} />
            )
          )}
          </MapView>
          <FAB
            style={styles.fab}
            small
            icon="refresh"
            onPress={() => {
              if(auth.getUserId() == -1){
                alert('You could be logged for do this action');
                return;
              }
              loadKnnbl({
                lat: props.location.lat,
                long: props.location.long
              });
            }}
          />
        </>
  );
}


const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
  },
})
