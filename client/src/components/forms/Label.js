import React from "react";

function Label(props) {
	return (
		<label htmlFor={props.htmlFor} className="block font-semibold text-sm text-neutral-300">
			{props.value}
		</label>
	);
}

export default Label;
