import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "../Theme";
import { AuthContextProvider } from "../context/AuthContext";
import ParentComponent from "./ParentComponent";
import Protected from "./Protected";
import Welcome from "./Welcome";

function App() {
	const { theme } = useContext(ThemeContext);

	return (
		<AuthContextProvider>
			<Routes>
				<Route
					exact
					path="/"
					element={
						<div className="flex justify-items-stretch min-h-screen bg-slate-50 text-neutral-700">
							<Welcome />
						</div>
					}
				/>
				<Route
					path="/brag"
					element={
						<Protected>
							<div className={theme}>
								<div className="flex justify-items-stretch min-h-screen bg-slate-50 text-neutral-700 dark:bg-midnight-900 dark:text-neutral-200">
									<ParentComponent />
								</div>
							</div>
						</Protected>
					}
				/>
			</Routes>
		</AuthContextProvider>
	);
}

export default App;
