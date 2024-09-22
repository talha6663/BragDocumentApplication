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

// import { useCallback, useEffect, useState } from 'react';
// import { UserAuth } from '../context/AuthContext';
// import DeleteBrag from './DeleteBrag';
// import EditBrag from './EditBrag';

// const ListBrags = (props) => {
//   const [brags, setBrags] = useState({});
//   const { user } = UserAuth();

//   // Fetch brags from the server
//   const getBrags = useCallback(async (email) => {
//     try {
//       const response = await fetch(`http://localhost:5000/brags?userEmail=${email}`);
      
//       // Check for response status
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
      
//       const jsonData = await response.json();
//       console.log('jsonData:', jsonData); // Debugging response data

//       let bragsObject = {};
//       jsonData.forEach((arrayItem) => {
//         const date = arrayItem.created_date;
//         const { _id, brag, tags, created_time } = arrayItem;

//         if (!bragsObject[date]) {
//           bragsObject[date] = [];
//         }
        
//         bragsObject[date].push({ _id, brag, tags, created_time });
//       });

//       setBrags(bragsObject);
//     } catch (err) {
//       console.error('Error fetching brags:', err.message);
//     }
//   }, []);

//   // Convert time to 12-hour format
//   function changeTimeFormat(time) {
//     if (!time) return '';
//     const [hours, minutes] = time.split(":").map(Number);
//     const meridiem = hours >= 12 ? "PM" : "AM";
//     const formattedHours = ((hours % 12) || 12).toString().padStart(2, '0');
//     return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
//   }

//   // Render tags as styled components
//   function tagBuilder(arr) {
//     if (!Array.isArray(arr)) return null;

//     const uniqueTags = new Set();
//     return arr.map((element, index) => {
//       if (element) {
//         const trimmedTag = element.trim();
//         if (!uniqueTags.has(trimmedTag)) {
//           uniqueTags.add(trimmedTag);
//           return <span key={index} className="flex items-center border-2 bg-slate-200 border-slate-300 text-slate-600 dark:bg-midnight-700 dark:border-midnight-700 dark:text-neutral-300 rounded-full text-xs py-0.5 px-4 ml-2 mb-2">{trimmedTag}</span>;
//         }
//       }
//       return null;
//     });
//   }
//   const { toggleRefreshList } = props;

//   useEffect(() => {
//     getBrags(user.email);
//     // toggleRefreshList(true); // Use the destructured prop here
//   }, [user.email, getBrags, toggleRefreshList]);
//   return (
//     <div className="lg:w-2/3 mx-3 mt-5 md:mt-20 lg:mr-20 lg:pl-5">
//       {Object.keys(brags).length === 0 ? (
//         <p>No brags to display</p>
//       ) : (
//         Object.keys(brags).map((date, index) => (
//           <div key={index} className="bg-transparent whitespace-pre-line mb-3">
//             <ul>
//               {brags[date].map((bragItem) => (
//                 <li key={bragItem._id} className="flex items-stretch group hover:bg-neutral-200 dark:hover:bg-midnight-800 rounded-md px-4 py-0">
//                   <div className="flex flex-col w-full p-4 border border-neutral-200 dark:border-midnight-700 rounded-md">
//                     <div className="flex justify-between mb-2">
//                       <div className="font-semibold text-xs text-neutral-500 dark:text-midnight-100 whitespace-nowrap uppercase">{changeTimeFormat(bragItem.created_time)}</div>
//                       <div className="flex flex-row ml-auto">
//                         <EditBrag item={bragItem} refreshList={toggleRefreshList} />
//                         <DeleteBrag item={bragItem} refreshList={toggleRefreshList} />
//                       </div>
//                     </div>
//                     <div className="text-lg">{bragItem.brag}</div>
//                     <div className="flex flex-wrap mt-2">
//                       {tagBuilder(bragItem.tags)}
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ListBrags;

