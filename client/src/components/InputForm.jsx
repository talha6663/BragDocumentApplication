import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

const InputForm = (props) => {

    const [brag, setBrag] = useState("");
	const [tags, setTags] = useState("");
	const {user} = UserAuth();
	const userEmail = user.email;

	const onSubmitForm = async (e) => {
		e.preventDefault();

		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		let currentDate = `${year}-${month}-${day}`;
		let currentTime = `${hour}:${minutes}:${seconds}`;

		try {
			const body = { brag, tags, userEmail, currentDate, currentTime };
			await fetch(`${process.env.REACT_APP_API_URL}/brags`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

			// Refresh brag list
            props.toggleRefreshList();

			// Clear inputs
			setBrag("");
			setTags("");
		} catch (err) {
			console.error(err.message);
		}
	};

    return (
		<div className="panel_left">
			<form className="input_form" onSubmit={onSubmitForm}>
				<label htmlFor="brag">Brag about what you've done!</label>
				<textarea id="brag" col="6" rows="10" className="form_element" placeholder="I've accomplished ..." onChange={(e) => setBrag(e.target.value)} value={brag}></textarea>
				<label htmlFor="tags">Tags - Comma separated if multiple</label>
				<input id="tags" className="form_element" placeholder="Eg: mentored, javascript, winning" onChange={(e) => setTags(e.target.value)} value={tags} />
				<button className="btn">Submit</button>
			</form>

			<div>
				<h3>You won't remember everything you did and neither will your manager!</h3>
				<div>This is why you should always have a bragdoc on the go.  Here are some tips and suggestions.</div>
				<ul>
					<li>Document your goals and accomplishments.</li>
					<li>Your contributions to a project.</li>
					<li>Little wins!</li>
					<li>Anything you might need to remember.</li>
					<li>Use comma separated tags to organize your brags.</li>
				</ul>
				<div>You can update it daily, weekly or monthly, just be sure to stay consistant.  Your career will thank you.</div>
			</div>
		</div>
    );
};

export default InputForm;