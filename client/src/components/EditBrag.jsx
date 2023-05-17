import { useRef, useState } from 'react';
import { FaEdit } from "react-icons/fa";

const EditBrag = ({item, refreshList}) => {

    const [brag, setBrag] = useState(item.brag);
	const [tags, setTags] = useState(item.tags || []);
    const modalRef = useRef(null);

    const updateBrag = async (e) => {
		e.preventDefault();
		try {
			const body = { brag, tags };
			await fetch(`${process.env.REACT_APP_API_URL}/brags/${item.brag_id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
 
			refreshList();
			closeModal();
		} catch (err) {
			console.error(err.message);
		}
	};

	const openModal = () => {
		const modal = modalRef.current;
		if (modal) {
			modal.close();
			modal.showModal();
		}
	};

	const closeModal = () => {
		const modal = modalRef.current;
		if (modal) {
			modal.close();
		}
	};

    return (
        <>
			<FaEdit className="icon" title="Edit Brag" onClick={openModal} />

            <dialog ref={modalRef} className="modal">
				<label htmlFor="brag">Brag about what you've done!</label>
                <textarea className="form_element" rows="10" value={brag} onChange={(e) => setBrag(e.target.value)} />
				<label htmlFor="tags">Tags - Comma separated if multiple</label>
				<input id="tags" className="form_element" placeholder="Eg: mentored, javascript, winning" onChange={(e) => setTags(e.target.value)} value={tags} />
                <div className="button_container">
					<button className="btn" type="button" onClick={(e) => updateBrag(e)}>Save Changes</button>
					<button className="btn" onClick={closeModal}>Close</button>
				</div>
            </dialog>
        </>
    );
}

export default EditBrag;