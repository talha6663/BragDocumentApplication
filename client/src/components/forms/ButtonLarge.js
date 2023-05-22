import React from "react";

function ButtonLarge(props) {
	return (
		<button type={props.btnType} onClick={props.click} className="w-full mt-2 p-3 mr-2 last:mr-0 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-500 focus:outline-none">
			{props.value}
		</button>
	);
}

export default ButtonLarge;
