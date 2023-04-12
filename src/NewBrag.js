import AddForm from './components/addForm';
import Navbar from './components/navbar';

const NewBrag = () => {
	const date = new Date();

	const options = { month: 'long', day: 'numeric', year: 'numeric' };
	const formattedDate = date.toLocaleDateString('en-US', options);

	return (
		<div className="mainWrapper">
			<Navbar />
			<main>
				<div className="labelContainer">
					<div>What did you do today?</div>
					<div className="dateTime">Today is {formattedDate}</div>
				</div>
				<AddForm />
			</main>
		</div>
	);
};

export default NewBrag;
