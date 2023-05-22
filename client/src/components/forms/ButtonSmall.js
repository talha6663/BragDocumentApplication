import React from "react";

function ButtonSmall(props) {
	return (
		<button className="m-1 w-full md:w-auto md:mx-2 px-4 font-semibold bg-teal-600 hover:bg-teal-500 text-white rounded-md focus:outline-none" onClick={props.click}>
			{props.value}
		</button>
	);
}

export default ButtonSmall;
