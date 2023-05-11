import { Route, Routes } from "react-router-dom";
import "../App.css";
import { AuthContextProvider } from "../context/AuthContext";
import Navbar from "./Navbar";
import ParentComponent from "./ParentComponent";
import Protected from "./Protected";
import Welcome from "./Welcome";

function App() {
	return (
		<AuthContextProvider>
			<Navbar />
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
