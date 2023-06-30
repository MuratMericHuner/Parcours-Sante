import React from "react"
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import {bdd} from '../Bdd';
import {getRestAPIsData} from './Logs';

var user_data = null;
var k = null;
var count_recommandations = null;
var funct_ref = null;
var task_running = false;

export async function Knnbl(ud = {},function_reference = null,nb_recommandations = 10,k_neighbors = 10){
    user_data = ud;
    k = k_neighbors;
    count_recommandations = nb_recommandations;
    funct_ref = function_reference;
    const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      await Location.startLocationUpdatesAsync("knnbl", {
        accuracy: Location.Accuracy.Balanced,
      });
    }
}

function roundDecimal(nombre, precision){
    var precision = precision || 2;
    var tmp = Math.pow(10, precision);
    return Math.round( nombre*tmp )/tmp;
}

function InverseDistanceEuclidian(req = {},log = {},features = []){
  res = 0;
  features.forEach(feature => {
      let splitted = feature.split(".");
      let req_value = req;
      let log_value = log;
      for(let v in splitted){
          req_value = req_value[splitted[v]];
          log_value = log_value[splitted[v]];
      }
      res += (req_value - log_value) * (req_value - log_value);
  });
  res = 1/(res+1);

  return roundDecimal(res,2);
}

function InverseDistanceEuclidian_list(req = {},logs = [],features = []){
    let list = [];
    for(let l in logs){
      let log = logs[l];
      ComputeEnvironmentalImpact(log);
      list.push(InverseDistanceEuclidian(req,log,features));
    }

    return list;
}

function indexOFKNN(k,simList){
  indexes = [];
  let copy = simList.slice();
  for(let i = 0; i < k; i++){
    let index = extractMaxFromSimList(copy);
    if(index != -1)
      indexes.push(index);
  }
  return indexes;
}

function extractMaxFromSimList(simList){

    let max = 0;
    let index = -1;
    for(let d in simList){
      if(max < simList[d]){
          max = simList[d];
          index = d;
      }
    }
    if(index != -1){
      simList[index] = -1;
    }

    return index;
}

function predictScore(logs,simList,myKNNIndex,averageUser = 0,averageItem = 0){
  let res = 0;
  let simSUM = 0;

  for(let i in myKNNIndex){
    let index = myKNNIndex[i];
    res += (logs[index].rating.stars-averageUser-averageItem)*simList[index];
    simSUM += simList[index];
  }

  return (res/simSUM)+(averageUser+averageItem);
}

function meanRateUser(user_id,logs){
  let mean = 0.0;
  let countLogs = 0;
  for(let i in logs){
    let log = logs[i];
      if(log.user_id == user_id){
        mean += log.rating.stars;
        countLogs++;
      }
  }
  if(countLogs > 0)
    mean /= (countLogs*10,6);

  return mean;
}

function meanRateRoad(road_id,logs){
  let mean = 0.0;
  let countLogs = 0;
  for(let i in logs){
      let log = logs[i];
      if(log.way.road_id == road_id){
        mean += log.rating.stars;
        countLogs++;
      }
  }
  if(countLogs > 0)
    mean /= (countLogs);

  return mean;
}


function getRoadsByRadius(radius,roads,location){
  let closest = [];
  roads.forEach( (road) => {
    let location2 = {
      lat: road.lat,
      long: road.long
    };
    //console.log(road.val());
    if(isInRadius(radius,location,location2)){
      closest.push({
        road_id: road.road_id,
        lat: road.lat,
        long: road.long,
        address: road.address
      });
    }
  });

  return closest;
}


function isInRadius(radius_km,location1,location2){
    // Distance entre les coordonnées des 2 points
    let dist = distance(location1.lat,location1.long,location2.lat,location2.long, 'K');
    // Si c'est inférieur à notre rayon alors c'est OK
    return dist <= radius_km;
}

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}


function getBestRoads(scores,count){
  let best = [];
  let k = count;
  let copy = scores.slice();
  while(k > 0){
    let max = 0;
    let sc = -1;
    for(let i in copy){
        score = scores[i];
        if(max < score.score && !hasScore(i,best)){
            max = score.score;
            sc = score;
            sc.id = i;
        }
    }
    if(sc != -1){
      best.push(sc);
    }
    k--;
  }
  return best;
}

function hasScore(score_index,best){
  for(let i = 0; i < best.length; i++){
      if(score_index == best[i].id){
        return true;
      }
  }
  return false;
}

function generateRandomLogsByRoads(count,roads,restAPIs){
  let logs = [];

  for(let i = 0; i < count; i++){
    roads.forEach((road) => {
      let age = Math.floor(Math.random() * (76-15)) + 15;
      let diabetic = Math.floor(Math.random()*3);
      let handicapped = Math.floor(Math.random()*2);
      let breathing = Math.floor(Math.random()*2);
      let asthmatic = Math.floor(Math.random()*2);
      let skin = Math.floor(Math.random()*2);
      let heart = Math.floor(Math.random()*2);
      let visual = Math.floor(Math.random()*2);
      let weight = Math.floor(Math.random()*3);
      let heat = Math.floor(Math.random()*6);
      let humidity = Math.floor(Math.random()*3);
      let score = Math.floor(Math.random()*11);
      let log = {
        user_id: i,
        age: age,
        way: {
          road_id: road.id,
          lat: road.lat,
          long: road.long,
          distance: road.distance,
          elevation: road.elevation,
          pavement: road.pavement
        },
        env: {
          pollution: restAPIs.pollution,
          temperature: restAPIs.temperature,
          humidity: restAPIs.humidity,
          speed: restAPIs.speed
        },
        health: {
          diabetic: diabetic,
          handicapped: handicapped,
          breathing: breathing,
          asthmatic: asthmatic,
          skin: skin,
          heart: heart,
          visual: visual,
          weight: weight,
          heat: heat,
          humidity: humidity
        },
        rate: score
      };
      logs.push(log);
    });
  }
  return logs;
}

