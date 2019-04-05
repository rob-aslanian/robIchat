import firebase from "firebase";
import "firebase/firestore";
import VueFire from "vue-firestore";
import Vue from "vue";

Vue.use(VueFire);

var config = {
  apiKey: "AIzaSyCWwvlnk2RIlWDCh5c0O82Ds9ZytUsO2Pw",
  authDomain: "vue-chat-97b23.firebaseapp.com",
  databaseURL: "https://vue-chat-97b23.firebaseio.com",
  projectId: "vue-chat-97b23",
  storageBucket: "vue-chat-97b23.appspot.com",
  messagingSenderId: "1084147621171"
};

firebase.initializeApp(config);

// // const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

export default firebase.firestore();
