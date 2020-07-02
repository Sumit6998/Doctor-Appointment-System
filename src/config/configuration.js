import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyAeam_xsmJR5yyCz5IDwMdm7Q1Fht82BKE",
    authDomain: "dats-18138.firebaseapp.com",
    databaseURL: "https://dats-18138.firebaseio.com",
    projectId: "dats-18138",
    storageBucket: "dats-18138.appspot.com",
    messagingSenderId: "203541944840"
  };
  
  // firebase.initializeApp(config);
  // var db=firebase.firestore();
  //db.setting({timestampsInSnapshots:true});

//   if (!firebase.apps.length) {
//     firebase.initializeApp({});
// }
// export default firebase;
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
