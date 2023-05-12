import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
// 	apiKey: "AIzaSyBG-rTiCQieJwGV7ZM5_LbzxTlw5TFlGNw",
// 	authDomain: "bragbox-26f34.firebaseapp.com",
// 	projectId: "bragbox-26f34",
// 	storageBucket: "bragbox-26f34.appspot.com",
// 	messagingSenderId: "789227674807",
// 	appId: "1:789227674807:web:cd4e5c49b5c00492494132",
// 	measurementId: "G-8ZHWV5S5C6",
// };

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSANGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
