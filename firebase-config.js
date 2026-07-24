// Firebase config for the LeagueJeopardy project (Realtime Database).
// Not a secret — Firebase apps secure data via database rules, not by hiding this config.
const firebaseConfig = {
  apiKey: "AIzaSyAOu1FkeMEgGt8Rakl7Y3UwiFpdEhNfLsY",
  authDomain: "leaguejeopardy-94fb2.firebaseapp.com",
  databaseURL: "https://leaguejeopardy-94fb2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "leaguejeopardy-94fb2",
  storageBucket: "leaguejeopardy-94fb2.firebasestorage.app",
  messagingSenderId: "883593548735",
  appId: "1:883593548735:web:3db4fa8e2d2d188e35870a"
};

firebase.initializeApp(firebaseConfig);
