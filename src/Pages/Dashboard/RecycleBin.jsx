// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import menuvector from "../../assets/menuvector.png";
// import close from "../../assets/close.png";
// import uploadcloud from "../../assets/uploadcloud.png";
// import LogoutRounded from "../../assets/LogoutRounded.png";
// import Home from "../../assets/Home.png";
// import FTP from "../../assets/FTP.png";
// import Rating from "../../assets/Rating.png";
// import Disposal from "../../assets/Disposal.png";
// import AddFolder from "../../assets/AddFolder.png";

// import { Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const RecycleBin = () => {
//   const [showConfirm, setShowConfirm] = useState(false);


//   const handleLogout = () => {
//     localStorage.removeItem("authToken"); // Remove token (or adjust based on auth implementation)
//     navigate("/login"); // Redirect to login page
//   };

//   const navigate = useNavigate();


//   const [isMenuOpen,setIsMenuOpen] = useState(false)

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

  

//   // State to manage recycle bin items
//   const [recycleBinItems, setRecycleBinItems] = useState([
//     { id: 1, file_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", name: "Document 1", deletedAt: "2024-11-25" },
//     { id: 2, file_id: "2fa75f64-5717-4562-b3fc-2c963f66afa7", name: "Image 2", deletedAt: "2024-11-24" },
//     { id: 3, file_id: "1fa65f64-5717-4562-b3fc-2c963f66afa8", name: "Video 3", deletedAt: "2024-11-23" },
//   ]);
      
     



//   // State to manage authentication token
//   const [token, setToken] = useState();

//   // Fetch the token from localStorage
//   useEffect(() => {
//     const storedToken = localStorage.getItem("authToken");
//     if (storedToken) {
//       setToken(storedToken);
//       console.log(storedToken)
//     } else {
//       toast.error("Authentication token not found.");
//     }

//   }, []);


  



//   // Function to restore an item (local operation)
//   // const restoreItem = (id) => {
//   //   setRecycleBinItems((prevItems) =>
//   //     prevItems.filter((item) => item.id !== id)
//   //   );
//   //   alert(`Item ${id} restored successfully.`);
//   // };

//   // // Function to permanently delete an item (API call)
//   // const deleteItemPermanently = async (file_id, id) => {
//   //   if (!token) {
//   //     toast.error("You must be logged in to delete items.");
//   //     return;
//   //   }


    
//   //   try {
//   //     // Make the POST request to permanently delete the item
//   //     const response = await fetch("https://proodoosfiles.onrender.com/api/fi/bin/", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //          "X-CSRFTOKEN": "5OeKiqmKEiWxPacQoMREqP0zWnDAXeOLN0kA05rIkgvsqpOZ60sgkFEqqqdhdOTU", // Assuming CSRF token is static or comes from another source
//   //         "Authorization": `Token ${token}`, // Pass the token in the Authorization header
//   //       },
//   //       body: JSON.stringify({ file_id }),
//   //     });



//   //     const data = await response.json();

//   //     if (response.ok) {
//   //       // Successfully deleted, now update the UI
//   //       setRecycleBinItems((prevItems) =>
//   //         prevItems.filter((item) => item.id !== id)
//   //       );
//   //       toast.success(`Item ${file_id} deleted permanently.`, {
//   //         position: "top-center",
//   //         autoClose: 3000,
//   //       });
//   //     } else {
//   //       toast.error(`Failed to delete item ${file_id}. ${data.detail || "Please try again."}`, {
//   //         position: "top-center",
//   //         autoClose: 3000,
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error("Error deleting item:", error);
//   //     toast.error("An error occurred while deleting the item.", {
//   //       position: "top-center",
//   //       autoClose: 3000,
//   //     });
//   //   }
//   // };

//   // Function to restore an item (API operation)
// const restoreItem = async (id) => {
//   if (!token) {
//     toast.error("You must be logged in to restore items.");
//     return;
//   }

//   try {
//     // Find the item from the recycle bin list based on its id
//     const item = recycleBinItems.find((item) => item.id === id);

//     // Ensure the item exists
//     if (!item) {
//       toast.error("Item not found.");
//       return;
//     }