// import { useCallback, useEffect, useState } from 'react';
// import { UserAuth } from '../context/AuthContext';
// import DeleteBrag from './DeleteBrag';
// import EditBrag from './EditBrag';
// import { AiOutlineSearch } from "react-icons/ai";

// const ListBrags = (props) => {
//   const [brags, setBrags] = useState({});
//   const [searchValue, setSearchValue] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const { user } = UserAuth();

//   // Fetch brags from the server
//   const getBrags = useCallback(async (email) => {
//     try {
//       const response = await fetch(`http://localhost:5000/brags?userEmail=${email}`);

//       // Check for response status
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const jsonData = await response.json();
//       console.log('jsonData:', jsonData); // Debugging response data

//       let bragsObject = {};
//       jsonData.forEach((arrayItem) => {
//         const date = arrayItem.created_date;
//         const { _id, brag, tags, created_time } = arrayItem;

//         if (!bragsObject[date]) {
//           bragsObject[date] = [];
//         }

//         bragsObject[date].push({ _id, brag, tags, created_time });
//       });

//       setBrags(bragsObject);
//     } catch (err) {
//       console.error('Error fetching brags:', err.message);
//     }
//   }, []);

//   // Convert time to 12-hour format
//   function changeTimeFormat(time) {
//     if (!time) return '';
//     const [hours, minutes] = time.split(":").map(Number);
//     const meridiem = hours >= 12 ? "PM" : "AM";
//     const formattedHours = ((hours % 12) || 12).toString().padStart(2, '0');
//     return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
//   }

//   // Render tags as styled components
//   function tagBuilder(arr) {
//     if (!Array.isArray(arr)) return null;

//     const uniqueTags = new Set();
//     return arr.map((element, index) => {
//       if (element) {
//         const trimmedTag = element.trim();
//         if (!uniqueTags.has(trimmedTag)) {
//           uniqueTags.add(trimmedTag);
//           return <span key={index} className="flex items-center border-2 bg-slate-200 border-slate-300 text-slate-600 dark:bg-midnight-700 dark:border-midnight-700 dark:text-neutral-300 rounded-full text-xs py-0.5 px-4 ml-2 mb-2">{trimmedTag}</span>;
//         }
//       }
//       return null;
//     });
//   }

//   const { toggleRefreshList } = props;

//   useEffect(() => {
//     getBrags(user.email);
//     // toggleRefreshList(true); // Use the destructured prop here
//   }, [user.email, getBrags, toggleRefreshList]);

//   const handleChange = (e) => {
//     setSearchValue(e.target.value);
//   }

//   const handleKeyUp = async (e) => {
//     if (e.key === 'Enter') {
//       await search();
//     }
//   };

//   const search = async () => {
//     try {
//       const userEmail = encodeURIComponent(user.email);
//       const searchString = encodeURIComponent(searchValue);
//       console.log(`Searching for ${searchString}...`);
//       const response = await fetch(
//         `http://localhost:5000/search?userEmail=${userEmail}&searchstring=${searchString}`,
//         {
//           method: 'GET',
//         }
//       );
//       const jsonData = await response.json();
//       console.log(`Search results:`, jsonData);

//       if (!jsonData || !Array.isArray(jsonData)) {
//         console.error('Invalid response data');
//         return;
//       }

//       const filteredResults = jsonData.filter((brag) => {
//         return (brag.title && brag.title.toLowerCase().includes(searchString.toLowerCase())) ||
//                (brag.description && brag.description.toLowerCase().includes(searchString.toLowerCase()));
//       });

