import firebase from 'firebase/app'
import 'firebase/firestore'
import apiTokens from "../apiTokens";


// Initialize Firebase
var config = apiTokens.firebase;
firebase.initializeApp(config);


// firebase utils
const db = firebase.firestore();


const flowsCollection = db.collection('flows');

export {
  db,
  flowsCollection
}