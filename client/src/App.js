import './App.css';
// import InputForm from './components/InputForm';
// import ListBrags from './components/ListBrags';
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
