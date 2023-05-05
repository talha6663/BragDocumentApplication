import React, { useRef, useState } from 'react';

const EditBrag = ({item, refreshList}) => {

    const [brag, setBrag] = useState(item.brag);
    const modalRef = useRef(null);

    const updateBrag = async (e) => {
		e.preventDefault();
		try {
			const body = { brag };
			await fetch(`http://localhost:5000/brags/${item.brag_id}`, {
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
            <button className="btn btn_small" onClick={openModal}>Edit</button>

            <dialog ref={modalRef}>
                <textarea className="form_element" rows="14" value={brag} onChange={(e) => setBrag(e.target.value)} />
                <div className="button_container">
					<button className="btn" type="button" onClick={(e) => updateBrag(e)}>Save</button>
					<button className="btn" onClick={closeModal}>Close</button>
				</div>
            </dialog>
        </>
    );
}

export default EditBrag;