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


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import folderIcon from "../../assets/folder.png";

const Starred = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

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
        const response = await fetch("https://proodoosfiles.onrender.com/api/all-folders/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

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
    const csrfToken = "5fCQjBoNz7zM7ZqKqMin77easf0qn0jCST9K5G41BAWsAYKBdh3geWvxUNUzoROi"; // Replace with actual dynamic value if needed
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
      const response = await fetch("https://proodoosfiles.onrender.com/api/fo/star/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": csrfToken,
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ folder_id: folderId }),
      });

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
        alert(`Failed to update starred status: ${errorData.responseText || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to update starred status:", error);
      alert("Could not update starred status. Please try again.");
    }
  };

  return (
    <div>
      {loading ? ( // Display loading message when loading
        <div className="text-center mt-5">Loading Starred...</div>
      ) : (
        <div>
          {folders.map((folder, index) => (
            <div
              key={`${folder.id}-${index}`} // Unique key using id and index
              className="grid grid-cols-5 gap-[16px] px-[18px] mt-[43px] items-center md:ml-[350px]"
            >
              <img src={folderIcon} alt="Folder Icon" className="w-4 h-4 mr-2" />
              <h3 className="font-[Poppins] text-[10px]">{folder.name}</h3>
              <h3 className="font-[Poppins] text-[10px]">{folder.modified}</h3>
              <h3 className="font-[Poppins] text-[10px]">{folder.size}</h3>
              <button
                onClick={() => toggleStarred(folder.id)}
                className={`font-[Poppins] text-[10px] px-2 py-1 rounded ${
                  folder.isStarred ? "bg-blue-400 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {folder.isStarred ? "Unstar" : "Star"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Starred;
