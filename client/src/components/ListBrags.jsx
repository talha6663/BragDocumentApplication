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
					return <span key={index} className="flex items-center border-2 bg-slate-200 border-slate-300 text-slate-600 dark:bg-slate-700 dark:border-slate-700 dark:text-slate-400 rounded-md text-xs py-0.5 px-4 ml-2 mb-2">{trimmedTag}</span>;
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
		<div className="w-2/3 mt-20 mr-20 pl-5">
			{Object.keys(brags).map((date, index) => (
				<div key={index} className="bg-transparent whitespace-pre-line mb-3">
					<div className="py-2 px-4 font-semibold uppercase rounded-md bg-slate-400 text-neutral-700 dark:bg-slate-700 dark:text-neutral-400">{formatDate(date)}</div>
					<ul	>
						{brags[date].map((bragItem, index) => {
							const {brag_id, brag, created_time} = bragItem;
							return (
								<li key={brag_id} className="flex items-stretch group hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md px-4 py-1">
									<div className="font-semibold text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap uppercase mr-3 pt-1">{changeTimeFormat(created_time)}</div> 
									<div>{brag}</div>
									<div className="flex flex-row ml-auto pt-1">
										<EditBrag item={bragItem} refreshList={props.toggleRefreshList} />
										<FaTrash className="text-slate-50 group-hover:text-slate-600 dark:text-zinc-950 dark:group-hover:text-slate-400 ml-3 cursor-pointer" title="Delete" onClick={() => deleteBrag(brag_id)} />
									</div>
								</li>
							);
						})}
					</ul>

					<div className="flex flex-wrap mt-2 ml-4">{tagBuilder(brags[date].tags)}</div>
				</div>
			))}
		</div>
	);
};

export default ListBrags;