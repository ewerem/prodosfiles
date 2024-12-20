// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import folder from "../../assets/folder.png";
// import starred from "../../assets/starred.png";
// import uploadcloud from "../../assets/uploadcloud.png";
// import bellicon from "../../assets/bellicon.png";
// import userprofile from "../../assets/userprofile.png";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Dashboard = () => {
//   const [token, setToken] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [shareModal, setShareModal] = useState({ isOpen: false, fileId: null });
//   const [shareWith, setShareWith] = useState("");
//   const [files, setFiles] = useState([
//     // { id: 1, name: "Games", modified: "Aug, 20, 2026", sharedWith: ["Jack"], size: "3.2GB" },
//     // { id: 2, name: "Documents", modified: "July, 15, 2026", sharedWith: ["Alice"], size: "1.8GB" },
//     // { id: 3, name: "Music", modified: "June, 10, 2026", sharedWith: ["Bob"], size: "5GB" },
//   ]);

//   useEffect(() => {
//       const storedToken = localStorage.getItem("authToken");    
//       if (storedToken) {
//         setToken(storedToken);
//       } else {
//         toast.error("Authentication token not found.");
//       }
//     }, []);

//   const handleShare = (fileId) => setShareModal({ isOpen: true, fileId });

//   const confirmShare = async () => {
//     if (!shareWith.trim()) {
//       alert("Please enter a valid user to share with.");
//       return;
//     }
//     if (!token) {
//       toast.error("You must be logged in to share.");
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

//     try {
//       await axios.post(
//         // 'https://proodoosfiles.onrender.com/api/fo/sharing/',
//           'https://proodoosfiles.onrender.com/api/share-file/',
//         { fileId: shareModal.fileId, shareWith },
//         {
//           headers: {
//             Accept: "*/*",
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       toast.success("Folder shared successfully!");
//     } catch (error) {
//       console.error("Error sharing folder:", error);
//     }
//   };

//   const handleRemove = (fileId) => {
//     const updatedFiles = files.filter((file) => file.id !== fileId);
//     setFiles(updatedFiles);
//     toast.success("File removed successfully");
//   };


//   const handleFolderUpload = async (event) => {
//     const folderFiles = event.target.files;
  
//     if (!token) {
//       toast.error("Authentication token is missing.");
//       return;
//     }

//     const uploadedFiles = Array.from(folderFiles).map((file, index) => ({
//       id: files.length + index + 1,
//       name: file.webkitRelativePath || file.name,
//       modified: new Date().toLocaleDateString(),
//       sharedWith: [],
//       size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
//   }));
  
//     setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
//     // toast.success("Folder uploaded successfully!");

//     console.log('====================================');
//     console.log(files);
//     console.log('====================================');
//     const formData = new FormData();
//     Array.from(folderFiles).forEach((file) => formData.append("files", file));

    
//     // const logFormData = (formData) => {
//     //   console.log("Logging FormData items:");
//     //   for (const [key, value] of formData.entries()) {
//     //     console.log(`${key}:`, value);
//     //   }
//     // };
//     // logFormData(formData)
  
//     setIsLoading(true);
    
//     try {
//       const response = await fetch(
//         "https://proodoosfiles.onrender.com/api/upload_file/",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//           body: formData,
//         }
//       );
  
//       const data = await response.json();
//       console.log('====================================');
//       console.log(data);
//       console.log('====================================');
  
//       if (!response.ok) {
//         const errorMessage =
//           data.message || `Failed with status code ${response.status}`;
//         throw new Error(errorMessage);
//       }
  
