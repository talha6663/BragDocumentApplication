import AddForm from './components/addForm';
import Navbar from './components/navbar';

const Add = () => {
	return (
		<div className="mainWrapper">
			<Navbar />
			<main>
				<AddForm />
			</main>
		</div>
	);
};

export default Add;
