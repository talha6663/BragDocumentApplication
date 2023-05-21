import React from "react";

function ButtonSmall(props) {
	return (
		<button className="mx-2 px-4 font-semibold bg-orange-800 hover:bg-orange-600 text-gray-100 hover:text-gray-200 rounded-md focus:outline-none" onClick={props.click}>
			{props.value}
		</button>
	);
}

export default ButtonSmall;
