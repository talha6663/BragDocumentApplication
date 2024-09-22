import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
// 	apiKey: "",
// 	authDomain:"",
// 	projectId: "",
// 	storageBucket: "",
// 	messagingSenderId: "",
// 	appId: "",
// 	measurementId: ""
// };
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDLYy_yERfCWwQiLfVzMDvaxyY-KpDHzP4",
	authDomain: "bragdoc-talha.firebaseapp.com",
	databaseURL: "https://bragdoc-talha-default-rtdb.firebaseio.com",
	projectId: "bragdoc-talha",
	storageBucket: "bragdoc-talha.appspot.com",
	messagingSenderId: "305462885279",
	appId: "1:305462885279:web:3b9905bff70fdb0d5adbaa",
	measurementId: "G-GB3M8VVFRD"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
