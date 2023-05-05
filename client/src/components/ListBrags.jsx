import React, { useEffect, useState } from 'react';
import EditBrag from './EditBrag';

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

    const deleteBrag = async (id) => {
		try {
			await fetch(`http://localhost:5000/brags/${id}`, {
				method: 'DELETE',
			});

			setBrags(brags.filter((brag) => brag.brag_id !== id));
		} catch (err) {
			console.error(err.message);
		}
	};

    useEffect(() => {
		getBrags();
	}, [props.toggleRefreshList]);

    return (
        <div className="panel_right">

            {brags.map((item) => (
                <div key={item.brag_id} className="brag_card">
                    {item.brag}
                    <div className="brag_card_info">
                        <span>CREATED: {item.created_at}</span>
                        <span>TAGS: {item.tags}</span>
                        <span>
                            <EditBrag item={item} refreshList={props.toggleRefreshList} />
                            <button className="btn btn_small" onClick={() => deleteBrag(item.brag_id)}>
                                Delete
                            </button>
                        </span> 
                    </div>
                </div>
            ))}

        </div>
    );
};

export default ListBrags;