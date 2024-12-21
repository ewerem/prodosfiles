// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import folderIcon from "../../assets/folder.png";

// const Starred = () => {
//   const [folders, setFolders] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFolders = async () => {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         alert("Authentication token not found. Redirecting to login.");
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await fetch("https://proodoosfiles.onrender.com/api/all-folders/", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         });

//         const data = await response.json();
//         console.log(data)
//         if (response.ok) {
//           setFolders(data);
//         } else {
//           console.error("Failed to fetch folders:", data);
//           alert("Failed to load folders. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error fetching folders:", error);
//         alert("An error occurred while fetching folders.");
//       }
//     };

//     fetchFolders();
//   }, [navigate]);

//   const toggleStarred = async (folderId) => {
//     const csrfToken = "5fCQjBoNz7zM7ZqKqMin77easf0qn0jCST9K5G41BAWsAYKBdh3geWvxUNUzoROi"; // Replace with actual dynamic value if needed
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       alert("Authentication token not found.");
//       return;
//     }

//     // Debugging: Check the folder ID
//     console.log("Folder ID being sent:", folderId);

//     // Ensure folder exists
//     const folder = folders.find((folder) => folder.id === folderId);
//     if (!folder) {
//       alert("Folder not found in the list.");
//       return;
//     }

//     try {
//       const response = await fetch("https://proodoosfiles.onrender.com/api/fo/star/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFTOKEN": csrfToken,
//           Authorization: `Token ${token}`,
//         },
//         body: JSON.stringify({ folder_id: folderId }),
//       });

//       if (response.ok) {
//         // Optimistically update the UI
//         setFolders((prevFolders) =>
//           prevFolders.map((folder) =>
//             folder.id === folderId
//               ? { ...folder, isStarred: !folder.isStarred }
//               : folder
//           )
//         );
//       } else {
//         const errorData = await response.json();
//         console.error("Error updating starred status:", errorData);
//         alert(`Failed to update starred status: ${errorData.responseText || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Failed to update starred status:", error);
//       alert("Could not update starred status. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <div>
//         {folders.map((folder) => (
//           <div
//             key={folder.id} // Ensure each folder has a unique key
//             className="grid grid-cols-5 gap-[16px] px-[18px] mt-[43px] items-center md:ml-[350px]"
//           >
//             <img src={folderIcon} alt="Folder Icon" className="w-4 h-4 mr-2" />
//             <h3 className="font-[Poppins] text-[10px]">{folder.name}</h3>
//             <h3 className="font-[Poppins] text-[10px]">{folder.modified}</h3>
//             <h3 className="font-[Poppins] text-[10px]">{folder.size}</h3>
//             <button
//               onClick={() => toggleStarred(folder.id)}
//               className={`font-[Poppins] text-[10px] px-2 py-1 rounded ${
//                 folder.isStarred ? "bg-blue-400 text-white" : "bg-gray-200 text-black"
//               }`}
//             >
//               {folder.isStarred ? "Unstar" : "Star"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Starred;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import folderIcon from "../../assets/folder.png";

// const Starred = () => {
//   const [folders, setFolders] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFolders = async () => {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         alert("Authentication token not found. Redirecting to login.");
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await fetch("https://proodoosfiles.onrender.com/api/all-folders/", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         });

//         const data = await response.json();
//         console.log(data);
//         if (response.ok) {
//           setFolders(data);
//         } else {
//           console.error("Failed to fetch folders:", data);
//           alert("Failed to load folders. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error fetching folders:", error);
//         alert("An error occurred while fetching folders.");
//       }
//     };

//     fetchFolders();
//   }, [navigate]);

//   const toggleStarred = async (folderId) => {
//     const csrfToken = "5fCQjBoNz7zM7ZqKqMin77easf0qn0jCST9K5G41BAWsAYKBdh3geWvxUNUzoROi"; // Replace with actual dynamic value if needed
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       alert("Authentication token not found.");
//       return;
//     }

//     console.log("Folder ID being sent:", folderId);

//     const folder = folders.find((folder) => folder.id === folderId);
//     if (!folder) {
//       alert("Folder not found in the list.");
//       return;
//     }

//     try {
//       const response = await fetch("https://proodoosfiles.onrender.com/api/fo/star/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFTOKEN": csrfToken,
//           Authorization: `Token ${token}`,
//         },
//         body: JSON.stringify({ folder_id: folderId }),
//       });

