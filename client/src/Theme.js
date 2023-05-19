import React, { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const getTheme = () => {
	const theme = localStorage.getItem("theme");
	if (!theme) {
		// Default theme is taken as dark
		localStorage.setItem("theme", "dark");
		return "dark";
	} else {
		return theme;
	}
};

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(getTheme);
	// console.log("made it to themeJS!");
	function toggleTheme() {
		if (theme === "dark") {
			setTheme("light");
			console.log("im a light theme");
		} else {
			setTheme("dark");
			console.log("dark!!!");
		}
	}

	useEffect(() => {
		const refreshTheme = () => {
			localStorage.setItem("theme", theme);
		};

		refreshTheme();
	}, [theme]);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme,
				toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };
