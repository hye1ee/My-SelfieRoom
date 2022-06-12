import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCmGEuxBYTyZG1f2KxHSdWiYDsnckC8sSY",
    authDomain: "myselfieroom-7285b.firebaseapp.com",
    projectId: "myselfieroom-7285b",
    storageBucket: "myselfieroom-7285b.appspot.com",
    messagingSenderId: "931739053338",
    appId: "1:931739053338:web:667eb921db3797d2bc90a3"
};
  
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
