import "../App.css";
import Navbar from "./Navbar";
import ParentComponent from "./ParentComponent";

function App() {
	return (
		<>
			<Navbar />
			<div className="App">
				<ParentComponent />
			</div>
		</>
	);
}

export default App;