//     // Make the POST request to restore the item from the recycle bin
//     const response = await fetch("https://proodoosfiles.onrender.com/api/fo/bin/", {
//       method: "POST", // Use POST to restore
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Token ${token}`, // Pass the token in the Authorization header
//         "X-CSRFTOKEN": "5OeKiqmKEiWxPacQoMREqP0zWnDAXeOLN0kA05rIkgvsqpOZ60sgkFEqqqdhdOTU", // CSRF token
//       },
//       body: JSON.stringify({ file_id: item.file_id }), // Send the file_id to restore the item
//     });
  

//     const data = await response.json();

//     if (response.ok) {
//       // Successfully restored, now update the UI
//       setRecycleBinItems((prevItems) =>
//         prevItems.filter((item) => item.id !== id)
//       );
//       toast.success(`Item ${item.name} restored successfully.`, {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     } else {
//       toast.error(`Failed to restore item ${item.name}. ${data.detail || "Please try again."}`, {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     }
//   } catch (error) {
//     console.error("Error restoring item:", error);
//     toast.error("An error occurred while restoring the item.", {
//       position: "top-center",
//       autoClose: 3000,
//     });
//   }
// };



//   const deleteItemPermanently = async (file_id, folder_id, id) => {
//     if (!token) {
//       toast.error("You must be logged in to delete items.");
//       return;
//     }
  
//     try {
//       // Make the POST request to permanently delete the item
//       const response = await fetch("https://proodoosfiles.onrender.com/api/fo/del/", {
//         method: "POST", // Use POST for deletion
//         headers: {
//           "Content-Type": "application/json", 
//           "Authorization": `Token ${token}`, // Pass the token in the Authorization header
//           "X-CSRFTOKEN": "5OeKiqmKEiWxPacQoMREqP0zWnDAXeOLN0kA05rIkgvsqpOZ60sgkFEqqqdhdOTU", // CSRF token
//         },
//         body: JSON.stringify({ file_id, folder_id }), // Send both file_id and folder_id in the body
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         // Successfully deleted, now update the UI
//         setRecycleBinItems((prevItems) =>
//           prevItems.filter((item) => item.id !== id)
//         );
//         toast.success(`Item ${file_id} deleted permanently.`, {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error(`Failed to delete item ${file_id}. ${data.detail || "Please try again."}`, {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Error deleting item:", error);
//       toast.error("An error occurred while deleting the item.", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     }
//   };
  
//   return (
//     <div className="p-4">
//       <ToastContainer />
//        {/* Header for small screens */}
//        <div className="flex justify-between items-center mt-[29px] lg:hidden">
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

      

//       <h2 className="hidden lg:block text-2xl font-bold mb-4">Recycle Bin</h2>
//       {recycleBinItems.length === 0 ? (
//         <p className="text-gray-500">The recycle bin is empty.</p>
//       ) : (
//         <div className="border border-gray-300 rounded-md p-4 md:ml-[300px] mt-8 lg:ml-[300px] ">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr>
//                 <th className="border-b py-2 font-[Poppins] font-medium text-[#242424] text-xs">Name</th>
//                 <th className="border-b py-2 font-[Poppins] font-medium text-[#242424] text-xs">Deleted At</th>
//                 <th className="border-b py-2 font-[Poppins] font-medium text-[#242424] text-xs text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recycleBinItems.map((item) => (
//                 <tr key={item.id} className="border-b ">
//                   <td className="py-1 text-xs text-[#7E838B] font-[Poppins]">{item.name}</td>
//                   <td className="py-1 text-xs text-[#7E838B] font-[Poppins]">{item.deletedAt}</td>
//                   <td className="py-1 text-xs text-[#7E838B] font-[Poppins] text-center">
//                     <button
//                       className="bg-blue-500 text-white px-4 py-1 rounded gap-2"
//                       onClick={() => restoreItem(item.id)}
//                     >
//                       Restore
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-1 py-1 rounded"
//                       onClick={() => deleteItemPermanently(item.file_id, item.id)}
//                     >
//                       Delete Permanently
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

// {isMenuOpen && (
//         <div>
//           <div
//             className="bg-[#344054B2] opacity-70 w-[100%] h-full fixed top-0 left-0 lg:hidden"
//             onClick={toggleMenu}
//           ></div>
//           <div className="bg-[#fff] w-[272px] h-[100%] fixed left-0 top-0 z-50 lg:hidden">
//             <div className="flex justify-between items-center">
//               <p className="mt-[22px] font-[Poppins] text-[#773DD3] text-base font-extrabold ml-[22px]">
//                 Prodoos<span className="font-light">Files</span>
//               </p>
//               <img
//                 className="mt-[28px] mr-[20px]"
//                 src={close}
//                 alt="close"
//                 onClick={toggleMenu}
//               />
//             </div>

//             <Link to="/">
//             <div className="flex ml-[16px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200">
//               <img
//                 className="object-contain cursor-pointer"
//                 src={Home}
//                 alt="Dashboard"
//               />
//               <h3 className="text-[#242424] cursor-pointer text-sm font-[Poppins]  font-normal">
//                 Dashboard
//               </h3>
//             </div>
//             </Link>

//             <Link to="/Starred">
//               <div className="flex ml-[16px] mt-[25px]">
//                 <img
//                   className="object-contain cursor-pointer"
//                   src={Rating}
//                   alt=""
//                 />
//                 <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-sm font-normal">
//                   Starred
//                 </h3>
//               </div>
//             </Link>

//             <Link to="/RecycleBin">
//               <div className="flex ml-[16px] mt-[25px]">
//                 <img
//                   className="object-contain cursor-pointer"
//                   src={Disposal}
//                   alt=""
//                 />
//                 <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-sm font-normal">
//                   Recycle Bin
//                 </h3>
//               </div>
//             </Link>

//             <Link to="/Create">
//               <div className="flex ml-[16px] mt-[25px]">
//                 <img
//                   className="object-contain cursor-pointer"
//                   src={AddFolder}
//                   alt=""
//                 />
//                 <h3 className="text-[#242424]  cursor-pointer font-[Poppins] text-sm font-normal">
//                   Create
//                 </h3>
//               </div>
//             </Link>

            

//             {/* Logout link */}
//             <div
//               className="flex ml-[16px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200 cursor-pointer"
//               onClick={() => setShowConfirm(true)} // Open confirmation modal
//             >
//               <img
//                 className="object-contain"
//                 src={LogoutRounded}
//                 alt="Logout"
//               />
//               <h3 className="text-[#242424] font-[Poppins] text-sm font-normal">
//                 Logout
//               </h3>
//             </div>
//           </div>
//         </div>
//       )}
//              {/* Confirmation Modal */}
//              {showConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6">
//             <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
//             <p className="mb-6 text-gray-600">
//               Are you sure you want to log out?
//             </p>
//             <div className="flex justify-end gap-4">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded-lg"
//                 onClick={() => setShowConfirm(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//           </div>
//              )}

//     </div>
//   );
// };

// export default RecycleBin;


// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import menuvector from "../../assets/menuvector.png";
// import close from "../../assets/close.png";
// import LogoutRounded from "../../assets/LogoutRounded.png";
// import Home from "../../assets/Home.png";
// import Rating from "../../assets/Rating.png";
// import Disposal from "../../assets/Disposal.png";
// import AddFolder from "../../assets/AddFolder.png";

// import { Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import Folders from "./Folders";

// const RecycleBin = () => {
//   const [recycleBinItems, setRecycleBinItems] = useState([]);
//   const [getBinnedFiles, setGetBinnedFiles] = useState([]); // Integrated GET request state
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [token, setToken] = useState();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("authToken");
//     if (storedToken) {
//       setToken(storedToken);
//       fetchRecycleBinItems(storedToken); // POST Request
//       fetchBinnedFiles(storedToken); // GET Request
//     } else {
//       toast.error("Authentication token not found.");
//     }
//   }, []);

//   const fetchRecycleBinItems = async (authToken) => {
//     try {
//       const response = await fetch("https://proodoosfiles.onrender.com/api/fi/bin/", {
//         method: "POST",
//         headers: {
//           "Authorization": `Token ${authToken}`,
//           "Content-Type": "application/json",
//           "X-CSRFTOKEN": "5fCQjBoNz7zM7ZqKqMin77easf0qn0jCST9K5G41BAWsAYKBdh3geWvxUNUzoROi",
//         },
//         body: JSON.stringify({
//           file_id: Folders, // Example file_id; adjust as needed
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setRecycleBinItems(data); // Assuming the API returns an array of files
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.detail || "Failed to fetch recycle bin items.");
//       }
//     } catch (error) {
//       console.error("Error fetching recycle bin items:", error);
//       toast.error("An error occurred while fetching recycle bin items.");
//     }
//   };

//   const fetchBinnedFiles = async (authToken) => {
//     try {
//       const response = await fetch("https://proodoosfiles.onrender.com/api/binned-f/", {
//         method: "GET",
//         headers: {
//           "Authorization": `Token ${authToken}`,
//           "accept": "*/*",
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // Ensure the response is an array before updating state
//         setGetBinnedFiles(Array.isArray(data) ? data : []);
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.detail || "Failed to fetch binned files.");
//       }
//     } catch (error) {
//       console.error("Error fetching binned files:", error);
//       toast.error("An error occurred while fetching binned files.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const restoreItem = async (id) => {
//     // Restore logic here...
//   };

//   const deleteItemPermanently = async (file_id, id) => {
//     // Delete logic here...
//   };

//   return (
//     <div className="p-4">
//       <ToastContainer />
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

//       <h2 className="hidden lg:block text-2xl font-bold mb-4">Recycle Bin</h2>
//       <div className="ml-[300px]">
//         <h3 className="text-lg font-semibold mt-6">POST Request - Recycle Bin Items</h3>
//         {recycleBinItems.length === 0 ? (
//           <p className="text-gray-500">No items retrieved from POST request.</p>
//         ) : (
//           <ul>
//             {recycleBinItems.map((item, index) => (
//               <li key={index}>{item.name}</li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div>
//         <h3 className="text-lg font-semibold mt-6">GET Request - Binned Files</h3>
//         {Array.isArray(getBinnedFiles) && getBinnedFiles.length === 0 ? (
//           <p className="text-gray-500">No items retrieved from GET request.</p>
//         ) : (
//           Array.isArray(getBinnedFiles) && (
//             <ul>
//               {getBinnedFiles.map((item, index) => (
//                 <li key={index}>{item.name || "Unnamed File"}</li>
//               ))}
//             </ul>
//           )
//         )}
//       </div>

//       {isMenuOpen && (
//         <div>
//           <div
//             className="bg-[#344054B2] opacity-70 w-[100%] h-full fixed top-0 left-0 lg:hidden"
//             onClick={toggleMenu}
//           ></div>
//           <div className="bg-[#fff] w-[272px] h-[100%] fixed left-0 top-0 z-50 lg:hidden">
//             {/* Sidebar menu here */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecycleBin;



import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners"; // Import the spinner
import menuvector from "../../assets/menuvector.png";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RecycleBin = () => {
  const [recycleBinItems, setRecycleBinItems] = useState([]);
  const [getBinnedFiles, setGetBinnedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      fetchRecycleBinItems(storedToken); // POST Request
      fetchBinnedFiles(storedToken); // GET Request
    } else {
      toast.error("Authentication token not found.");
    }
  }, []);

  const fetchRecycleBinItems = async (authToken) => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch("https://proodoosfiles.onrender.com/api/fi/bin/", {
        method: "POST",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
          "X-CSRFTOKEN": "5fCQjBoNz7zM7ZqKqMin77easf0qn0jCST9K5G41BAWsAYKBdh3geWvxUNUzoROi",
        },
        body: JSON.stringify({ file_id: "example_id" }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecycleBinItems(data);
      } else {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to fetch recycle bin items.");
      }
    } catch (error) {
      console.error("Error fetching recycle bin items:", error);
      toast.error("An error occurred while fetching recycle bin items.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const fetchBinnedFiles = async (authToken) => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch("https://proodoosfiles.onrender.com/api/binned-f/", {
        method: "GET",
        headers: {
          Authorization: `Token ${authToken}`,
          accept: "*/*",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGetBinnedFiles(Array.isArray(data) ? data : []);
      } else {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to fetch binned files.");
      }
    } catch (error) {
      console.error("Error fetching binned files:", error);
      toast.error("An error occurred while fetching binned files.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="p-4">
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

      <h2 className="hidden lg:block text-2xl font-bold mb-4">Recycle Bin</h2>
      {isLoading ? (
        <div className="flex justify-center items-center mt-10">
          <ClipLoader color="#773DD3" size={50} /> {/* Spinner */}
        </div>
      ) : (
        <div>
          <div className="ml-[300px]">
            <h3 className="text-lg font-semibold mt-6">POST Request - Recycle Bin Items</h3>
            {recycleBinItems.length === 0 ? (
              <p className="text-gray-500">No items retrieved from POST request.</p>
            ) : (
              <ul>
                {recycleBinItems.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mt-6">GET Request - Binned Files</h3>
            {Array.isArray(getBinnedFiles) && getBinnedFiles.length === 0 ? (
              <p className="text-gray-500">No items retrieved from GET request.</p>
            ) : (
              Array.isArray(getBinnedFiles) && (
                <ul>
                  {getBinnedFiles.map((item, index) => (
                    <li key={index}>{item.name || "Unnamed File"}</li>
                  ))}
                </ul>
              )
            )}
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div>
          <div
            className="bg-[#344054B2] opacity-70 w-[100%] h-full fixed top-0 left-0 lg:hidden"
            onClick={toggleMenu}
          ></div>
          <div className="bg-[#fff] w-[272px] h-[100%] fixed left-0 top-0 z-50 lg:hidden">
            {/* Sidebar menu here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecycleBin;
