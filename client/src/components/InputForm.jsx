import React, { useState } from 'react';

const InputForm = (props) => {

    // const [title, setTitle] = useState('');
    const [brag, setBrag] = useState('');

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { brag };
			await fetch('http://localhost:5000/brags', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

			// Refresh brag list
            props.toggleRefreshList();

			// Clear input
			setBrag("");
		} catch (err) {
			console.error(err.message);
		}
	};

    return (
		<div className="panel_left">
			<form className="input_form" onSubmit={onSubmitForm}>
				<textarea id="brag" col="6" rows="14" className="form_element" placeholder="Brag what you've done!" onChange={(e) => setBrag(e.target.value)} value={brag}></textarea>
				<button class="btn">Submit</button>
			</form>

			<div>
				<h3>You won't remember everything you did and neither will your manager!</h3>
				<div>This is why you should always have a bragdoc on the go.  Here are some tips and suggestions.</div>
				<ul>
					<li>Document your goals and accomplishments.</li>
					<li>Your contributions to a project.</li>
					<li>Little wins!</li>
				</ul>
				<div>You can update it daily or weekly, just be sure to stay consistant.  Your career will thank you.</div>
			</div>
		</div>
    );
};

export default InputForm;