import React from "react";

function ButtonLarge(props) {
	return (
		<button type={props.btnType} onClick={props.click} className="w-full mt-2 p-3 mr-2 last:mr-0 rounded-md bg-orange-800 text-gray-100 font-semibold hover:bg-orange-600 focus:outline-none">
			{props.value}
		</button>
	);
}

export default ButtonLarge;