//       if (response.ok) {
//         setFolders((prevFolders) =>
//           prevFolders.map((folder) =>
//             folder.id === folderId
//               ? { ...folder, isStarred: !folder.isStarred }
//               : folder
//           )
//         );
//       } else {
//         const errorData = await response.json();
//         console.error("Error updating starred status:", errorData);
//         alert(`Failed to update starred status: ${errorData.responseText || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Failed to update starred status:", error);
//       alert("Could not update starred status. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <div>
//         {folders.map((folder, index) => (
//           <div
//             key={`${folder.id}-${index}`} // Unique key using id and index
//             className="grid grid-cols-5 gap-[16px] px-[18px] mt-[43px] items-center md:ml-[350px]"
//           >
//             <img src={folderIcon} alt="Folder Icon" className="w-4 h-4 mr-2" />
//             <h3 className="font-[Poppins] text-[10px]">{folder.name}</h3>
//             <h3 className="font-[Poppins] text-[10px]">{folder.modified}</h3>
//             <h3 className="font-[Poppins] text-[10px]">{folder.size}</h3>
//             <button
//               onClick={() => toggleStarred(folder.id)}
//               className={`font-[Poppins] text-[10px] px-2 py-1 rounded ${
//                 folder.isStarred ? "bg-blue-400 text-white" : "bg-gray-200 text-black"
//               }`}
//             >
//               {folder.isStarred ? "Unstar" : "Star"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Starred;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import folderIcon from "../../assets/folder.png";

// const Starred = () => {
//   const [folders, setFolders] = useState([]);
//   const [loading, setLoading] = useState(false); // Loading state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFolders = async () => {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         alert("Authentication token not found. Redirecting to login.");
//         navigate("/login");
//         return;
//       }

//       setLoading(true); // Set loading to true before fetching
//       try {
//         const response = await fetch("https://proodoosfiles.onrender.com/api/all-folders/", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         });

//         const data = await response.json();
//         console.log(data);
//         if (response.ok) {
//           setFolders(data);
//         } else {
//           console.error("Failed to fetch folders:", data);
//           alert("Failed to load folders. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error fetching folders:", error);
//         alert("An error occurred while fetching folders.");
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchFolders();
//   }, [navigate]);

//   const toggleStarred = async (folderId) => {
//     const csrfToken = "5fCQjBoNz7zM7ZqKqMin77easf0qn0jCST9K5G41BAWsAYKBdh3geWvxUNUzoROi"; // Replace with actual dynamic value if needed
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       alert("Authentication token not found.");
//       return;
//     }

//     console.log("Folder ID being sent:", folderId);

//     const folder = folders.find((folder) => folder.id === folderId);
//     if (!folder) {
//       alert("Folder not found in the list.");
//       return;
//     }

//     try {
//       const response = await fetch("https://proodoosfiles.onrender.com/api/fo/star/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFTOKEN": csrfToken,
//           Authorization: `Token ${token}`,
//         },
//         body: JSON.stringify({ folder_id: folderId }),
//       });

//       if (response.ok) {
//         setFolders((prevFolders) =>
//           prevFolders.map((folder) =>
//             folder.id === folderId
//               ? { ...folder, isStarred: !folder.isStarred }
//               : folder
//           )
//         );
//       } else {
//         const errorData = await response.json();
//         console.error("Error updating starred status:", errorData);
//         alert(`Failed to update starred status: ${errorData.responseText || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Failed to update starred status:", error);
//       alert("Could not update starred status. Please try again.");
//     }
//   };

//   return (
//     <div>
//       {loading ? ( // Display loading message when loading
//         <div className="text-center mt-5">Loading Starred...</div>
//       ) : (
//         <div>
//           {folders.map((folder, index) => (
//             <div
//               key={`${folder.id}-${index}`} // Unique key using id and index
//               className="grid grid-cols-5 gap-[16px] px-[18px] mt-[43px] items-center md:ml-[350px]"
//             >
//               <img src={folderIcon} alt="Folder Icon" className="w-4 h-4 mr-2" />
//               <h3 className="font-[Poppins] text-[10px]">{folder.name}</h3>
//               <h3 className="font-[Poppins] text-[10px]">{folder.modified}</h3>
//               <h3 className="font-[Poppins] text-[10px]">{folder.size}</h3>
//               <button
//                 onClick={() => toggleStarred(folder.id)}
//                 className={`font-[Poppins] text-[10px] px-2 py-1 rounded ${
//                   folder.isStarred ? "bg-blue-400 text-white" : "bg-gray-200 text-black"
//                 }`}
//               >
//                 {folder.isStarred ? "Unstar" : "Star"}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Starred;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import folderIcon from "../../assets/folder.png";
import { ThreeDots } from "react-loader-spinner"; // Import spinner
import menuvector from "../../assets/menuvector.png";
import Home from "../../assets/Home.png";
import close from "../../assets/close.png";
import folder from "../../assets/folder.png";
import starred from "../../assets/starred.png";
import Disposal from "../../assets/Disposal.png";
import FTP from "../../assets/FTP.png";

