import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const googleSignIn = () => {
		let provider = new GoogleAuthProvider();

		// Allows prompt to show to switch Google accounts
		provider.setCustomParameters({
			prompt: "select_account",
		});

		signInWithPopup(auth, provider);
	};

	const logout = () => {
		signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return <AuthContext.Provider value={{ googleSignIn, logout, user }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
