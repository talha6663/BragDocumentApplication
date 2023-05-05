import React, { useState } from 'react';
import InputForm from './InputForm';
import ListBrags from './ListBrags';

const ParentComponent = () => {
	const [refreshList, setRefreshList] = useState(false);

	// Function to toggle the refresh state variable
	function toggleRefreshList() {
		setRefreshList(!refreshList);
	}

	return (
		<>
			<InputForm toggleRefreshList={toggleRefreshList} />
			{/* <ListBrags refreshList={refreshList} /> */}
			<ListBrags toggleRefreshList={toggleRefreshList} />
		</>
	);
};

export default ParentComponent;
