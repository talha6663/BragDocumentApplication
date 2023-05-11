import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBG-rTiCQieJwGV7ZM5_LbzxTlw5TFlGNw",
	authDomain: "bragbox-26f34.firebaseapp.com",
	projectId: "bragbox-26f34",
	storageBucket: "bragbox-26f34.appspot.com",
	messagingSenderId: "789227674807",
	appId: "1:789227674807:web:cd4e5c49b5c00492494132",
	measurementId: "G-8ZHWV5S5C6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
