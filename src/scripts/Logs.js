import React from "react";
import {bdd} from "../Bdd";
import axios from 'axios';

function roundDecimal(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}

async function AirQualityAPI(lat, long){
   const res = await axios.get('http://api.airvisual.com/v2/nearest_city?lat='+lat+'&lon='+long+'&key=1fef1ecf-9338-4731-bf9a-42181dc9340a');
   return await res.data;
}

async function TrafficFlowAPI(lat, long){
   const res = await axios.get('https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/jsonp?key=eO4AIWKdZVGe3q2A2fIq9e9XdgFcVOqb&point='+lat+','+long+'&jsonp=jsonp');
  return await JSON.parse(res.data.replace('jsonp(','').replace(')',''));
}

async function getRestAPIsData(location){
  let aq = await AirQualityAPI(location.lat,location.long);
  let tf = await TrafficFlowAPI(location.lat,location.long);
  // valeurs comprises entre 0 et 1
  let pollution = roundDecimal(aq.data.current.pollution.aqius/200,2);
  let temperature = roundDecimal(aq.data.current.weather.tp/60,2);
  let humidity = roundDecimal(aq.data.current.weather.hu/100,2);
  let speed = roundDecimal(1-(tf.flowSegmentData.currentSpeed/tf.flowSegmentData.freeFlowSpeed),2);
  return {
    pollution: pollution,
    temperature: temperature,
    humidity: humidity,
    speed: speed
  };
}

async function createLog(user_id, road_id, rating, location){
    let userdata = {};
    let roaddata = {};
    await bdd.ref("User/"+user_id).once('value').then(async data => {
        userdata = await data.val();
    });
    await bdd.ref("Roads/"+road_id).once('value').then(async data => {
        roaddata = await data.val();
    });
    let restAPIs = await getRestAPIsData(location);

    let check = userdata.health.diabetic != 3 && userdata.health.handicapped != 3
    && userdata.health.breathing != 3 && userdata.health.asthmatic != 3
    && userdata.health.asthmatic != 3 && userdata.health.skin != 3
    && userdata.health.heart != 3 && userdata.health.visual != 3
    && userdata.health.weight != 3 && userdata.health.heat != 3
    && userdata.health.heat != 3 && userdata.health.humidity != 3
    && userdata.way.distance != 3 && userdata.way.elevation != 3
    && userdata.way.pavement != 3 && userdata.way.perimeter != 0;

    if(!check) return "fill all fields in your profile !";

    let log = {};
    log.user_id = user_id;
    log.age = userdata.age;
    log.way = {};
    log.way.road_id = road_id;
    log.way.lat = location.lat;
    log.way.long = location.long;
    if(roaddata != null){
      log.way.distance = roaddata.distance;
      log.way.elevation = roaddata.elevation;
      log.way.pavement = roaddata.pavement;
    }
    log.health = {};
    if(userdata != null){
      log.health.diabetic = userdata.health.diabetic;
      log.health.handicapped = userdata.health.handicapped;
      log.health.breathing = userdata.health.breathing;
      log.health.asthmatic = userdata.health.asthmatic;
      log.health.skin = userdata.health.skin;
      log.health.heart = userdata.health.heart;
      log.health.visual = userdata.health.visual;
      log.health.weight = userdata.health.weight;
      log.health.heat = userdata.health.heat;
      log.health.humidity = userdata.health.humidity;
    }
    log.env = {};
    log.env.pollution = restAPIs.pollution;
    log.env.temperature = restAPIs.temperature;
    log.env.humidity =restAPIs.humidity;
    log.env.speed = restAPIs.speed;
    log.rating = {};
    log.rating.stars = rating.stars;
    if(rating.comment != "")
      log.rating.comment = rating.comment;
    const newRef = bdd.ref('/Logs').push();
    newRef.set(log).then(() => console.log('Log created'));

    return log;
}

export {
    createLog,
    getRestAPIsData
}
