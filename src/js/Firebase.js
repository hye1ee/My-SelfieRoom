import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB9BwTluXqKWZPMHi-AR556bP4tgUcrvNY",
  authDomain: "my-selfieroom.firebaseapp.com",
  projectId: "my-selfieroom",
  storageBucket: "my-selfieroom.appspot.com",
  messagingSenderId: "974619693048",
  appId: "1:974619693048:web:67e09359f1b681cdaa900d"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);


export {storage, database} ;
