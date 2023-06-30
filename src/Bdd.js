import firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAYEmp732TWTu5Zx2miBkPKaiLFJhs8Kyc",
  authDomain: "parcourssante-536be.firebaseapp.com",
  databaseURL: "https://parcourssante-536be.firebaseio.com",
  storageBucket: "parcourssante-536be.appspot.com",
};
let app = null;
try {
  app = firebase.initializeApp(firebaseConfig);
}catch(err){}


export const bdd = app.database();
