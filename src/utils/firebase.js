import firebase from 'gatsby-plugin-firebase';

export let googleProvider = new firebase.auth.GoogleAuthProvider();
export let facebookProvier = new firebase.auth.FacebookAuthProvider();

export const auth = firebase.auth();
export const db = firebase.firestore();

// Add file [CredentialsContainer.js] on root folder with the firebase's credentials data

// module.exports = {
//   apiKey: "<YOUR_FIREBASE_API_KEY>",
//   authDomain: "<YOUR_FIREBASE_AUTH_DOMAIN>",
//   databaseURL: "<YOUR_FIREBASE_DATABASE_URL>",
//   projectId: "<YOUR_FIREBASE_PROJECT_ID>",
//   storageBucket: "<YOUR_FIREBASE_STORAGE_BUCKET>",
//   messagingSenderId: "<YOUR_FIREBASE_MESSAGING_SENDER_ID>",
//   appId: "<YOUR_FIREBASE_APP_ID>",
//   measurementId: "<YOUR_FIREBASE_MEASUREMENT_ID>"
// }