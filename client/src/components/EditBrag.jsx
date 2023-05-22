import { useRef, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import ButtonLarge from './forms/ButtonLarge';
import Label from './forms/Label';

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
			<FaEdit className="mt-[2px] w-3 h-3 md:text-slate-50 group-hover:text-slate-600 dark:text-midnight-900 dark:group-hover:text-midnight-100 ml-3 cursor-pointer" title="Edit Brag" onClick={openModal} />

            <dialog ref={modalRef} className="p-4 w-[500px] bg-slate-50 border-slate-500 dark:bg-midnight-900 dark:border-midnight-800 rounded-md border-4">
				<Label htmlFor={"brag"} value={"Brag about what you've done!"} />
                <textarea className="mb-3 p-3 w-full bg-slate-200 border-2 rounded-md border-slate-300 dark:bg-midnight-800 dark:border-midnight-800 dark:text-midnight-100 focus:outline-none" rows="10" value={brag} onChange={(e) => setBrag(e.target.value)} />
				<Label htmlFor={"tags"} value={"Tags - Comma separated if multiple"} />
				<input id="tags" className="p-3 w-full bg-slate-200 border-2 rounded-md border-slate-300 dark:bg-midnight-800 dark:border-midnight-800 dark:text-midnight-100 focus:outline-none" placeholder="Eg: mentored, javascript, winning" onChange={(e) => setTags(e.target.value)} value={tags} />
                <div className="flex flex-row justify-between">
					<ButtonLarge btnType={"button"} value={"Save"} click={(e) => updateBrag(e)} />
					<ButtonLarge value={"Close"} click={closeModal} />
				</div>
            </dialog>
        </>
    );
}

export default EditBrag;