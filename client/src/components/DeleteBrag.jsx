// import { useRef } from 'react';
// import { FaTrash } from "react-icons/fa";
// import ButtonLarge from './forms/ButtonLarge';

// const DeleteBrag = ({item, refreshList}) => {
//     const modalRef = useRef(null);

//     const deleteBrag = async (id) => {
// 		if (!id) {
// 			console.error("Brag ID is undefined");
// 			return;
// 		  };
// 		//   const deleteBrag = async (id) => {
// 		// 	if (!item || !item.brag_id) {
// 		// 	  console.error("Item or brag ID is undefined");
// 		// 	  return;
// 		// 	}
// 		try {
// 			await fetch(`http://localhost:5000/brags/${item.brag_id}`, {
// 				method: 'DELETE',
// 			});
			

// 			// Create a copy of the brags state object
// 			const updatedBrags = {...item.brags};

// 			// Loop through each date key in the object
// 			Object.keys(updatedBrags).forEach(date => {
// 				// Filter out the deleted brag from the array for the current date as well as tags
// 				updatedBrags[date] = updatedBrags[date].filter(brag => brag.brag_id !== id);
// 				updatedBrags[date].tags = updatedBrags[date].map((brag) => brag.tags).flat();
// 			});

//         refreshList();
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
// 			<FaTrash className="mt-[2px] w-3 h-3 lg:text-slate-50 group-hover:text-slate-600 lg:dark:text-midnight-900 dark:group-hover:text-midnight-100 ml-1 lg:ml-3 cursor-pointer" title="Edit Brag" onClick={openModal} />

//             <dialog ref={modalRef} className="p-4 w-[500px] bg-slate-50 border-slate-500 dark:bg-midnight-900 dark:border-midnight-800 rounded-md border-4">
                
//                 <p className="text-center text-xl font-bold text-neutral-600 dark:text-neutral-300 mb-2">Delete the following brag?</p>

//                 <p className="text-center truncate mb-2 p-3 border-2 rounded-md border-neutral-300 text-neutral-600 dark:bg-midnight-700 dark:border-midnight-700 dark:text-neutral-200">{item.brag}</p>

//                 <p className="text-center font-bold text-red-600 dark:text-red-500">This cannot be reversed!</p>
                
//                 <div className="flex flex-row justify-between">
// 					<ButtonLarge btnType={"button"} value={"Delete"} click={() => deleteBrag(item.brag_id)}/>
// 					{/* <ButtonLarge btnType={"button"} value={"Delete"} click={deleteBrag} /> */}
// 					<ButtonLarge value={"Close"} click={closeModal} />
// 				</div>
//             </dialog>
//         </>
//     );
// }

// export default DeleteBrag;
import { useRef } from 'react';
import { FaTrash } from "react-icons/fa";
import ButtonLarge from './forms/ButtonLarge';

const DeleteBrag = ({ item, refreshList }) => {
  const modalRef = useRef(null);

  const deleteBrag = async () => {
    if (!item || !item.brag_id) {
      console.error("Item or brag ID is undefined");
      return;
    }

    try {
      await fetch(`http://localhost:5000/brags/${item.brag_id}`, {
        method: 'DELETE',
      });

      // Create a copy of the brags state object
      const updatedBrags = { ...item.brags };

      // Loop through each date key in the object
      Object.keys(updatedBrags).forEach(date => {
        // Filter out the deleted brag from the array for the current date as well as tags
        updatedBrags[date] = updatedBrags[date].filter(brag => brag.brag_id !== item.brag_id);
        updatedBrags[date].tags = updatedBrags[date].map((brag) => brag.tags).flat();
      });

      refreshList();
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
      <FaTrash className="mt-[2px] w-3 h-3 lg:text-slate-50 group-hover:text-slate-600 lg:dark:text-midnight-900 dark:group-hover:text-midnight-100 ml-1 lg:ml-3 cursor-pointer" title="Edit Brag" onClick={openModal} />

      <dialog ref={modalRef} className="p-4 w-[500px] bg-slate-50 border-slate-500 dark:bg-midnight-900 dark:border-midnight-800 rounded-md border-4">
        <p className="text-center text-xl font-bold text-neutral-600 dark:text-neutral-300 mb-2">Delete the following brag?</p>

        <p className="text-center truncate mb-2 p-3 border-2 rounded-md border-neutral-300 text-neutral-600 dark:bg-midnight-700 dark:border-midnight-700 dark:text-neutral-200">{item.brag}</p>

        <p className="text-center font-bold text-red-600 dark:text-red-500">This cannot be reversed!</p>

        <div className="flex flex-row justify-between">
          <ButtonLarge btnType={"button"} value={"Delete"} click={deleteBrag} />
          <ButtonLarge value={"Close"} click={closeModal} />
        </div>
      </dialog>
    </>
  );
};

export default DeleteBrag;