//       // toast.success("Folder created successfully!");
//       // setFolderName("");
//     } catch (error) {
//       console.error("Error during folder creation:", error);
//       toast.error(error.message || "An unexpected error occurred.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   useEffect(() => {
//     const fetchSearchResults = async () => {
//       if (searchQuery.trim() === "") {
//         setSearchResults([]);
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`/api/search`, { params: { query: searchQuery } });
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
//       <ToastContainer />

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
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-261px h-[40px] border border-[#EAEAEA] mt-[16px] ml-[300px] p-4 rounded-3xl"
//         />
//         <div className="flex items-center gap-2 mt-[26px] mr-[59px]">
//           <img src={bellicon} alt="Notifications" />
//           <img src={userprofile} alt="User Profile" />
//           <h3 className="text-[#242424] text-xs">John Doe</h3>
//         </div>
//       </div>

//       {/* Dashboard Features */}
//       <div className="ml-[14%] lg:flex lg:justify-evenly lg:items-center lg:ml-[250px] lg:mt-[24px]">
//         <Link to="/folders">
//           <div className="border border-[#DDDDDD] mt-[20px] w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
//             <img className="mx-auto" src={folder} alt="All Folders" />
//             <p className="mt-[11.47px] text-center">All Folders</p>
//           </div>
//         </Link>
//         <Link to="/starred">
//           <div className="border border-[#DDDDDD] mt-[20px] w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
//             <img className="mx-auto" src={starred} alt="Starred" />
//             <p className="mt-[11.47px] text-center">Starred</p>
//           </div>
//         </Link>
//         <div className="border border-[#DDDDDD] mt-[20px] w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
//           <label htmlFor="folderUpload" className="cursor-pointer text-center">
//             <img src={uploadcloud} alt="Upload" className="w-[40px] h-[40px] mb-[10px]" />
//             <p>Upload Folder</p>
//           </label>
//           <input
//             type="file"
//             id="folderUpload"
//             // webkitdirectory="true" // Only works in supported browsers
//             // directory="true" // Optional, ignored in most browsers
//             multiple
//             className="hidden"
//             onChange={handleFolderUpload}
//           />
//         </div>
//       </div>

//       {/* File List */}
//       <div className="w-[85%] lg:w-[72%] border-[#EAEAEA] border ml-[24px] lg:ml-[300px] mt-[30px]">
//       <h3 className="font-[Poppins] text-base font-medium text-[#242424] ml-4 mt-">Uploaded Files</h3>
//         <div className="grid grid-cols-6 gap-[24px] px-[18px] mt-[24px]">
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
//             <h3 className="text-[#7E838B] text-[10px]">{file.sharedWith.join(", ")}</h3>
//             <h3 className="text-[#7E838B] text-[10px]">{file.size}</h3>
//             <div className="flex gap-2">
//               <button className="text-blue-500 text-[10px]" onClick={() => handleShare(file.id)}>
//                 Share
//               </button>
//               <button className="text-red-500 text-[10px]" onClick={() => handleRemove(file.id)}>
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
// import folder from "../../assets/folder.png";
// import starred from "../../assets/starred.png";
// import uploadcloud from "../../assets/uploadcloud.png";
// import bellicon from "../../assets/bellicon.png";
// import userprofile from "../../assets/userprofile.png";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Dashboard = () => {
//   const [token, setToken] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [shareModal, setShareModal] = useState({ isOpen: false, fileId: null });
//   const [shareWith, setShareWith] = useState("");
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("authToken");
//     if (storedToken) {
//       setToken(storedToken);
//       fetchUserFiles(storedToken);
//     } else {
//       toast.error("Authentication token not found.");
//     }
//   }, []);

//   const fetchUserFiles = async (authToken) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get("https://proodoosfiles.onrender.com/api/user-files/", {
//         headers: {
//           Accept: "*/*",
//           Authorization: `Token ${authToken}`,
//         },
//       });
//       setFiles(response.data); // Update the files state with the fetched data
//       toast.success("Files fetched successfully!");
//     } catch (error) {
//       console.error("Error fetching user files:", error);
//       toast.error("Failed to fetch user files.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleShare = (fileId) => setShareModal({ isOpen: true, fileId });

//   const confirmShare = async () => {
//     if (!shareWith.trim()) {
//       alert("Please enter a valid user to share with.");
//       return;
//     }
//     if (!token) {
//       toast.error("You must be logged in to share.");
//       return;
//     }

//     const updatedFiles = files.map((file) =>
//       file.id === shareModal.fileId
//         ? { ...file, sharedWith: [...(file.sharedWith || []), shareWith] }
//         : file
//     );

//     setFiles(updatedFiles);
//     setShareModal({ isOpen: false, fileId: null });
//     setShareWith("");

//     try {
//       await axios.post(
//         "https://proodoosfiles.onrender.com/api/share-file/",
//         { fileId: shareModal.fileId, shareWith },
//         {
//           headers: {
//             Accept: "*/*",
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       toast.success("Folder shared successfully!");
//     } catch (error) {
//       console.error("Error sharing folder:", error);
//     }
//   };

//   const handleRemove = (fileId) => {
//     const updatedFiles = files.filter((file) => file.id !== fileId);
//     setFiles(updatedFiles);
//     toast.success("File removed successfully");
//   };

//   // Handle folder upload
//   // const handleFolderUpload = async (event) => {
//   //   const folderFiles = event.target.files;

//   //   if (!token) {
//   //     toast.error("Authentication token is missing.");
//   //     return;
//   //   }

//   //   const uploadedFiles = Array.from(folderFiles).map((file, index) => ({
//   //     id: files.length + index + 1,
//   //     name: file.webkitRelativePath || file.name,
//   //     modified: new Date().toLocaleDateString(),
//   //     sharedWith: [], // Ensure sharedWith is always an array
//   //     size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
//   //   }));

//   //   setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);

//   //   const formData = new FormData();
//   //   Array.from(folderFiles).forEach((file) => formData.append("files", file));

//   //   setIsLoading(true);

//   //   try {
//   //     const response = await fetch(
//   //       "https://proodoosfiles.onrender.com/api/upload_file/",
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           Authorization: `Token ${token}`,
//   //         },
//   //         body: formData,
//   //       }
//   //     );

//   //     const data = await response.json();

//   //     if (!response.ok) {
//   //       const errorMessage =
//   //         data.message || `Failed with status code ${response.status}`;
//   //       throw new Error(errorMessage);
//   //     }

//   //     toast.success("Folder uploaded successfully!");
//   //     fetchUserFiles(token); // Fetch the files again to update the file list after upload
//   //   } catch (error) {
//   //     console.error("Error during folder upload:", error);
//   //     toast.error(error.message || "An unexpected error occurred.");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };




//   const handleFolderUpload = async (event) => {
//     const folderFiles = event.target.files;
  
//     if (!token) {
//       toast.error("Authentication token is missing.");
//       return;
//     }
  
//     // Check if folderFiles has content
//     if (!folderFiles.length) {
//       toast.error("No files selected.");
//       return;
//     }
  
//     // Create a FormData object
//     const formData = new FormData();
//     Array.from(folderFiles).forEach((file) => {
//       formData.append("files", file);
//     });
  
//     setIsLoading(true);
  
//     try {
//       const response = await axios.post(
//         "https://proodoosfiles.onrender.com/api/upload_file/",
//         formData,
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
  
//       if (response.status === 200) {
//         toast.success("Folder uploaded successfully!");
//         fetchUserFiles(token); // Update file list after successful upload
//       } else {
//         throw new Error(response.data.message || "Failed to upload files.");
//       }
//     } catch (error) {
//       console.error("Error during folder upload:", error);
//       toast.error(error.message || "An unexpected error occurred.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div>
//       <ToastContainer />

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
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-261px h-[40px] border border-[#EAEAEA] mt-[16px] ml-[300px] p-4 rounded-3xl"
//         />
//         <div className="flex items-center gap-2 mt-[26px] mr-[59px]">
//           <img src={bellicon} alt="Notifications" />
//           <img src={userprofile} alt="User Profile" />
//           <h3 className="text-[#242424] text-xs">John Doe</h3>
//         </div>
//       </div>

//       {/* Dashboard Features */}
//       <div className="ml-[14%] lg:flex lg:justify-evenly lg:items-center lg:ml-[250px] lg:mt-[24px]">
//         <Link to="/folders">
//           <div className="border border-[#DDDDDD] mt-[20px] w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
//             <img className="mx-auto" src={folder} alt="All Folders" />
//             <p className="mt-[11.47px] text-center">All Folders</p>
//           </div>
//         </Link>
//         <Link to="/starred">
//           <div className="border border-[#DDDDDD] mt-[20px] w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
//             <img className="mx-auto" src={starred} alt="Starred" />
//             <p className="mt-[11.47px] text-center">Starred</p>
//           </div>
//         </Link>
//         <div className="border border-[#DDDDDD] mt-[20px] w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
//           <label htmlFor="folderUpload" className="cursor-pointer text-center">
//             <img src={uploadcloud} alt="Upload" className="w-[40px] h-[40px] mb-[10px]" />
//             <p>Upload Folder</p>
//           </label>
//           <input
//             type="file"
//             id="folderUpload"
//             multiple
//             className="hidden"
//             onChange={handleFolderUpload}
//           />
//         </div>
//       </div>

//       {/* File List */}
//       <div className="w-[85%] lg:w-[72%] border-[#EAEAEA] border ml-[24px] lg:ml-[300px] mt-[30px]">
//         <h3 className="font-[Poppins] text-base font-medium text-[#242424] ml-4 mt-">Uploaded Files</h3>
//         <div className="grid grid-cols-6 gap-[24px] px-[18px] mt-[24px]">
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
//             <h3 className="text-[#7E838B] text-[10px]">{(file.sharedWith || []).join(", ")}</h3>
//             <h3 className="text-[#7E838B] text-[10px]">{file.size}</h3>
//             <div className="flex gap-2">
//               <button className="text-blue-500 text-[10px]" onClick={() => handleShare(file.id)}>
//                 Share
//               </button>
//               <button className="text-red-500 text-[10px]" onClick={() => handleRemove(file.id)}>
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
import uploadcloud from "../../assets/uploadcloud.png";
import bellicon from "../../assets/bellicon.png";
import userprofile from "../../assets/userprofile.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shareModal, setShareModal] = useState({ isOpen: false, fileId: null });
  const [shareWith, setShareWith] = useState("");
  const [files, setFiles] = useState([]);
  
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      fetchUserFiles(storedToken);
    } else {
      toast.error("Authentication token not found.");
    }
  }, []);

  const fetchUserFiles = async (authToken) => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://proodoosfiles.onrender.com/api/user-files/", {
        headers: {
          Accept: "*/*",
          Authorization: `Token ${authToken}`,
        },
      });
      setFiles(response.data);
      toast.success("Files fetched successfully!");
    } catch (error) {
      console.error("Error fetching user files:", error);
      toast.error("Failed to fetch user files.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFolderUpload = async (event) => {
    const folderFiles = event.target.files;

    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    if (!folderFiles.length) {
      toast.error("No files selected.");
      return;
    }

    const formData = new FormData();
    Array.from(folderFiles).forEach((file) => {
      formData.append("files", file);
    });

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://proodoosfiles.onrender.com/api/upload_file/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Folder uploaded successfully!");
        fetchUserFiles(token);
      } else {
        throw new Error(response.data.message || "Failed to upload files.");
      }
    } catch (error) {
      console.error("Error during folder upload:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // const confirmShare = async () => {
  //   if (!shareWith.trim()) {
  //     toast.error("Please enter an email or username to share with.");
  //     return;
  //   }

  //   if (!shareModal.fileId) {
  //     toast.error("File ID is missing.");
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post(
  //       `https://proodoosfiles.onrender.com/api/share_file/`,
  //       {
  //         fileId: shareModal.fileId,
  //         shareWith,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //         body: JSON.stringify({
  //           folder_name: folderName.trim(),
  //           folder_id: folderId,
  //         })
  //       }
  //     );

  //     if (response.status === 200) {
  //       toast.success("File shared successfully!");
  //       setShareModal({ isOpen: false, fileId: null });
  //       setShareWith("");
  //     } else {
  //       throw new Error(response.data.message || "Failed to share the file.");
  //     }
  //   } catch (error) {
  //     console.error("Error sharing the file:", error);
  //     toast.error(error.message || "An unexpected error occurred.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const confirmShare = async () => {
    if (!shareWith.trim()) {
      toast.error("Please enter an email or username to share with.");
      return;
    }
  
    const { fileId, folderId, type } = shareModal;
  
    if (!fileId && !folderId) {
      toast.error("No valid ID provided for sharing.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const payload = {
        shareWith,
      };
  
      if (type === "file") {
        payload.fileId = fileId;
      } else if (type === "folder") {
        payload.folderId = folderId;
      }
  
      const response = await axios.post(
        `https://proodoosfiles.onrender.com/api/share_file/`,
        payload,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        toast.success(`${type === "file" ? "File" : "Folder"} shared successfully!`);
        setShareModal({ isOpen: false, fileId: null, folderId: null, type: null });
        setShareWith("");
      } else {
        throw new Error(response.data.message || `Failed to share the ${type}.`);
      }
    } catch (error) {
      console.error("Error sharing the item:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleShare = (fileId) => {
    setShareModal({ isOpen: true, fileId });
  };

  const handleRemove = async (fileId) => {
    try {
      const response = await axios.delete(
        `https://proodoosfiles.onrender.com/api/delete_file/${fileId}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("File removed successfully!");
        fetchUserFiles(token);
      } else {
        throw new Error(response.data.message || "Failed to remove file.");
      }
    } catch (error) {
      console.error("Error removing the file:", error);
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div>
      <ToastContainer />

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ClipLoader color="#4A90E2" size={50} />
        </div>
      )}

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

      <div className="ml-[14%] lg:flex lg:justify-evenly lg:items-center lg:ml-[250px] lg:mt-[24px]">
        <Link to="/folders">
          <div className="border border-[#DDDDDD] mt-[20px] w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
            <img className="mx-auto" src={folder} alt="All Folders" />
            <p className="mt-[11.47px] text-center">All Folders</p>
          </div>
        </Link>
        <Link to="/starred">
          <div className="border border-[#DDDDDD] mt-[20px] w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
            <img className="mx-auto" src={starred} alt="Starred" />
            <p className="mt-[11.47px] text-center">Starred</p>
          </div>
        </Link>
        <div className="border border-[#DDDDDD] mt-[20px] w-[262px] lg:h-[166px] flex flex-col items-center justify-center">
          <label htmlFor="folderUpload" className="cursor-pointer text-center">
            <img src={uploadcloud} alt="Upload" className="w-[40px] h-[40px] mb-[10px]" />
            <p>Upload Folder</p>
          </label>
          <input
            type="file"
            id="folderUpload"
            multiple
            className="hidden"
            onChange={handleFolderUpload}
          />
        </div>
      </div>

      <div className="w-[85%] lg:w-[72%] border-[#EAEAEA] border ml-[24px] lg:ml-[300px] mt-[30px]">
        <h3 className="font-[Poppins] text-base font-medium text-[#242424] ml-4">
          Uploaded Files
        </h3>
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
            <h3 className="text-[#7E838B] text-[10px]">
              {(file.sharedWith || []).join(", ")}
            </h3>
            <h3 className="text-[#7E838B] text-[10px]">{file.size}</h3>
            <div className="flex gap-2">
              <button
                className="text-blue-500 text-[10px]"
                onClick={() => handleShare(file.id, "file")}
              >
                Share
              </button>
              <button
                className="text-red-500 text-[10px]"
                onClick={() => handleRemove(file.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
