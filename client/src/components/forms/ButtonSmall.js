import React from "react";

function ButtonSmall(props) {
	return (
		<button className="mx-2 px-4 font-semibold bg-teal-600 hover:bg-teal-500 text-white rounded-md focus:outline-none" onClick={props.click}>
			{props.value}
		</button>
	);
}

export default ButtonSmall;
