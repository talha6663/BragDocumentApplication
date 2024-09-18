// import { useCallback, useEffect, useState } from 'react';
// import { UserAuth } from '../context/AuthContext';
// import DeleteBrag from './DeleteBrag';
// import EditBrag from './EditBrag';
// import { ObjectId } from 'mongodb';

// const ListBrags = (props) => {
//     const [brags, setBrags] = useState({});
//     const { user } = UserAuth();

//     // Fetch brags from the server
//     const getBrags = useCallback(async (email) => {
//         try {
//             const response = await fetch(`http://localhost:5000/brags?userEmail=${email}`);
            
//             // Check for response status
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
            
//             const jsonData = await response.json();
//             console.log('jsonData:', jsonData); // Debugging response data

//             let bragsObject = {};
//             jsonData.forEach((arrayItem) => {
//                 const date = arrayItem.created_date;
//                 const { brag_id, brag, tags, created_time } = arrayItem;

//                 if (!bragsObject[date]) {
//                     bragsObject[date] = [];
//                 }
                
//                 bragsObject[date].push({ brag_id, brag, tags, created_time });
//             });

//             setBrags(bragsObject);
//         } catch (err) {
//             console.error('Error fetching brags:', err.message);
//         }
//     }, []);

//     // Format date into a more readable format
//     // function formatDate(dateString) {
//     //     const date = new Date(dateString);
//     //     const monthNames = [
//     //         "January", "February", "March", "April", "May", "June", "July", 
//     //         "August", "September", "October", "November", "December"
//     //     ];
//     //     const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     //     const dayOfWeek = date.getUTCDay();
//     //     const monthIndex = date.getUTCMonth();
//     //     const day = date.getUTCDate();
//     //     const year = date.getUTCFullYear();

//     //     return `${dayNames[dayOfWeek]} ${monthNames[monthIndex]} ${day} ${year}`;
//     // }

//     // Convert time to 12-hour format
//     function changeTimeFormat(time) {
//         if (!time) return '';
//         const [hours, minutes] = time.split(":").map(Number);
//         const meridiem = hours >= 12 ? "PM" : "AM";
//         const formattedHours = ((hours % 12) || 12).toString().padStart(2, '0');
//         return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
//     }

//     // Render tags as styled components
//     function tagBuilder(arr) {
//         if (!Array.isArray(arr)) return null;

//         const uniqueTags = new Set();
//         return arr.map((element, index) => {
//             if (element) {
//                 const trimmedTag = element.trim();
//                 if (!uniqueTags.has(trimmedTag)) {
//                     uniqueTags.add(trimmedTag);
//                     return <span key={index} className="flex items-center border-2 bg-slate-200 border-slate-300 text-slate-600 dark:bg-midnight-700 dark:border-midnight-700 dark:text-neutral-300 rounded-full text-xs py-0.5 px-4 ml-2 mb-2">{trimmedTag}</span>;
//                 }
//             }
//             return null;
//         });
//     }
//     const { toggleRefreshList } = props;

//     useEffect(() => {
//       getBrags(user.email);
//       // toggleRefreshList(true); // Use the destructured prop here
//     }, [user.email, getBrags, toggleRefreshList]);
//     // return (
//     //   <div className="lg:w-2/3 mx-3 mt-5 md:mt-20 lg:mr-20 lg:pl-5">
//     //     {Object.keys(brags).length === 0 ? (
//     //       <p>No brags to display</p>
//     //     ) : (
//     //       Object.keys(brags).map((date, index) => (
//     //         <div key={index} className="bg-transparent whitespace-pre-line mb-3">
//     //           {/* <div className="py-2 px-4 font-semibold uppercase text-center sm:text-left rounded-full bg-slate-300 text-neutral-700 dark:bg-midnight-700 dark:text-neutral-400">{formatDate(date)}</div> */}
//     //           <ul>
//     //             {brags[date].map((bragItem) => (
//     //               <li key={bragItem.brag_id} className="flex items-stretch group hover:bg-neutral-200 dark:hover:bg-midnight-800 rounded-md px-4 py-0">
//     //                 <div className="flex flex-col w-full p-4 border border-neutral-200 dark:border-midnight-700 rounded-md">
//     //                   <div className="flex justify-between mb-2">
//     //                     <div className="font-semibold text-xs text-neutral-500 dark:text-midnight-100 whitespace-nowrap uppercase">{changeTimeFormat(bragItem.created_time)}</div>
//     //                     <div className="flex flex-row ml-auto">
//     //                       <EditBrag item={bragItem} refreshList={toggleRefreshList} />
//     //                       <DeleteBrag item={bragItem} refreshList={toggleRefreshList} />
//     //                     </div>
//     //                   </div>
//     //                   <div className="text-lg">{bragItem.brag}</div>
//     //                   <div className="flex flex-wrap mt-2">
//     //                     {tagBuilder(bragItem.tags)}
//     //                   </div>
//     //                 </div>
//     //               </li>
//     //             ))}
//     //           </ul>
//     //         </div>
//     //       ))
//     //     )}
//     //   </div>
//     // );
//     return (
//       <div className="lg:w-2/3 mx-3 mt-5 md:mt-20 lg:mr-20 lg:pl-5">
//         {Object.keys(brags).length === 0 ? (
//           <p>No brags to display</p>
//         ) : (
//           Object.keys(brags).map((date, index) => (
//             <div key={index} className="bg-transparent whitespace-pre-line mb-3">
//               {/* <div className="py-2 px-4 font-semibold uppercase text-center sm:text-left rounded-full bg-slate-300 text-neutral-700 dark:bg-midnight-700 dark:text-neutral-400">{formatDate(date)}</div> */}
//               <ul>
//                 {brags[date].map((bragItem, index) => (
//                   <li key={index} className="flex items-stretch group hover:bg-neutral-200 dark:hover:bg-midnight-800 rounded-md px-4 py-0">
//                     <div className="flex flex-col w-full p-4 border border-neutral-200 dark:border-midnight-700 rounded-md">
//                       <div className="flex justify-between mb-2">
//                         <div className="font-semibold text-xs text-neutral-500 dark:text-midnight-100 whitespace-nowrap uppercase">{changeTimeFormat(bragItem.created_time)}</div>
//                         <div className="flex flex-row ml-auto">
//                           <EditBrag item={{ ...bragItem, brag_id: index }} refreshList={toggleRefreshList} />
//                           <DeleteBrag item={{ ...bragItem, brag_id: index }} refreshList={toggleRefreshList} />
//                         </div>
//                       </div>
//                       <div className="text-lg">{bragItem.brag}</div>
//                       <div className="flex flex-wrap mt-2">
//                         {tagBuilder(bragItem.tags)}
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         )}
//       </div>
//     );
// };

