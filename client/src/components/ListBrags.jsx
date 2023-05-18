import { useCallback, useEffect, useState } from 'react';
import { FaTrash } from "react-icons/fa";
import { UserAuth } from '../context/AuthContext';
import EditBrag from './EditBrag';

const ListBrags = (props) => {
    
    const [brags, setBrags] = useState([]);
    const {user} = UserAuth();

	const getBrags = useCallback(async (email) => {
		try {
			let jsonData = [];
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/brags?userEmail=${email}`
			);
			// const jsonData = await response.json();
			// console.log(props.jsonData);
			if (props.jsonData) {
				jsonData = props.jsonData;
			} else {
				jsonData = await response.json();
			}
			

			let bragsObject = {};
			jsonData.forEach(function (arrayItem) {
				const date = arrayItem.created_date;
				const {brag_id, brag, tags, created_time} = arrayItem;

				if (bragsObject[date] && bragsObject[date].length > 0) {
					bragsObject[date].push({brag_id, brag, tags, created_time});
					bragsObject[date].tags = bragsObject[date].tags.concat(tags);
				} else {
					bragsObject[date] = [{brag_id, brag, tags, created_time}];
					bragsObject[date].tags = [].concat(tags);
				}
			});

			setBrags(bragsObject);
		} catch (err) {
			console.error(err.message);
		}
	}, [setBrags, props.jsonData]);

	

	const deleteBrag = async (id) => {
		try {
			await fetch(`${process.env.REACT_APP_API_URL}/brags/${id}`, {
				method: 'DELETE',
			});

			// Create a copy of the brags state object
			const updatedBrags = {...brags};

			// Loop through each date key in the object
			Object.keys(updatedBrags).forEach(date => {
				// Filter out the deleted brag from the array for the current date as well as tags
				updatedBrags[date] = updatedBrags[date].filter(brag => brag.brag_id !== id);
				updatedBrags[date].tags = updatedBrags[date].map((brag) => brag.tags).flat();
			});

			// Update the state with the updated object
			setBrags(updatedBrags);
		} catch (err) {
			console.error(err.message);
		}
	};

	// Formats the date into a more readable format
	function formatDate(dateString) {
		const date = new Date(dateString);
		const monthNames = [
			"January", "February", "March", "April", "May", "June", "July", 
			"August", "September", "October", "November", "December"
		];
		const monthIndex = date.getUTCMonth();
		const day = date.getUTCDate();
		const year = date.getUTCFullYear();

		return `${monthNames[monthIndex]} ${day} ${year}`;
	}

	function changeTimeFormat(time) {
		const parts = time.split(":");
		let hours = parseInt(parts[0]);
		const minutes = parts[1];

		// Adjust hours for 12 hr format
		const meridiem = hours >= 12 ? "PM" : "AM";
		hours %= 12;
		hours = hours || 12;

		// Add leading zero if hours is a single digit
		const formattedHours = hours < 10 ? "0" + hours : hours;

		return formattedHours + ":" + minutes + " " + meridiem;
	}

    // Takes the tags array, styles and cleans each element
	function tagBuilder(arr) {
		if (!Array.isArray(arr)) {
			return null;
		}

		const uniqueTags = new Set();
		const formattedTags = arr.map((element, index) => {
			if (element) {
				const trimmedTag = element.trim();
				if (!uniqueTags.has(trimmedTag)) {
					uniqueTags.add(trimmedTag);
					return <span key={index}>{trimmedTag}</span>;
				}
			}
			return null;
		});

		return formattedTags;
	}

	useEffect(() => {
		getBrags(user.email);
	}, [props.toggleRefreshList, user.email, getBrags, props.jsonData]);

	return (
		<div className="panel_right">
			{Object.keys(brags).map((date, index) => (
				<div key={index} className="brag_card">
					<div className="date">{formatDate(date)}</div>
					<ul>
						{brags[date].map((bragItem, index) => {
							const {brag_id, brag, created_time} = bragItem;
							return (
								<li key={brag_id}>
									<div className="time">{changeTimeFormat(created_time)}</div> 
									<div className="brag_text">{brag}</div>
									<div className="controls">
										<EditBrag item={bragItem} refreshList={props.toggleRefreshList} />
										<FaTrash className="icon" title="Delete" onClick={() => deleteBrag(brag_id)} />
									</div>
								</li>
							);
						})}
					</ul>

					<div className="tags_wrapper">{tagBuilder(brags[date].tags)}</div>
				</div>
			))}
		</div>
	);
};

export default ListBrags;