function generateRandomRoads(count){
  let roads = [];

  for(let i = 0; i < count; i++){
    let distance = Math.floor(Math.random()* 3);
    let elevation = Math.floor(Math.random()*3);
    let pavement = Math.floor(Math.random()*3);
    let address = "66 boulevard madik";
    let road = {
        id: i,
        lat: 43.4845926,
        long: 5.2404951,
        address: address,
        distance: distance,
        elevation: elevation,
        pavement: pavement
    };
    roads.push(road);
  }

  return roads;
}

function generateRandomReqs(userdata, roads, restAPIs, location){
  let reqs = [];
  roads.forEach((road) => {
      let req = {
        user_id: userdata.user_id,
        age: userdata.age,
        way: {
          road_id: road.road_id,
          lat: road.lat,
          long: road.long,
          address: road.address,
          distance: userdata.way.distance,
          elevation: userdata.way.elevation,
          pavement: userdata.way.pavement
        },
        env: {
          pollution: restAPIs.pollution,
          temperature: restAPIs.temperature,
          humidity: restAPIs.humidity,
          speed: restAPIs.speed
        },
        health: {
          diabetic: userdata.health.diabetic,
          handicapped: userdata.health.handicapped,
          breathing: userdata.health.breathing,
          asthmatic: userdata.health.asthmatic,
          skin: userdata.health.skin,
          heart: userdata.health.heart,
          visual: userdata.health.visual,
          weight: userdata.health.weight,
          heat: userdata.health.heat,
          humidity: userdata.health.humidity
        }
      };
      reqs.push(req);
  });
  return reqs;
}

function ComputeEnvironmentalImpact(req){
}

TaskManager.defineTask("knnbl", async ({ data: { locations }}) => {
      // liste des requêtes
      if(user_data == null) return;
      let reqs = [];
      let scores = [];
      let location = {
        lat: locations[0].coords.latitude,
        long: locations[0].coords.longitude
      }

      //console.log(location);
      // données environnementales actuelles de l'utilisateur
      let restAPIs = await getRestAPIsData(location);
      let logs = [];
      let roads = [];

      //roads = generateRandomRoads(30);
      //logs = generateRandomLogsByRoads(30,roads,restAPIs);
        await bdd.ref('Logs').once('value').then(async (data) => {
            await data.forEach(log => {
                logs.push(log.val());
            });
        });


        let countRandomLogs = 0;
        if(logs.length > 0)
         countRandomLogs = logs.length/2;


        await bdd.ref('Roads').once('value').then(async (data) => {
            await data.forEach(road => {
              roads.push(road.val());
            });
        });

        // On va chercher les routes dont un rayon donné
        let closest_roads = getRoadsByRadius(user_data.way.perimeter,roads,location);

       //reqs = generateRandomReqs(user_data,closest_roads,restAPIs,location);
      // construction de la requête
        // On complète chaque requête par une route
        for(let index in closest_roads){
          let road = closest_roads[index];
          let req = {
            user_id: user_data.user_id,
            age: user_data.age,
            way: {
              distance: user_data.way.distance,
              elevation: user_data.way.elevation,
              pavement: user_data.way.pavement,
              road_id: road.road_id,
              lat: road.lat,
              long: road.long,
              address: road.address
            },
            env: {
              pollution: restAPIs.pollution,
              temperature: restAPIs.temperature,
              humidity: restAPIs.humidity,
              speed: restAPIs.speed
            },
            health: {
              diabetic: user_data.health.diabetic,
              handicapped: user_data.health.handicapped,
              breathing: user_data.health.breathing,
              asthmatic: user_data.health.asthmatic,
              skin: user_data.health.skin,
              heart: user_data.health.heart,
              visual: user_data.health.visual,
              weight: user_data.health.weight,
              heat: user_data.health.heat,
              humidity: user_data.health.humidity
            }
          };
          reqs.push(req);
        }

          // On calcule le score de chaque route
          for(let i in reqs){
            let randomLogs = [];
            for(let i = 0; i < countRandomLogs; i++){
              let index = Math.floor(Math.random()*logs.length);
              randomLogs.push(logs[index]);
            }
            let req = reqs[i];
            let meanUser = meanRateUser(req.user_id,randomLogs);
            let meanRoad = meanRateRoad(req.way.road_id,randomLogs);
            let features = ["age","way.distance","way.elevation","way.pavement",
            "health.diabetic","health.handicapped","health.breathing","health.asthmatic",
            "health.skin","health.heart","health.visual","health.weight","health.heat",
            "health.humidity","env.pollution","env.temperature","env.humidity","env.speed"];
            ComputeEnvironmentalImpact(req);
            let simList = InverseDistanceEuclidian_list(req,randomLogs,features);
            let indexes = indexOFKNN(k,simList);
            let score = predictScore(randomLogs,simList,indexes,meanUser,meanRoad);
            scores.push({
                road_id: req.way.road_id,
                lat: req.way.lat,
                long: req.way.long,
                address: req.way.address,
                score: score
            });
          }
          // On récupère les meilleures routes à recommander
          let best = getBestRoads(scores,count_recommandations);

          // exécuter la fonction suivante
          if(funct_ref != null)
          funct_ref.call(this,best);

});
