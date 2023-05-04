import React, { useEffect, useState } from 'react';

const ListBrags = (props) => {

    const [brags, setBrags] = useState([]);

    const getBrags = async () => {
		try {
			const response = await fetch('http://localhost:5000/brags');
			const jsonData = await response.json();

			setBrags(jsonData);
		} catch (err) {
			console.error(err.message);
		}
	};

    useEffect(() => {
		getBrags();
	}, [props.refreshList]);

    return (
        <div className="panel_right">

            <ul>
                {brags.map((item) => (
                    <span key={item.brag_id}>
                        <li>{item.brag}</li>
                    </span>
                ))}
            </ul>

        </div>
    );
};

export default ListBrags;