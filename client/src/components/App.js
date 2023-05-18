import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/App.css";
import ParentComponent from "./ParentComponent";
import Protected from "./Protected";
import Welcome from "./Welcome";

function App() {
	return (
		<AuthContextProvider>
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
		</AuthContextProvider>
	);
}

export default App;