const Starred = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchFolders = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Authentication token not found. Redirecting to login.");
        navigate("/login");
        return;
      }

      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(
          "https://proodoosfiles.onrender.com/api/all-folders/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setFolders(data);
        } else {
          console.error("Failed to fetch folders:", data);
          alert("Failed to load folders. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching folders:", error);
        alert("An error occurred while fetching folders.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchFolders();
  }, [navigate]);

  const toggleStarred = async (folderId) => {
    const csrfToken =
      "5fCQjBoNz7zM7ZqKqMin77easf0qn0jCST9K5G41BAWsAYKBdh3geWvxUNUzoROi"; // Replace with actual dynamic value if needed
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Authentication token not found.");
      return;
    }

    console.log("Folder ID being sent:", folderId);

    const folder = folders.find((folder) => folder.id === folderId);
    if (!folder) {
      alert("Folder not found in the list.");
      return;
    }

    try {
      const response = await fetch(
        "https://proodoosfiles.onrender.com/api/fo/star/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN": csrfToken,
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ folder_id: folderId }),
        }
      );

      if (response.ok) {
        setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.id === folderId
              ? { ...folder, isStarred: !folder.isStarred }
              : folder
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Error updating starred status:", errorData);
        alert(
          `Failed to update starred status: ${
            errorData.responseText || "Unknown error"
          }`
        );
      }
    } catch (error) {
      console.error("Failed to update starred status:", error);
      alert("Could not update starred status. Please try again.");
    }
  };

  return (
    <div>
      {/* Header for small screens */}
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

      {loading ? ( // Display spinner when loading
        <div className="flex justify-center items-center mt-5">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            // color="#4fa94d"
            color="#773DD3"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : (
        <div>
          {folders.map((folder, index) => (
            <div
              key={`${folder.id}-${index}`} // Unique key using id and index
              className="grid grid-cols-5 gap-[16px] px-[18px] mt-[43px] items-center md:ml-[350px]"
            >
              <img
                src={folderIcon}
                alt="Folder Icon"
                className="w-4 h-4 mr-2"
              />
              <h3 className="font-[Poppins] text-[10px]">{folder.name}</h3>
              <h3 className="font-[Poppins] text-[10px]">{folder.modified}</h3>
              <h3 className="font-[Poppins] text-[10px]">{folder.size}</h3>
              <button
                onClick={() => toggleStarred(folder.id)}
                className={`font-[Poppins] text-[10px] px-2 py-1 rounded ${
                  folder.isStarred
                    ? "bg-blue-400 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {folder.isStarred ? "Unstar" : "Star"}
              </button>
            </div>
          ))}
        </div>
      )}

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

            <div className="flex ml-[16px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200">
              <img
                className="object-contain cursor-pointer"
                src={Home}
                alt="Dashboard"
              />
              <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-base font-normal">
                Dashboard
              </h3>
            </div>

            <div className="flex gap-2 ml-[24px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200">
              <img
                className="object-contain cursor-pointer w-[15px] h-[20px] "
                src={folder}
                alt="folders"
              />
              <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-base font-normal">
                Folders
              </h3>
            </div>

            <div className="flex gap-2 ml-[24px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200">
              <img
                className="object-contain cursor-pointer w-[15px] h-[20px]"
                src={starred}
                alt="Starred"
              />
              <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-base font-normal">
                Starred
              </h3>
            </div>

            <div className="flex  ml-[18px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200">
              <img
                className="object-contain cursor-pointer"
                src={Disposal}
                alt="Disposalicon"
              />
              <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-base font-normal">
                Recycle Bin
              </h3>
            </div>

            <div className="flex ml-[16px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200">
              <img
                className="object-contain cursor-pointer"
                src={FTP}
                alt="Createicon"
              />
              <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-base font-normal">
                Create
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Starred;