//       console.log(`Filtered results:`, filteredResults);
//       setSearchResults(filteredResults);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <div className="lg:w-2/3 mx-3 mt-5 md:mt-20 lg:mr-20 lg:pl-5">
//       <div className="hidden sm:flex p-0 sm:w-96 items-center border-2 rounded-full text-slate-600 bg-slate-200 border-slate-300 dark:border-teal-600 dark:bg-midnight-700 mb-5 ml-10">
//         <input type="text" className="w-full bg-transparent border-transparent px-4 py-1 placeholder:text-slate-600 text-slate-600 dark:placeholder:text-neutral-400 dark:text-neutral-200 focus:outline-none" value={searchValue} onChange={handleChange} onKeyUp={handleKeyUp} placeholder="Search" />
//         <AiOutlineSearch onClick={search} className="w-6 h-6 text-slate-600 dark:text-neutral-400 cursor-pointer mr-3" title="Search" alt="search" />
//       </div>
//       {searchResults.length > 0 ? (
//         <div>
//           {searchResults.map((brag, index) => (
//             <div key={index}>{brag.title}</div>
//           ))}
//         </div>
//       ) : (
//         <div>
//           {Object.keys(brags).length === 0 ? (
//             <p>No brags to display</p>
//           ) : (
//             Object.keys(brags).map((date, index) => (
//               <div key={index} className="bg-transparent whitespace-pre-line mb-3 ml-5">
//                 <ul>
//                   {brags[date].map((bragItem) => (
//                     <li key={bragItem._id} className="flex items-stretch group hover:bg-neutral-200 dark:hover:bg-midnight-800 rounded-md px-4 py-0">
//                       <div className="flex flex-col w-full p-4 border border-neutral-200 dark:border-midnight-700 rounded-md">
//                         <div className="flex justify-between mb-2">
//                           <div className="font-semibold text-xs text-neutral-500 dark:text-midnight-100 whitespace-nowrap uppercase">{changeTimeFormat(bragItem.created_time)}</div>
//                           <div className="flex flex-row ml-auto">
//                             <EditBrag item={bragItem} refreshList={toggleRefreshList} />
//                             <DeleteBrag item={bragItem} refreshList={toggleRefreshList} />
//                           </div>
//                         </div>
//                         <div className="text-lg">{bragItem.brag}</div>
//                         <div className="flex flex-wrap mt-2">
//                           {tagBuilder(bragItem.tags)}
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
//   // return <ListBrags {...props} />;
//   // };
// };  

// export default ListBrags;

import { useCallback, useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import DeleteBrag from './DeleteBrag';
import EditBrag from './EditBrag';
import { AiOutlineSearch } from "react-icons/ai";

const ListBrags = (props) => {
  const [brags, setBrags] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [filteredBrags, setFilteredBrags] = useState({});
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
      setFilteredBrags(bragsObject); // Initialize filteredBrags with all brags
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
  }, [user.email, getBrags, toggleRefreshList]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      const filteredResults = Object.keys(brags).reduce((acc, date) => {
        const filteredBrags = brags[date].filter((brag) =>
          brag.brag.toLowerCase().includes(value.toLowerCase())
        );
        if (filteredBrags.length > 0) {
          acc[date] = filteredBrags;
        }
        return acc;
      }, {});

      setFilteredBrags(filteredResults);
    } else {
      setFilteredBrags(brags);
    }
  };

  return (
    <div className="lg:w-2/3 mx-3 mt-5 md:mt-20 lg:mr-20 lg:pl-5">
      <div className="hidden sm:flex p-0 sm:w-96 items-center border-2 rounded-full text-slate-600 bg-slate-200 border-slate-300 dark:border-teal-600 dark:bg-midnight-700 mb-5 ml-10">
        <input type="text" className="w-full bg-transparent border-transparent px-4 py-1 placeholder:text-slate-600 text-slate-600 dark:placeholder:text-neutral-400 dark:text-neutral-200 focus:outline-none" value={searchValue} onChange={handleChange} placeholder="Search" />
        <AiOutlineSearch className="w-6 h-6 text-slate-600 dark:text-neutral-400 cursor-pointer mr-3" title="Search" alt="search" />
      </div>
      {Object.keys(filteredBrags).length === 0 ? (
        <p>No brags to display</p>
      ) : (
        Object.keys(filteredBrags).map((date, index) => (
          <div key={index} className="bg-transparent whitespace-pre-line mb-3 ml-5">
            <ul>
              {filteredBrags[date].map((bragItem) => (
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

  
