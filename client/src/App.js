import './App.css';
import InputForm from './components/InputForm';
import ListBrags from './components/ListBrags';
import Navbar from './components/Navbar';

function App() {
	return (
		<>
			<Navbar />
			<div className="App">
				<InputForm />
				<ListBrags />
			</div>
		</>
	);
}

export default App;
