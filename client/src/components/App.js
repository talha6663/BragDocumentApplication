import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "../Theme";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/App.css";
import ParentComponent from "./ParentComponent";
import Protected from "./Protected";
import Welcome from "./Welcome";

function App() {
	const { theme } = useContext(ThemeContext);

	return (
		<AuthContextProvider>
			<div data-theme={theme}>
				{/* <div data-theme={theme}> */}
				<div className="App">
					<Routes>
						<Route exact path="/" element={<Welcome />} />
						<Route
							path="/brag"
							element={
								<Protected>
									<ParentComponent />
								</Protected>
							}
						/>
					</Routes>
				</div>
			</div>
		</AuthContextProvider>
	);
}

export default App;
