import { useState } from "react";
import InputForm from "./InputForm";
import ListBrags from "./ListBrags";
import Navbar from "./Navbar";

const ParentComponent = () => {
	const [refreshList, setRefreshList] = useState(false);
	const [jsonData, setJsonData] = useState(null);

	// Refresh state variable
	function toggleRefreshList() {
		setRefreshList(!refreshList);
	}

	// Process the jsonData in your ListBrags component
	const handleSearchResult = (jsonData) => {
		setJsonData(jsonData);
		toggleRefreshList();
	};

	return (
		<>
			<Navbar handleSearchResult={handleSearchResult} />

			<div className="flex flex-col grow md:flex-row">
				<InputForm toggleRefreshList={toggleRefreshList} />
				<ListBrags toggleRefreshList={toggleRefreshList} jsonData={jsonData} />
			</div>
		</>
	);
};

export default ParentComponent;
