// import { useRef, useState } from 'react';
// import { FaEdit } from "react-icons/fa";
// import ButtonLarge from './forms/ButtonLarge';
// import Label from './forms/Label';

// const EditBrag = ({item, refreshList}) => {

//     const [brag, setBrag] = useState(item.brag);
// 	const [tags, setTags] = useState(item.tags || []);
//     const modalRef = useRef(null);

//     const updateBrag = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const body = { brag, tags };
// 			if (!item.brag_id) {
// 				console.error('brag_id is undefined');
// 				return;
// 			  }
// 			await fetch(`http://localhost:5000/brags/${item.brag_id}`, {
// 				method: 'PUT',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify(body),
// 			});
 
// 			refreshList();
// 			closeModal();
// 		} catch (err) {
// 			console.error(err.message);
// 		}
// 	};

// 	const openModal = () => {
// 		const modal = modalRef.current;
// 		if (modal) {
// 			modal.close();
// 			modal.showModal();
// 		}
// 	};

// 	const closeModal = () => {
// 		const modal = modalRef.current;
// 		if (modal) {
// 			modal.close();
// 		}
// 	};

//     return (
//         <>
// 			<FaEdit className="mt-[2px] w-3 h-3 lg:text-slate-50 group-hover:text-slate-600 lg:dark:text-midnight-900 dark:group-hover:text-midnight-100 ml-3 cursor-pointer" title="Edit Brag" onClick={openModal} />

//             <dialog ref={modalRef} className="p-4 w-[500px] bg-slate-50 border-slate-500 dark:bg-midnight-900 dark:border-midnight-800 rounded-md border-4">
// 				<p className="text-center text-xl font-bold text-neutral-600 dark:text-neutral-300 mb-2">Edit Brag</p>
// 				<Label htmlFor={"brag"} value={"Brag about what you've done!"} />
//                 <textarea className="mb-3 p-3 w-full bg-slate-200 border-2 rounded-md border-slate-300 dark:bg-midnight-800 dark:border-midnight-800 dark:text-neutral-300 focus:outline-none" rows="10" value={brag} onChange={(e) => setBrag(e.target.value)} />
// 				<Label htmlFor={"tags"} value={"Tags - Comma separated if multiple"} />
// 				<input id="tags" className="p-3 w-full bg-slate-200 border-2 rounded-md border-slate-300 dark:bg-midnight-800 dark:border-midnight-800 dark:text-neutral-300 focus:outline-none" placeholder="Eg: mentored, javascript, winning" onChange={(e) => setTags(e.target.value)} value={tags} />
//                 <div className="flex flex-row justify-between mt-2">
// 					<ButtonLarge btnType={"button"} value={"Save"} click={(e) => updateBrag(e)} />
// 					<ButtonLarge value={"Close"} click={closeModal} />
// 				</div>
//             </dialog>
//         </>
//     );
// }

// export default EditBrag;

import { useRef, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import ButtonLarge from './forms/ButtonLarge';
import Label from './forms/Label';

const EditBrag = ({ item, refreshList }) => {
  // Initialize brag and tags state
  const [brag, setBrag] = useState(item.brag);
  const [tags, setTags] = useState(item.tags ? item.tags.join(", ") : ""); // Convert tags array to a string
  const modalRef = useRef(null);

  // Function to update the brag
  const updateBrag = async (e) => {
    e.preventDefault();
    try {
      const body = {
        brag,
        tags: tags.split(",").map(tag => tag.trim()) // Convert the comma-separated string to an array
      };
      
      if (!item._id) {
        console.error('brag_id is undefined');
        return;
      }

      // Make a PUT request to update the brag
      await fetch(`http://localhost:5000/brags/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      refreshList(); // Refresh the list after updating
      closeModal(); // Close the modal after update
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function to open the modal
  const openModal = () => {
    const modal = modalRef.current;
    if (modal) {
      modal.close();
      modal.showModal();
    }
  };

  // Function to close the modal
  const closeModal = () => {
    const modal = modalRef.current;
    if (modal) {
      modal.close();
    }
  };

  return (
    <>
      <FaEdit
        className="mt-[2px] w-3 h-3 lg:text-slate-50 group-hover:text-slate-600 lg:dark:text-midnight-900 dark:group-hover:text-midnight-100 ml-3 cursor-pointer"
        title="Edit Brag"
        onClick={openModal}
      />

      <dialog ref={modalRef} className="p-4 w-[500px] bg-slate-50 border-slate-500 dark:bg-midnight-900 dark:border-midnight-800 rounded-md border-4">
        <p className="text-center text-xl font-bold text-neutral-600 dark:text-neutral-300 mb-2">
          Edit Brag
        </p>
        <Label htmlFor={"brag"} value={"Brag about what you've done!"} />
        <textarea
          className="mb-3 p-3 w-full bg-slate-200 border-2 rounded-md border-slate-300 dark:bg-midnight-800 dark:border-midnight-800 dark:text-neutral-300 focus:outline-none"
          rows="10"
          value={brag}
          onChange={(e) => setBrag(e.target.value)}
        />
        <Label htmlFor={"tags"} value={"Tags - Comma separated if multiple"} />
        <input
          id="tags"
          className="p-3 w-full bg-slate-200 border-2 rounded-md border-slate-300 dark:bg-midnight-800 dark:border-midnight-800 dark:text-neutral-300 focus:outline-none"
          placeholder="Eg: mentored, javascript, winning"
          onChange={(e) => setTags(e.target.value)}
          value={tags}
        />
        <div className="flex flex-row justify-between mt-2">
          <ButtonLarge
            btnType={"button"}
            value={"Save"}
            click={(e) => updateBrag(e)}
          />
          <ButtonLarge value={"Close"} click={closeModal} />
        </div>
      </dialog>
    </>
  );
};

export default EditBrag;
