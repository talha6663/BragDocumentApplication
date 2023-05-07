import { useState } from "react";
import InputForm from "./InputForm";
import ListBrags from "./ListBrags";

const ParentComponent = () => {
	const [refreshList, setRefreshList] = useState(false);

	// Refresh state variable
	function toggleRefreshList() {
		setRefreshList(!refreshList);
	}

	return (
		<>
			<InputForm toggleRefreshList={toggleRefreshList} />
			<ListBrags toggleRefreshList={toggleRefreshList} />
		</>
	);
};

export default ParentComponent;
