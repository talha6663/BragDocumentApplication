import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import ButtonLarge from './forms/ButtonLarge';
import Label from './forms/Label';

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

			// Set focus back to the textarea
			document.getElementById('brag').focus();

		} catch (err) {
			console.error(err.message);
		}
	};

    return (
		<div className="w-1/3 mt-20 ml-20 pr-5">
			<form className="flex flex-col" onSubmit={onSubmitForm}>
				<Label htmlFor={brag} value={"Brag about what you've done!"} />
				<textarea id="brag" col="6" rows="10" className="mb-3 p-3 w-full bg-slate-200 dark:bg-midnight-800 dark:border-midnight-800 dark:text-midnight-100 border-2 rounded-md border-slate-300 focus:outline-none" placeholder="I've accomplished ..." onChange={(e) => setBrag(e.target.value)} value={brag}></textarea>
				<Label htmlFor={tags} value={"Tags - Comma separated if multiple"} />
				<input id="tags" className="p-3 w-full bg-slate-200 border-2 rounded-md border-slate-300 dark:bg-midnight-800 dark:border-midnight-800 dark:text-midnight-200 focus:outline-none" placeholder="Eg: mentored, javascript, winning" onChange={(e) => setTags(e.target.value)} value={tags} />
				<ButtonLarge btnType={"submit"} value={"Submit"} />
			</form>

			<section className="my-4">
				<h3 className="text-xl font-bold text-neutral-600 dark:text-neutral-300 my-5">You won't remember everything you did and neither will your manager!</h3>
				<p className="my-3">This is why you should always have a bragdoc on the go.  Here are some tips and suggestions.</p>
				<ul className="list-inside list-disc mt-1">
					<li className="pl-4">Document your goals and accomplishments.</li>
					<li className="pl-4">Your contributions to a project.</li>
					<li className="pl-4">Little wins!</li>
					<li className="pl-4">Anything you might need to remember.</li>
					<li className="pl-4">Use comma separated tags to organize your brags.</li>
				</ul>
				<p className="my-3">You can update it daily, weekly or monthly, just be sure to stay consistant.  Your career will thank you.</p>
			</section>
		</div>
    );
};

export default InputForm;