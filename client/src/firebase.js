import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDLYy_yERfCWwQiLfVzMDvaxyY-KpDHzP4",
	authDomain:"bragdoc-talha.firebaseapp.com",
	projectId: "bragdoc-talha",
	storageBucket: "bragdoc-talha.appspot.com",
	messagingSenderId: "305462885279",
	appId: "1:305462885279:web:3b9905bff70fdb0d5adbaa",
	measurementId: "G-GB3M8VVFRD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
