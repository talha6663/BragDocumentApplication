import React, { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const getTheme = () => {
	const theme = localStorage.getItem("theme");

	if (!theme) {
		// Default to light theme
		localStorage.setItem("theme", "light");
		return "light";
	} else {
		return theme;
	}
};

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(getTheme);

	function toggleTheme() {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
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
