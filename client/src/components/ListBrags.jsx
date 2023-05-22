import { useCallback, useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import DeleteBrag from './DeleteBrag';
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

	// Formats the date into a more readable format
	function formatDate(dateString) {
		const date = new Date(dateString);
		const monthNames = [
			"January", "February", "March", "April", "May", "June", "July", 
			"August", "September", "October", "November", "December"
		];
		var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const dayOfWeek = date.getUTCDay();
		const monthIndex = date.getUTCMonth();
		const day = date.getUTCDate();
		const year = date.getUTCFullYear();

		return `${dayNames[dayOfWeek]} ${monthNames[monthIndex]} ${day} ${year}`;
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
					return <span key={index} className="flex items-center border-2 bg-slate-200 border-slate-300 text-slate-600 dark:bg-midnight-700 dark:border-midnight-700 dark:text-neutral-300 rounded-full text-xs py-0.5 px-4 ml-2 mb-2">{trimmedTag}</span>;
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
		<div className="md:w-2/3 mx-3 mt-5 md:mt-20 md:mr-20 md:pl-5">
			{Object.keys(brags).map((date, index) => (
				<div key={index} className="bg-transparent whitespace-pre-line mb-3">
					<div className="py-2 px-4 font-semibold uppercase text-center sm:text-left rounded-full bg-slate-300 text-neutral-700 dark:bg-midnight-700 dark:text-neutral-400">{formatDate(date)}</div>
					<ul	>
						{brags[date].map((bragItem, index) => {
							const {brag_id, brag, created_time} = bragItem;
							return (
								<li key={brag_id} className="flex items-stretch group hover:bg-neutral-200 dark:hover:bg-midnight-800 rounded-md px-4 py-0">
									<div className="font-semibold text-xs text-neutral-500 dark:text-midnight-100 whitespace-nowrap uppercase mr-3 pt-1">{changeTimeFormat(created_time)}</div> 
									<div>{brag}</div>
									<div className="flex flex-row ml-auto pt-1">
										<EditBrag item={bragItem} refreshList={props.toggleRefreshList} />
										<DeleteBrag item={bragItem} refreshList={props.toggleRefreshList} />
									</div>
								</li>
							);
						})}
					</ul>

					<div className="flex flex-wrap mt-2 ml-2">{tagBuilder(brags[date].tags)}</div>
				</div>
			))}
		</div>
	);
};

export default ListBrags;