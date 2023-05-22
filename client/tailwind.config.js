/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				midnight: {
					100: "#7E8290",
					200: "#737785",
					300: "#686b79",
					400: "#5d606e",
					500: "#525563",
					600: "#464957",
					700: "#3b3e4c",
					800: "#303240",
					900: "#252735",
				},
			},
		},
	},
	plugins: [],
};
