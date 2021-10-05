import { initializeApp } from "firebase/app";
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA_OGZP97Qg-hkd-l96r7WKQJ0IbbITUWk',
  authDomain: 'qlnv-d7fd9.firebaseapp.com',
  databaseURL: 'https://qlnv-d7fd9-default-rtdb.firebaseio.com',
  projectId: 'qlnv-d7fd9',
  storageBucket: 'gs://qlnv-d7fd9.appspot.com',
  appId: '1:797628174505:ios:96a6492223dd07af8759b8',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };