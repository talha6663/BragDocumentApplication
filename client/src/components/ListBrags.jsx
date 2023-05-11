import { useEffect, useState } from 'react';
import { FaTrash } from "react-icons/fa";
import { UserAuth } from '../context/AuthContext';
import EditBrag from './EditBrag';

const ListBrags = (props) => {
    
    const [brags, setBrags] = useState([]);
    const {user} = UserAuth();

    const getBrags = async (email) => {
		try {
			const response = await fetch(`http://localhost:5000/brags?userEmail=${email}`);
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
		getBrags(user.email);
	}, [props.toggleRefreshList, user.email]);

    // Formats the date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options).replace(',', '');
        return formattedDate;
    }

    // Takes the tags array, styles and cleans each element
    function formatTags(arr) {
        const str = arr.map(element => `<span>${element.trim()}</span>`).join('');
        return <div dangerouslySetInnerHTML={{__html: str}}></div>;
    }

    return (
        <div className="panel_right">

            {brags.map((item) => (
                <div key={item.brag_id} className="brag_card">
                    <div className="card_header">
                        <div className="date">{formatDate(item.created_at)}</div>
                        <div>
                            <EditBrag item={item} refreshList={props.toggleRefreshList} />
                            <FaTrash className="icon" title="Delete" onClick={() => deleteBrag(item.brag_id)} />
                        </div>
                    </div>
                    <div className="brag_text">{item.brag}</div>
                    <div className="tags_wrapper">TAGS {formatTags(item.tags)}</div>
                </div>
            ))}

        </div>
    );
};

export default ListBrags;