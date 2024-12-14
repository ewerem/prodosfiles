// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import menuvector from "../../assets/menuvector.png";
// import folder from "../../assets/folder.png";
// import starred from "../../assets/starred.png";
// import upload from "../../assets/upload.png";
// import user from "../../assets/user.png";
// import filter from "../../assets/filter.png";
// import close from "../../assets/close.png";
// import bellicon from "../../assets/bellicon.png";
// import userprofile from "../../assets/userprofile.png";
// import Home from "../../assets/Home.png";
// import FTP from "../../assets/FTP.png";
// import Rating from "../../assets/Rating.png";
// import Disposal from "../../assets/Disposal.png";
// import AddFolder from "../../assets/AddFolder.png";
// import LogoutRounded from "../../assets/LogoutRounded.png";
// import Sidebar from "../../Components/Sidebar";

// const Dashboard = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       if (searchQuery.trim() === "") {
//         setSearchResults([]); // Clear results if input is empty
//         return;
//       }

//       setIsLoading(true); // Start loading
//       try {
//         const response = await axios.get(`/api/search`, {
//           params: { query: searchQuery }, // Send query as a parameter
//         });
//         setSearchResults(response.data); // Update results based on response
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       } finally {
//         setIsLoading(false); // End loading
//       }
//     };

//     const debounceTimeout = setTimeout(fetchSearchResults, 300); // Add debounce
//     return () => clearTimeout(debounceTimeout); // Cleanup timeout
//   }, [searchQuery]);

//   return (
//     <div>
//       <div className="hidden lg:flex justify-between items-center ">
//         <div>
//           <input
//             className="w-261px h-[40px] border border-[#EAEAEA] mt-[16px] ml-[300px] p-4 rounded-3xl font-[Poppins]"
//             type="text"
//             placeholder="Search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           ></input>
//         </div>
//         <div className="flex justify-center items-center gap-2 mt-[26px] mr-[59px]">
//           <img className="object-contain" src={bellicon} alt="" />
//           <img className="object-contain" src={userprofile} alt="" />
//           <h3 className="text-[#242424] font-normal font-[Poppins] text-xs ">
//             Jack Baeur
//           </h3>
//         </div>
//       </div>

//       <div className="flex justify-between items-center mt-[29px] lg:hidden">
//         <p className="font-[Poppins] text-[#773DD3] text-base font-extrabold ml-[22px]">
//           Prodoos<span className="font-light">Files</span>
//         </p>
//         <img
//           className="mr-[22px] lg:hidden"
//           src={menuvector}
//           alt="hamburgermenuicon"
//           onClick={toggleMenu}
//         />
//       </div>

//       {isMenuOpen ? (
//         <div>
//           <div
//             className="bg-[#344054B2] opacity-70 w-[100%] h-full fixed top-0 left-0 lg:hidden"
//             onClick={toggleMenu}
//           ></div>
//           <div className="bg-[#fff] w-[272px] h-[100%] fixed left-0 top-0 z-50 lg:hidden">
//             <div className="flex justify-between items-center ">
//               <p className=" mt-[22px] font-[Poppins] text-[#773DD3] text-base font-extrabold ml-[22px]">
//                 Prodoos<span className="font-light">Files</span>
//               </p>
//               <img
//                 className="mt-[28px] mr-[20px]"
//                 src={close}
//                 alt=""
//                 onClick={toggleMenu}
//               />
//             </div>

//             <div className="flex ml-[16px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200 ">
//               <img
//                 className="object-contain cursor-pointer"
//                 src={Home}
//                 alt=""
//               />
//               <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-base font-normal">
//                 Dashboard
//               </h3>
//             </div>

//             <Link to="/folders">
//               <div className="flex ml-[16px] mt-[25px]">
//                 <img
//                   className="object-contain cursor-pointer"
//                   src={FTP}
//                   alt=""
//                 />
//                 <h3 className="text-[#242424]  cursor-pointer font-[Poppins] text-base font-normal">
//                   Folders
//                 </h3>
//               </div>
//             </Link>

//             <Link to="/starred">
//               <div className="flex ml-[16px] mt-[25px]">
//                 <img
//                   className="object-contain cursor-pointer"
//                   src={Rating}
//                   alt=""
//                 />
//                 <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-base font-normal">
//                   Starred
//                 </h3>
//               </div>
//             </Link>

//             <Link to="/recyclebin">
//               <div className="flex ml-[16px] mt-[25px]">
//                 <img
//                   className="object-contain cursor-pointer"
//                   src={Disposal}
//                   alt=""
//                 />
//                 <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-base font-normal">
//                   Recycle Bin
//                 </h3>
//               </div>
//             </Link>

//             <Link to="/create">
//               <div className="flex ml-[16px] mt-[25px]">
//                 <img
//                   className="object-contain cursor-pointer"
//                   src={AddFolder}
//                   alt=""
//                 />
//                 <h3 className="text-[#242424]  cursor-pointer font-[Poppins] text-base font-normal">
//                   Create
//                 </h3>
//               </div>
//             </Link>

//             <Link to="/logout">
//               <div className="flex ml-[16px] mt-[25px]">
//                 <img
//                   className="object-contain cursor-pointer"
//                   src={LogoutRounded}
//                   alt=""
//                 />
//                 <h3 className="text-[#242424] font-[Poppins] text-base font-normal cursor-pointer">
//                   Logout
//                 </h3>
//               </div>
//             </Link>
//           </div>
//         </div>
//       ) : null}

//       <div className="lg:flex lg:justify-evenly lg:items-center lg:ml-[210px] lg:mt-[24px] ">
//         {/* All Folders */}
//         <div className="border border-[#DDDDDD] mt-[20px] w-[90%] ml-[20px] md:w-[50%] md:ml-[50px]  lg:w-[262px] lg:h-[166px] ">
//           <div className="mt-[55.37px]">
//             <img className=" mx-auto" src={folder} alt="All Folders" />
//             <p className="mt-[11.47px] text-center text-[#242424] font-[Poppins] font-normal text-base">
//               All Folders
//             </p>
//           </div>
//         </div>

//         {/* Starred */}
//         <div className="border border-[#DDDDDD]  mt-[20px] w-[90%] ml-[20px]  lg:w-[262px] lg:h-[166px]">
//           <div className="mt-[55.37px]">
//             <img className=" mx-auto" src={starred} alt="Starred" />
//             <p className="mt-[11.47px] text-center text-[#242424] font-[Poppins] font-normal text-base">
//               Starred
//             </p>
//           </div>
//         </div>

//         {/* File Upload */}
//         <div className="border border-[#DDDDDD] mt-[20px] w-[90%] ml-[20px] md:w-[50%] lg:w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
//           <img
//             className="w-[40px] h-[40px] mb-[10px]"
//             src={upload}
//             alt="Upload"
//           />
//           <p className="text-center text-[#242424] font-[Poppins] font-normal text-base mb-[10px]">
//             Upload File
//           </p>
//           <input
//             type="file"
//             className="file-input hidden"
//             id="file-upload"
//             onChange={(e) => {
//               if (e.target.files && e.target.files[0]) {
//                 console.log("Uploaded file:", e.target.files[0]);
//               }
//             }}
//           />
//           <label
//             htmlFor="file-upload"
//             className="cursor-pointer bg-[#773DD3] text-white px-[16px] py-[8px] rounded-3xl text-sm font-[Poppins]"
//           >
//             Choose File
//           </label>
//         </div>
//       </div>

//       <div className="flex justify-between items-center mt-[28px] ml-[44px] lg:ml-[300px] mr-[44px]">
//         <h3 className="text-[#242424] font-[Poppins] text-base font-normal opacity-50">
//           Recent
//         </h3>
//         <div className="flex justify-center items-center gap-1  ">
//           <img src={filter} alt="" />
//           <h3 className="font-[Poppins] text-[#242424] font-normal text-base opacity-50  md:mr-[65px]">
//             Filter
//           </h3>
//         </div>
//       </div>
//       {/* <div className='w-[80%] h-[186px] lg:w-[92%] lg:h-[522px] border-[#EAEAEA] border ml-[44px] '>
//         <div className='flex justify-between items-center mt-[24px] ml-[18px] mr-[18px]'>
//           <h3 className='font-[Poppins] text-[#7E838B] text-[10px] font-normal'>Name</h3>
//           <h3 className='font-[Poppins] text-[#7E838B] text-[10px] font-normal'>Modified</h3>
//           <h3 className='font-[Poppins] text-[#7E838B] text-[10px] font-normal'>Shared With </h3>
//           <h3 className='font-[Poppins] text-[#7E838B] text-[10px] font-normal'>Size</h3>
//         </div>
//         <hr className='mt-[17.98px]'/>

//         <div className='flex justify-between items-center'>
//           <div className='flex gap-1 items-center mt-[13px] ml-[18px]'><img className='w-[15px] h-[10px]' src = {folder} alt=""/> <h3 className='font-[Poppins] text-[#7E838B] font-normal text-[10px]'>Games</h3></div>
//           <div className=''> <h3 className='font-[Poppins] font-normal mt-[13px] mr-[45px] text-[10px] text-[#7E838B]'>Aug, 20 ,2026</h3></div>
//           <div className=''><img className='mt-[13px] ' src = {user} alt=""/></div>
//           <div className=''><h3 className='font-[Poppins] font-normal text-[10px] text-[#7E838B]'>3.2GB</h3></div>
//         </div>
        
//         <div className='flex justify-between items-center'>
//           <div className='flex gap-1 items-center mt-[13px] ml-[18px]'><img className='w-[15px] h-[10px]' src = {folder} alt=""/> <h3 className='font-[Poppins] text-[#7E838B] font-normal text-[10px]'>Games</h3></div>
//           <div className=''> <h3 className='font-[Poppins] font-normal mt-[13px] mr-[45px] text-[10px] text-[#7E838B]'>Aug, 20 ,2026</h3></div>
//           <div className=''><img className='mt-[13px] ' src = {user} alt=""/></div>
//           <div className=''><h3 className='font-[Poppins] font-normal text-[10px] text-[#7E838B]'>3.2GB</h3></div>
//         </div>

//         <div className='flex justify-between items-center'>
//           <div className='flex gap-1 items-center mt-[13px] ml-[18px]'><img className='w-[15px] h-[10px]' src = {folder} alt=""/> <h3 className='font-[Poppins] text-[#7E838B] font-normal text-[10px]'>Games</h3></div>
//           <div className=''> <h3 className='font-[Poppins] font-normal mt-[13px] mr-[45px] text-[10px] text-[#7E838B]'>Aug, 20 ,2026</h3></div>
//           <div className=''><img className='mt-[13px] ' src = {user} alt=""/></div>
//           <div className=''><h3 className='font-[Poppins] font-normal text-[10px] text-[#7E838B]'>3.2GB</h3></div>
//         </div>

//       </div> */}

//       <div className="w-[80%] h-[286px] lg:w-[72%] lg:h-[522px] border-[#EAEAEA] border ml-[44px] lg:ml-[300px]">
//         {/* Headers */}
//         <div className="grid grid-cols-4 gap-[16px] px-[18px] mt-[24px]">
//           <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
//             Name
//           </h3>
//           <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
//             Modified
//           </h3>
//           <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
//             Shared With
//           </h3>
//           <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
//             Size
//           </h3>
//         </div>

//         <hr className="mt-[18px]" />

//         {/* Row Items */}
//         {[...Array(3)].map((_, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-4 gap-[16px] px-[18px] mt-[13px] items-center"
//           >
//             <div className="flex items-center gap-1">
//               <img
//                 className="w-[15px] h-[10px] object-contain"
//                 src={folder}
//                 alt=""
//               />
//               <h3 className="font-[Poppins] text-[#7E838B] font-normal text-[10px]">
//                 Games
//               </h3>
//             </div>
//             <h3 className="font-[Poppins] font-normal text-[10px] text-[#7E838B]">
//               Aug, 20, 2026
//             </h3>
//             <div>
//               <img
//                 className="w-[15px] h-[15px] object-contain"
//                 src={user}
//                 alt=""
//               />
//             </div>
//             <h3 className="font-[Poppins] font-normal text-[10px] text-[#7E838B]">
//               3.2GB
//             </h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import menuvector from "../../assets/menuvector.png";
// import folder from "../../assets/folder.png";
// import starred from "../../assets/starred.png";
// import upload from "../../assets/upload.png";
// import user from "../../assets/user.png";
// import filter from "../../assets/filter.png";
// import close from "../../assets/close.png";
// import bellicon from "../../assets/bellicon.png";
// import userprofile from "../../assets/userprofile.png";
// import Home from "../../assets/Home.png";
// import FTP from "../../assets/FTP.png";
// import Rating from "../../assets/Rating.png";
// import Disposal from "../../assets/Disposal.png";
// import AddFolder from "../../assets/AddFolder.png";
// import LogoutRounded from "../../assets/LogoutRounded.png";

// const Dashboard = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [files, setFiles] = useState([
//     {
//       id: 1,
//       name: "Games",
//       modified: "Aug, 20, 2026",
//       sharedWith: "Jack",
//       size: "3.2GB",
//     },
//     {
//       id: 2,
//       name: "Documents",
//       modified: "July, 15, 2026",
//       sharedWith: "Alice",
//       size: "1.8GB",
//     },
//     {
//       id: 3,
//       name: "Music",
//       modified: "June, 10, 2026",
//       sharedWith: "Bob",
//       size: "5GB",
//     },
//   ]);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleShare = (fileId) => {
//     const file = files.find((f) => f.id === fileId);
//     alert(`Sharing file: ${file.name}`);
//     // Implement actual sharing logic here (e.g., API call)
//   };

//   const handleRemove = (fileId) => {
//     const updatedFiles = files.filter((file) => file.id !== fileId);
//     setFiles(updatedFiles);
//     alert("File removed successfully");
//     // Optionally call an API to remove the file from the server
//   };

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       if (searchQuery.trim() === "") {
//         setSearchResults([]);
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/search`, {
//           params: { query: searchQuery },
//         });
//         setSearchResults(response.data);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     const debounceTimeout = setTimeout(fetchSearchResults, 300);
//     return () => clearTimeout(debounceTimeout);
//   }, [searchQuery]);

//   return (
//     <div>
//       <div className="hidden lg:flex justify-between items-center">
//         <input
//           className="w-261px h-[40px] border border-[#EAEAEA] mt-[16px] ml-[300px] p-4 rounded-3xl font-[Poppins]"
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <div className="flex items-center gap-2 mt-[26px] mr-[59px]">
//           <img src={bellicon} alt="" />
//           <img src={userprofile} alt="" />
//           <h3 className="text-[#242424] text-xs">Jack Baeur</h3>
//         </div>
//       </div>

//       {isMenuOpen && (
//         <div>
//           <div
//             className="bg-[#344054B2] opacity-70 w-full h-full fixed top-0 left-0 lg:hidden"
//             onClick={toggleMenu}
//           ></div>
//           <div className="bg-white w-[272px] h-full fixed left-0 top-0 z-50 lg:hidden">
//             <div className="flex justify-between items-center">
//               <p className="mt-[22px] text-[#773DD3] font-bold ml-[22px]">
//                 Prodoos<span className="font-light">Files</span>
//               </p>
//               <img
//                 className="mt-[28px] mr-[20px]"
//                 src={close}
//                 alt=""
//                 onClick={toggleMenu}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="w-[80%] h-[286px] lg:w-[72%] border-[#EAEAEA] border ml-[44px] lg:ml-[300px]">
//         <div className="grid grid-cols-6 gap-[16px] px-[18px] mt-[24px]">
//           <h3 className="text-[#7E838B] text-[10px]">Name</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Modified</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Shared With</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Size</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Actions</h3>
//         </div>
//         <hr className="mt-[18px]" />
//         {files.map((file) => (
//           <div
//             key={file.id}
//             className="grid grid-cols-6 gap-[16px] px-[18px] mt-[13px] items-center"
//           >
//             <h3 className="text-[#7E838B] text-[10px]">{file.name}</h3>
//             <h3 className="text-[#7E838B] text-[10px]">{file.modified}</h3>
//             <h3 className="text-[#7E838B] text-[10px]">{file.sharedWith}</h3>
//             <h3 className="text-[#7E838B] text-[10px]">{file.size}</h3>
//             <div className="flex gap-2">
//               <button
//                 className="text-blue-500 text-xs"
//                 onClick={() => handleShare(file.id)}
//               >
//                 Share
//               </button>
//               <button
//                 className="text-red-500 text-xs"
//                 onClick={() => handleRemove(file.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import bellicon from "../../assets/bellicon.png";
// import userprofile from "../../assets/userprofile.png";
// import close from "../../assets/close.png";

// const Dashboard = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [files, setFiles] = useState([
//     {
//       id: 1,
//       name: "Games",
//       modified: "Aug, 20, 2026",
//       sharedWith: ["Jack"],
//       size: "3.2GB",
//     },
//     {
//       id: 2,
//       name: "Documents",
//       modified: "July, 15, 2026",
//       sharedWith: ["Alice"],
//       size: "1.8GB",
//     },
//     {
//       id: 3,
//       name: "Music",
//       modified: "June, 10, 2026",
//       sharedWith: ["Bob"],
//       size: "5GB",
//     },
//   ]);
//   const [isSharing, setIsSharing] = useState(false);
//   const [currentFile, setCurrentFile] = useState(null);
//   const [shareDetails, setShareDetails] = useState({
//     email: "",
//     permission: "read",
//   });

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleShare = (fileId) => {
//     const file = files.find((f) => f.id === fileId);
//     setCurrentFile(file);
//     setIsSharing(true);
//   };

//   const submitShare = () => {
//     if (!currentFile || !shareDetails.email) {
//       alert("Please enter valid details.");
//       return;
//     }

//     const updatedFiles = files.map((file) => {
//       if (file.id === currentFile.id) {
//         return {
//           ...file,
//           sharedWith: [...file.sharedWith, shareDetails.email],
//         };
//       }
//       return file;
//     });

//     setFiles(updatedFiles);
//     setIsSharing(false);
//     alert(`Shared ${currentFile.name} with ${shareDetails.email}`);
//     // Optionally call an API to share the file
//   };

//   const handleRemove = (fileId) => {
//     const updatedFiles = files.filter((file) => file.id !== fileId);
//     setFiles(updatedFiles);
//     alert("File removed successfully");
//     // Optionally call an API to remove the file from the server
//   };

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       if (searchQuery.trim() === "") {
//         setSearchResults([]);
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/search`, {
//           params: { query: searchQuery },
//         });
//         setSearchResults(response.data);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     const debounceTimeout = setTimeout(fetchSearchResults, 300);
//     return () => clearTimeout(debounceTimeout);
//   }, [searchQuery]);

//   return (
//     <div>
//       {/* Top Bar */}
//       <div className="hidden lg:flex justify-between items-center">
//         <input
//           className="w-261px h-[40px] border border-[#EAEAEA] mt-[16px] ml-[300px] p-4 rounded-3xl font-[Poppins]"
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <div className="flex items-center gap-2 mt-[26px] mr-[59px]">
//           <img src={bellicon} alt="Notifications" />
//           <img src={userprofile} alt="User Profile" />
//           <h3 className="text-[#242424] text-xs">John Doe</h3>
//         </div>
//       </div>

//       {/* Sharing Modal */}
//       {isSharing && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded-lg shadow-lg w-[400px]">
//             <h3 className="text-lg font-bold mb-4">Share {currentFile?.name}</h3>
//             <input
//               type="email"
//               placeholder="Enter email"
//               value={shareDetails.email}
//               onChange={(e) =>
//                 setShareDetails({ ...shareDetails, email: e.target.value })
//               }
//               className="w-full p-2 mb-4 border border-gray-300 rounded"
//             />
//             <select
//               value={shareDetails.permission}
//               onChange={(e) =>
//                 setShareDetails({ ...shareDetails, permission: e.target.value })
//               }
//               className="w-full p-2 mb-4 border border-gray-300 rounded"
//             >
//               <option value="read">Read-Only</option>
//               <option value="edit">Edit</option>
//             </select>
//             <div className="flex justify-end gap-2">
//               <button
//                 className="bg-gray-300 px-4 py-2 rounded"
//                 onClick={() => setIsSharing(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={submitShare}
//               >
//                 Share
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* File List */}
//       <div className="w-[80%] h-[286px] lg:w-[72%] border-[#EAEAEA] border ml-[44px] lg:ml-[300px]">
//         <div className="grid grid-cols-6 gap-[16px] px-[18px] mt-[24px]">
//           <h3 className="text-[#7E838B] text-[10px]">Name</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Modified</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Shared With</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Size</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Actions</h3>
//         </div>
//         <hr className="mt-[18px]" />
//         {files.map((file) => (
//           <div
//             key={file.id}
//             className="grid grid-cols-6 gap-[16px] px-[18px] mt-[13px] items-center"
//           >
//             <h3 className="text-[#7E838B] text-[10px]">{file.name}</h3>
//             <h3 className="text-[#7E838B] text-[10px]">{file.modified}</h3>
//             <h3 className="text-[#7E838B] text-[10px]">
//               {file.sharedWith.join(", ")}
//             </h3>
//             <h3 className="text-[#7E838B] text-[10px]">{file.size}</h3>
//             <div className="flex gap-2">
//               <button
//                 className="text-blue-500 text-xs"
//                 onClick={() => handleShare(file.id)}
//               >
//                 Share
//               </button>
//               <button
//                 className="text-red-500 text-xs"
//                 onClick={() => handleRemove(file.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import bellicon from "../../assets/bellicon.png";
// import userprofile from "../../assets/userprofile.png";
// import close from "../../assets/close.png";
// import folder from "../../assets/folder.png";
// import starred from "../../assets/starred.png";
// import upload from "../../assets/upload.png";

// const Dashboard = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [files, setFiles] = useState([
//     {
//       id: 1,
//       name: "Games",
//       modified: "Aug, 20, 2026",
//       sharedWith: ["Jack"],
//       size: "3.2GB",
//     },
//     {
//       id: 2,
//       name: "Documents",
//       modified: "July, 15, 2026",
//       sharedWith: ["Alice"],
//       size: "1.8GB",
//     },
//     {
//       id: 3,
//       name: "Music",
//       modified: "June, 10, 2026",
//       sharedWith: ["Bob"],
//       size: "5GB",
//     },
//   ]);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleShare = (fileId) => {
//     const file = files.find((f) => f.id === fileId);
//     alert(`Sharing file: ${file.name}`);
//   };

//   const handleRemove = (fileId) => {
//     const updatedFiles = files.filter((file) => file.id !== fileId);
//     setFiles(updatedFiles);
//     alert("File removed successfully");
//   };

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       if (searchQuery.trim() === "") {
//         setSearchResults([]);
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/search`, {
//           params: { query: searchQuery },
//         });
//         setSearchResults(response.data);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     const debounceTimeout = setTimeout(fetchSearchResults, 300);
//     return () => clearTimeout(debounceTimeout);
//   }, [searchQuery]);

//   return (
//     <div>
//       {/* Top Bar */}
//       <div className="hidden lg:flex justify-between items-center">
//         <input
//           className="w-261px h-[40px] border border-[#EAEAEA] mt-[16px] ml-[300px] p-4 rounded-3xl font-[Poppins]"
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <div className="flex items-center gap-2 mt-[26px] mr-[59px]">
//           <img src={bellicon} alt="Notifications" />
//           <img src={userprofile} alt="User Profile" />
//           <h3 className="text-[#242424] text-xs">John Doe</h3>
//         </div>
//       </div>

//       {/* Folders and File Management Section */}
//       <div className="lg:flex lg:justify-evenly lg:items-center lg:ml-[210px] lg:mt-[24px]">
//         {/* All Folders */}
//         <div className="border border-[#DDDDDD] mt-[20px] w-[90%] ml-[20px] md:w-[50%] md:ml-[50px] lg:w-[262px] lg:h-[166px]">
//           <div className="mt-[55.37px]">
//             <img className="mx-auto" src={folder} alt="All Folders" />
//             <p className="mt-[11.47px] text-center text-[#242424] font-[Poppins] font-normal text-base">
//               All Folders
//             </p>
//           </div>
//         </div>

//         {/* Starred */}
//         <div className="border border-[#DDDDDD] mt-[20px] w-[90%] ml-[20px] lg:w-[262px] lg:h-[166px]">
//           <div className="mt-[55.37px]">
//             <img className="mx-auto" src={starred} alt="Starred" />
//             <p className="mt-[11.47px] text-center text-[#242424] font-[Poppins] font-normal text-base">
//               Starred
//             </p>
//           </div>
//         </div>

//         {/* File Upload */}
//         <div className="border border-[#DDDDDD] mt-[20px] w-[90%] ml-[20px] md:w-[50%] lg:w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
//           <img className="w-[40px] h-[40px] mb-[10px]" src={upload} alt="Upload" />
//           <p className="text-center text-[#242424] font-[Poppins] font-normal text-base mb-[10px]">
//             Upload File
//           </p>
//           <input
//             type="file"
//             className="file-input hidden"
//             id="file-upload"
//             onChange={(e) => {
//               if (e.target.files && e.target.files[0]) {
//                 console.log("Uploaded file:", e.target.files[0]);
//               }
//             }}
//           />
//           <label
//             htmlFor="file-upload"
//             className="cursor-pointer bg-[#773DD3] text-white px-[16px] py-[8px] rounded-3xl text-sm font-[Poppins]"
//           >
//             Choose File
//           </label>
//         </div>
//       </div>

//       {/* File List */}
//       <div className="w-[80%] h-[286px] lg:w-[72%] border-[#EAEAEA] border ml-[44px] lg:ml-[300px] mt-[30px]">
//         <div className="grid grid-cols-6 gap-[16px] px-[18px] mt-[24px]">
//           <h3 className="text-[#7E838B] text-[10px]">Name</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Modified</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Shared With</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Size</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Actions</h3>
//         </div>
//         <hr className="mt-[18px]" />
//         {files.map((file) => (
//           <div
//             key={file.id}
//             className="grid grid-cols-6 gap-[16px] px-[18px] mt-[13px] items-center"
//           >
//             <h3 className="text-[#7E838B] text-[10px]">{file.name}</h3>
//             <h3 className="text-[#7E838B] text-[10px]">{file.modified}</h3>
//             <h3 className="text-[#7E838B] text-[10px]">
//               {file.sharedWith.join(", ")}
//             </h3>
//             <h3 className="text-[#7E838B] text-[10px]">{file.size}</h3>
//             <div className="flex gap-2">
//               <button
//                 className="text-blue-500 text-xs"
//                 onClick={() => handleShare(file.id)}
//               >
//                 Share
//               </button>
//               <button
//                 className="text-red-500 text-xs"
//                 onClick={() => handleRemove(file.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import bellicon from "../../assets/bellicon.png";
// import userprofile from "../../assets/userprofile.png";
// import close from "../../assets/close.png";
// import folder from "../../assets/folder.png";
// import starred from "../../assets/starred.png";
// import upload from "../../assets/upload.png";

// const Dashboard = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [shareModal, setShareModal] = useState({ isOpen: false, fileId: null });
//   const [shareWith, setShareWith] = useState("");
//   const [files, setFiles] = useState([
//     {
//       id: 1,
//       name: "Games",
//       modified: "Aug, 20, 2026",
//       sharedWith: ["Jack"],
//       size: "3.2GB",
//     },
//     {
//       id: 2,
//       name: "Documents",
//       modified: "July, 15, 2026",
//       sharedWith: ["Alice"],
//       size: "1.8GB",
//     },
//     {
//       id: 3,
//       name: "Music",
//       modified: "June, 10, 2026",
//       sharedWith: ["Bob"],
//       size: "5GB",
//     },
//   ]);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleShare = (fileId) => {
//     setShareModal({ isOpen: true, fileId });
//   };

//   const confirmShare = async () => {
//     if (!shareWith.trim()) {
//       alert("Please enter a valid user to share with.");
//       return;
//     }

//     const updatedFiles = files.map((file) =>
//       file.id === shareModal.fileId
//         ? { ...file, sharedWith: [...file.sharedWith, shareWith] }
//         : file
//     );

//     setFiles(updatedFiles);
//     setShareModal({ isOpen: false, fileId: null });
//     setShareWith("");

//     // Replace the below API call with your backend logic
//     try {
//       await axios.post(`/api/share`, {
//         fileId: shareModal.fileId,
//         shareWith,
//       });
//       alert("Folder shared successfully!");
//     } catch (error) {
//       console.error("Error sharing folder:", error);
//       alert("An error occurred while sharing the folder.");
//     }
//   };

//   const handleRemove = (fileId) => {
//     const updatedFiles = files.filter((file) => file.id !== fileId);
//     setFiles(updatedFiles);
//     alert("File removed successfully");
//   };

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       if (searchQuery.trim() === "") {
//         setSearchResults([]);
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/search`, {
//           params: { query: searchQuery },
//         });
//         setSearchResults(response.data);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     const debounceTimeout = setTimeout(fetchSearchResults, 300);
//     return () => clearTimeout(debounceTimeout);
//   }, [searchQuery]);

//   return (
//     <div>
//       {/* Share Modal */}
//       {shareModal.isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-md shadow-md">
//             <h3 className="text-lg font-semibold mb-4">Share Folder</h3>
//             <input
//               type="text"
//               placeholder="Enter user email or name"
//               value={shareWith}
//               onChange={(e) => setShareWith(e.target.value)}
//               className="border border-gray-300 p-2 rounded w-full mb-4"
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShareModal({ isOpen: false, fileId: null })}
//                 className="px-4 py-2 bg-gray-200 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmShare}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md"
//               >
//                 Share
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Top Bar */}
//       <div className="hidden lg:flex justify-between items-center">
//         <input
//           className="w-261px h-[40px] border border-[#EAEAEA] mt-[16px] ml-[300px] p-4 rounded-3xl font-[Poppins]"
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <div className="flex items-center gap-2 mt-[26px] mr-[59px]">
//           <img src={bellicon} alt="Notifications" />
//           <img src={userprofile} alt="User Profile" />
//           <h3 className="text-[#242424] text-xs">John Doe</h3>
//         </div>
//       </div>

//       {/* File List */}
//       <div className="w-[80%] h-[286px] lg:w-[72%] border-[#EAEAEA] border ml-[44px] lg:ml-[300px] mt-[30px]">
//         <div className="grid grid-cols-6 gap-[16px] px-[18px] mt-[24px]">
//           <h3 className="text-[#7E838B] text-[10px]">Name</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Modified</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Shared With</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Size</h3>
//           <h3 className="text-[#7E838B] text-[10px]">Actions</h3>
//         </div>
//         <hr className="mt-[18px]" />
//         {files.map((file) => (
//           <div
//             key={file.id}
//             className="grid grid-cols-6 gap-[16px] px-[18px] mt-[13px] items-center"
//           >
//             <h3 className="text-[#7E838B] text-[10px]">{file.name}</h3>
//             <h3 className="text-[#7E838B] text-[10px]">{file.modified}</h3>
//             <h3 className="text-[#7E838B] text-[10px]">
//               {file.sharedWith.join(", ")}
//             </h3>
//             <h3 className="text-[#7E838B] text-[10px]">{file.size}</h3>
//             <div className="flex gap-2">
//               <button
//                 className="text-blue-500 text-xs"
//                 onClick={() => handleShare(file.id)}
//               >
//                 Share
//               </button>
//               <button
//                 className="text-red-500 text-xs"
//                 onClick={() => handleRemove(file.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from "react";
import axios from "axios";
import folder from "../../assets/folder.png";
import starred from "../../assets/starred.png";
import upload from "../../assets/upload.png";
import bellicon from "../../assets/bellicon.png";
import userprofile from "../../assets/userprofile.png";
import { useNavigate } from "react-router-dom";
import folderIcon from "../../assets/folder.png";
import userIcon from "../../assets/user.png";
import menuvector from "../../assets/menuvector.png";
import close from "../../assets/close.png";
import uploadcloud from "../../assets/uploadcloud.png";
import LogoutRounded from "../../assets/LogoutRounded.png";
import Home from "../../assets/Home.png";
import FTP from "../../assets/FTP.png";
import Rating from "../../assets/Rating.png";
import Disposal from "../../assets/Disposal.png";
import AddFolder from "../../assets/AddFolder.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shareModal, setShareModal] = useState({ isOpen: false, fileId: null });
  const [shareWith, setShareWith] = useState("");
  const [files, setFiles] = useState([
    { id: 1, name: "Games", modified: "Aug, 20, 2026", sharedWith: ["Jack"], size: "3.2GB" },
    { id: 2, name: "Documents", modified: "July, 15, 2026", sharedWith: ["Alice"], size: "1.8GB" },
    { id: 3, name: "Music", modified: "June, 10, 2026", sharedWith: ["Bob"], size: "5GB" },
  ]);

  const [showConfirm, setShowConfirm] = useState(false);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("authToken");
  //   if (storedToken) {
  //     setToken(storedToken);
  //   } else {
  //     toast.error("Authentication token not found.");
  //     navigate("/login"); // Redirect to login if no token
  //   }
  // }, [navigate]);



  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token (or adjust based on auth implementation)
    navigate("/login"); // Redirect to login page
  };

  // useEffect(() => {
  //     const storedToken = localStorage.getItem("authToken");    
  //     if (storedToken) {
  //       setToken(storedToken);
  //     } else {
  //       toast.error("Authentication token not found.");
  //     }
  //   }, []);

  const navigate = useNavigate();


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleShare = (fileId) => setShareModal({ isOpen: true, fileId });

  const confirmShare = async () => {
    if (!shareWith.trim()) {
      alert("Please enter a valid user to share with.");
      return;
    }
    if (!token) {
      toast.error("You must be logged in to share.");
      return; // Stop execution if there's no token
    } else {
      toast.success("Shared successfully");
    }
    

    const updatedFiles = files.map((file) =>
      file.id === shareModal.fileId
        ? { ...file, sharedWith: [...file.sharedWith, shareWith] }
        : file
    );

    setFiles(updatedFiles);
    setShareModal({ isOpen: false, fileId: null });
    setShareWith("");

    try {
      await axios.post(
        'https://proodoosfiles.onrender.com/api/fo/sharing/',
        {
          fileId: shareModal.fileId,
          shareWith
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Token ${token}`,
            'X-CSRFTOKEN': '52IsgIkb4OzvOAq95OoBRwunO2oVV47aSGfm2N0p6hWbhzK0Sj9uYlLKgAi4WVCQ'
          }
        }
      );
    
      alert("Folder shared successfully!");
    } catch (error) {
      console.error("Error sharing folder:", error);
    }
  };
    
  const handleRemove = (fileId) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);
    alert("File removed successfully");
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/search`, { params: { query: searchQuery } });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const debounceTimeout = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return (
    <div>
          <ToastContainer />
       <div className="flex justify-between items-center mt-[29px] lg:hidden">
        <p className="font-[Poppins] text-[#773DD3] text-base font-extrabold ml-[22px]">
          Prodoos<span className="font-light">Files</span>
        </p>
        <img
          className="mr-[22px] lg:hidden"
          src={menuvector}
          alt="hamburgermenuicon"
          onClick={toggleMenu}
        />
      </div>


      {/* Share Modal */}
      {shareModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4">Share Folder</h3>
            <input
              type="text"
              placeholder="Enter user email or name"
              value={shareWith}
              onChange={(e) => setShareWith(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShareModal({ isOpen: false, fileId: null })}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmShare}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="hidden lg:flex justify-between items-center">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-261px h-[40px] border border-[#EAEAEA] mt-[16px] ml-[300px] p-4 rounded-3xl"
        />
        <div className="flex items-center gap-2 mt-[26px] mr-[59px]">
          <img src={bellicon} alt="Notifications" />
          <img src={userprofile} alt="User Profile" />
          <h3 className="text-[#242424] text-xs">John Doe</h3>
        </div>
      </div>

      {/* Dashboard Features */}
     
      <div className=" ml-[14%] md:ml-[50%]  lg:flex lg:justify-evenly lg:items-center lg:ml-[250px] lg:mt-[24px]">
      <Link to= "/folders">
        <div className=" border border-[#DDDDDD] mt-[20px] w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
          <img className="mx-auto" src={folder} alt="All Folders" />
          <p className="mt-[11.47px] text-center">All Folders</p>
        </div>
        </Link>
        <Link to= "/starred">
        <div className="border border-[#DDDDDD] mt-[20px] w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
          <img className="mx-auto" src={starred} alt="Starred" />
          <p className="mt-[11.47px] text-center">Starred</p>
        </div>
        </Link>
        <Link to="">
        <div className="border border-[#DDDDDD] mt-[20px] w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
          <img src={upload} alt="Upload" className="w-[40px] h-[40px] mb-[10px]" />
          <p className="text-center">Upload File</p>
        </div>
        </Link>
      </div>
      

      {/* File List */}
      <div className="w-[85%] h-[286px] lg:w-[72%] border-[#EAEAEA] border md:w-[60%] md:ml-[39%] ml-[24px] lg:ml-[300px] mt-[30px]">
        <div className="grid grid-cols-6 gap-[24px] px-[18px] mt-[24px]">
          <h3 className="text-[#7E838B] text-[10px]">Name</h3>
          <h3 className="text-[#7E838B] text-[10px]">Modified</h3>
          <h3 className="text-[#7E838B] text-[10px]">Shared With</h3>
          <h3 className="text-[#7E838B] text-[10px]">Size</h3>
          <h3 className="text-[#7E838B] text-[10px]">Actions</h3>
        </div>
        <hr className="mt-[18px]" />
        {files.map((file) => (
          <div
            key={file.id}
            className="grid grid-cols-6 gap-[16px] px-[18px] mt-[13px] items-center"
          >
            <h3 className="text-[#7E838B] text-[10px]">{file.name}</h3>
            <h3 className="text-[#7E838B] text-[10px]">{file.modified}</h3>
            <h3 className="text-[#7E838B] text-[10px]">{file.sharedWith.join(", ")}</h3>
            <h3 className="text-[#7E838B] text-[10px]">{file.size}</h3>
            <div className="flex gap-2">
              <button className="text-blue-500 text-[10px]" onClick={() => handleShare(file.id)}>
                Share
              </button>
              <button className="text-red-500 text-[10px]" onClick={() => handleRemove(file.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
         {isMenuOpen && (
        <div>
          <div
            className="bg-[#344054B2] opacity-70 w-[100%] h-full fixed top-0 left-0 lg:hidden"
            onClick={toggleMenu}
          ></div>
          <div className="bg-[#fff] w-[272px] h-[100%] fixed left-0 top-0 z-50 lg:hidden">
            <div className="flex justify-between items-center">
              <p className="mt-[22px] font-[Poppins] text-[#773DD3] text-base font-extrabold ml-[22px]">
                Prodoos<span className="font-light">Files</span>
              </p>
              <img
                className="mt-[28px] mr-[20px]"
                src={close}
                alt="close"
                onClick={toggleMenu}
              />
            </div>

            <Link to="/">
            <div className="flex ml-[16px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200">
              <img
                className="object-contain cursor-pointer"
                src={Home}
                alt="Dashboard"
              />
              <h3 className="text-[#242424] cursor-pointer text-sm font-[Poppins]  font-normal">
                Dashboard
              </h3>
            </div>
            </Link>

            <Link to="/Starred">
              <div className="flex ml-[16px] mt-[25px]">
                <img
                  className="object-contain cursor-pointer"
                  src={Rating}
                  alt=""
                />
                <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-sm font-normal">
                  Starred
                </h3>
              </div>
            </Link>

            <Link to="/RecycleBin">
              <div className="flex ml-[16px] mt-[25px]">
                <img
                  className="object-contain cursor-pointer"
                  src={Disposal}
                  alt=""
                />
                <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-sm font-normal">
                  Recycle Bin
                </h3>
              </div>
            </Link>

            <Link to="/Create">
              <div className="flex ml-[16px] mt-[25px]">
                <img
                  className="object-contain cursor-pointer"
                  src={AddFolder}
                  alt=""
                />
                <h3 className="text-[#242424]  cursor-pointer font-[Poppins] text-sm font-normal">
                  Create
                </h3>
              </div>
            </Link>

            

            {/* Logout link */}
            <div
              className="flex ml-[16px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200 cursor-pointer"
              onClick={() => setShowConfirm(true)} // Open confirmation modal
            >
              <img
                className="object-contain"
                src={LogoutRounded}
                alt="Logout"
              />
              <h3 className="text-[#242424] font-[Poppins] text-sm font-normal">
                Logout
              </h3>
            </div>
          </div>
          </div>
         )}
      </div>
             {/* Confirmation Modal */}
             {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          </div>
      
      )}
    </div>
  );
};

export default Dashboard;
