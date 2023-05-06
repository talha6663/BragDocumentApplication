import React, { useEffect, useState } from 'react';
import { FaTrash } from "react-icons/fa";
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

    // Formats the date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options).replace(',', '');
        return formattedDate;
    }

    return (
        <div className="panel_right">

            {brags.map((item) => (
                <div key={item.brag_id} className="brag_card">
                    <div className="card_header">
                        <h4>{formatDate(item.created_at)}</h4>
                        <div>
                            <EditBrag item={item} refreshList={props.toggleRefreshList} />
                            <FaTrash className="icon" title="Delete" onClick={() => deleteBrag(item.brag_id)} />
                        </div>
                    </div>
                    {item.brag}                      
                    <div className="tags">TAGS: {item.tags}</div>
                </div>
            ))}

        </div>
    );
};

export default ListBrags;