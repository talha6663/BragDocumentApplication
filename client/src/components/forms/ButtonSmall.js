import React from "react";

function ButtonSmall(props) {
	return (
		<button className="mx-2 px-4 bg-orange-600 hover:bg-orange-800 text-gray-100 hover:text-gray-200 rounded-md" onClick={props.click}>
			{props.value}
		</button>
	);
}

export default ButtonSmall;
