import './App.css';
import Navbar from './components/Navbar';
import ParentComponent from './components/ParentComponent';

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
