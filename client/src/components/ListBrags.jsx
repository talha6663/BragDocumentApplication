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

            {brags.map((item) => (
                <div key={item.brag_id} className="brag_card">
                    {item.brag}
                    <div className="brag_card_info">
                        <span>TAGS: {item.tags}</span>
                        <span>CREATED: {item.created_at}</span>    
                    </div>
                </div>
            ))}

        </div>
    );
};

export default ListBrags;