// export default ListBrags;

import { useCallback, useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import DeleteBrag from './DeleteBrag';
import EditBrag from './EditBrag';

const ListBrags = (props) => {
  const [brags, setBrags] = useState({});
  const { user } = UserAuth();

  // Fetch brags from the server
  const getBrags = useCallback(async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/brags?userEmail=${email}`);
      
      // Check for response status
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const jsonData = await response.json();
      console.log('jsonData:', jsonData); // Debugging response data

      let bragsObject = {};
      jsonData.forEach((arrayItem) => {
        const date = arrayItem.created_date;
        const { _id, brag, tags, created_time } = arrayItem;

        if (!bragsObject[date]) {
          bragsObject[date] = [];
        }
        
        bragsObject[date].push({ _id, brag, tags, created_time });
      });

      setBrags(bragsObject);
    } catch (err) {
      console.error('Error fetching brags:', err.message);
    }
  }, []);

  // Convert time to 12-hour format
  function changeTimeFormat(time) {
    if (!time) return '';
    const [hours, minutes] = time.split(":").map(Number);
    const meridiem = hours >= 12 ? "PM" : "AM";
    const formattedHours = ((hours % 12) || 12).toString().padStart(2, '0');
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
  }

  // Render tags as styled components
  function tagBuilder(arr) {
    if (!Array.isArray(arr)) return null;

    const uniqueTags = new Set();
    return arr.map((element, index) => {
      if (element) {
        const trimmedTag = element.trim();
        if (!uniqueTags.has(trimmedTag)) {
          uniqueTags.add(trimmedTag);
          return <span key={index} className="flex items-center border-2 bg-slate-200 border-slate-300 text-slate-600 dark:bg-midnight-700 dark:border-midnight-700 dark:text-neutral-300 rounded-full text-xs py-0.5 px-4 ml-2 mb-2">{trimmedTag}</span>;
        }
      }
      return null;
    });
  }
  const { toggleRefreshList } = props;

  useEffect(() => {
    getBrags(user.email);
    // toggleRefreshList(true); // Use the destructured prop here
  }, [user.email, getBrags, toggleRefreshList]);
  return (
    <div className="lg:w-2/3 mx-3 mt-5 md:mt-20 lg:mr-20 lg:pl-5">
      {Object.keys(brags).length === 0 ? (
        <p>No brags to display</p>
      ) : (
        Object.keys(brags).map((date, index) => (
          <div key={index} className="bg-transparent whitespace-pre-line mb-3">
            <ul>
              {brags[date].map((bragItem) => (
                <li key={bragItem._id} className="flex items-stretch group hover:bg-neutral-200 dark:hover:bg-midnight-800 rounded-md px-4 py-0">
                  <div className="flex flex-col w-full p-4 border border-neutral-200 dark:border-midnight-700 rounded-md">
                    <div className="flex justify-between mb-2">
                      <div className="font-semibold text-xs text-neutral-500 dark:text-midnight-100 whitespace-nowrap uppercase">{changeTimeFormat(bragItem.created_time)}</div>
                      <div className="flex flex-row ml-auto">
                        <EditBrag item={bragItem} refreshList={toggleRefreshList} />
                        <DeleteBrag item={bragItem} refreshList={toggleRefreshList} />
                      </div>
                    </div>
                    <div className="text-lg">{bragItem.brag}</div>
                    <div className="flex flex-wrap mt-2">
                      {tagBuilder(bragItem.tags)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ListBrags;

