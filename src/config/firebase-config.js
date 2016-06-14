const config = {
  apiKey: "AIzaSyC5JSURo_SLXw0I1F0gKbWW0zcfoCz4bmM",
  authDomain: "flexchat.firebaseapp.com",
  databaseURL: "https://flexchat.firebaseio.com",
  storageBucket: "project-8161952438615829383.appspot.com",
};

export function initializeFirebaseApp() {
  firebase.initializeApp(config);
  return config;
};