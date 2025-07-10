import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCylaTPTLE6AngQVTcMIgA_kky_N6uvK7U",
  authDomain: "servicedesk-5d8a2.firebaseapp.com",
  projectId: "servicedesk-5d8a2",
  storageBucket: "servicedesk-5d8a2.appspot.com",
  messagingSenderId: "904465221317",
  appId: "1:904465221317:web:43a3b8565b2d601fb692ac",
  measurementId: "G-4M6T3WC00Y",
  
 

};

const app = initializeApp(firebaseConfig);
export const  auth = getAuth(app);
export const db = getFirestore(app);


export default app; 