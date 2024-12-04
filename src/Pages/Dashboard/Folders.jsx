// import React, { useState, useEffect } from "react";
// import folderIcon from "../../assets/folder.png";
// import userIcon from "../../assets/user.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { GetFolderAction } from "../../Base/data"; 
// import Apikit from "../../Base/Apikit";

// const Folders = () => {
//   const [folders, setFolders] = useState([]);

//   // Fetch folders from API
//   const fetchFolders = async () => {
//     try {
//       const response = await Apikit ("GetFolderAction"); // Make the GET request
//       if (response.status === 200) {
//         setFolders(response.data.folders || []); // Update folders with data from API
//         toast.success("Folders loaded successfully!", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error("Failed to load folders. Please try again.", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching folders:", error);
//       const errorMessage =
//         error.response?.data?.message || "An error occurred while fetching folders.";
//       toast.error(errorMessage, {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     }
//   };

//   // Fetch folders on component mount
//   useEffect(() => {
//     fetchFolders();
//   }, []);

//   const removeFolder = (id) => {
//     setFolders((prevFolders) =>
//       prevFolders.filter((folder) => folder.id !== id)
//     );
//   };

//   const shareFolder = (folder) => {
//     const shareData = {
//       title: folder.name,
//       text: `Check out this folder: ${folder.name}, last modified on ${folder.modified}, size: ${folder.size}`,
//       url: `https://example.com/folders/${folder.id}`, // Replace with your folder's actual URL
//     };

//     if (navigator.share) {
//       navigator
//         .share(shareData)
//         .then(() => toast.success("Folder shared successfully!"))
//         .catch((error) => toast.error("Error sharing folder: " + error.message));
//     } else {
//       // Fallback for unsupported browsers
//       navigator.clipboard
//         .writeText(shareData.url)
//         .then(() => toast.info("Link copied to clipboard!"))
//         .catch((error) => toast.error("Error copying link: " + error.message));
//     }
//   };

//   return (
//     <div>
//       <ToastContainer />
//       <div className="w-[80%] h-[586px] md:w-[50%] md:ml-[300px] md:h-[350px] lg:w-[72%] lg:h-[422px] border-[#EAEAEA] border lg:ml-[300px] ml-[44px] mt-[45px]">
//         {/* Header Section */}
//         <div className="grid grid-cols-6 gap-[16px] px-[18px] mt-[24px]">
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
//           <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
//             Share
//           </h3>
//           <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
//             Delete
//           </h3>
//         </div>

//         <hr className="mt-[18px]" />

//         {/* Rows Section */}
//         {folders.length > 0 ? (
//           folders.map((folder) => (
//             <div
//               key={folder.id}
//               className="grid grid-cols-6 gap-[16px] px-[18px] mt-[13px] items-center"
//             >
//               {/* Name Column */}
//               <div className="flex items-center gap-1 pr-[30px]">
//                 <img
//                   className="w-[15px] h-[10px] object-contain"
//                   src={folderIcon}
//                   alt="Folder Icon"
//                 />
//                 <h3 className="font-[Poppins] text-[#7E838B] font-normal text-[10px]">
//                   {folder.name}
//                 </h3>
//               </div>

//               {/* Modified Date Column */}
//               <h3 className="font-[Poppins] font-normal text-[10px] text-[#7E838B]">
//                 {folder.modified}
//               </h3>

//               {/* Shared With Column */}
//               <div>
//                 <img
//                   className="w-[15px] h-[15px] object-contain"
//                   src={userIcon}
//                   alt="User Icon"
//                 />
//               </div>

//               {/* Size Column */}
//               <h3 className="font-[Poppins] font-normal text-[10px] text-[#7E838B]">
//                 {folder.size}
//               </h3>

//               {/* Share Button */}
//               <button
//                 className="bg-blue-500 text-white px-2 py-1 rounded text-[10px] font-medium"
//                 onClick={() => shareFolder(folder)}
//               >
//                 Share
//               </button>

//               {/* Delete Button */}
//               <button
//                 className="text-red-500 text-[10px] font-medium mr-[20px] lg:mr-[125px]"
//                 onClick={() => removeFolder(folder.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-[#7E838B] text-[10px] text-center mt-4">
//             No folders available.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Folders;

// import React, { useState, useEffect } from "react";
// import folderIcon from "../../assets/folder.png";
// import userIcon from "../../assets/user.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Apikit from "../../Base/Apikit"; // Make sure Apikit is properly configured to handle API requests

// const Folders = () => {
//   const [folders, setFolders] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [token, setToken] = useState(null);

//   // Fetch the token from localStorage
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//     } else {
//       toast.error("Authentication token not found.");
//     }
//   }, []);

//   // Fetch folders from the API
//   const fetchFolders = async () => {
//     if (!token) {
//       toast.error("You must be logged in to fetch folders.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await Apikit("GetFolderAction", {
//         method: "GET",
//         headers: {
//           "accept": "*/*",
//           "Authorization": `Bearer ${token}`, // Pass the token in the Authorization header
//         },
//       });

//       if (response.status === 200) {
//         setFolders(response.data.folders || []); // Update folders with data from API
//         toast.success("Folders loaded successfully!", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       } else {
//         toast.error("Failed to load folders. Please try again.", {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching folders:", error);
//       const errorMessage =
//         error.response?.data?.message || "An error occurred while fetching folders.";
//       toast.error(errorMessage, {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch folders on component mount
//   useEffect(() => {
//     if (token) {
//       fetchFolders(); // Fetch folders when the token is available
//     }
//   }, [token]);

//   const removeFolder = (id) => {
//     setFolders((prevFolders) =>
//       prevFolders.filter((folder) => folder.id !== id)
//     );
//   };

//   const shareFolder = (folder) => {
//     const shareData = {
//       title: folder.name,
//       text: `Check out this folder: ${folder.name}, last modified on ${folder.modified}, size: ${folder.size}`,
//       url: `https://example.com/folders/${folder.id}`, // Replace with your folder's actual URL
//     };

//     if (navigator.share) {
//       navigator
//         .share(shareData)
//         .then(() => toast.success("Folder shared successfully!"))
//         .catch((error) => toast.error("Error sharing folder: " + error.message));
//     } else {
//       // Fallback for unsupported browsers
//       navigator.clipboard
//         .writeText(shareData.url)
//         .then(() => toast.info("Link copied to clipboard!"))
//         .catch((error) => toast.error("Error copying link: " + error.message));
//     }
//   };

//   return (
//     <div>
//       <ToastContainer />
//       <div className="w-[80%] h-[586px] md:w-[50%] md:ml-[300px] md:h-[350px] lg:w-[72%] lg:h-[422px] border-[#EAEAEA] border lg:ml-[300px] ml-[44px] mt-[45px]">
//         {/* Header Section */}
//         <div className="grid grid-cols-6 gap-[16px] px-[18px] mt-[24px]">
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
//           <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
//             Share
//           </h3>
//           <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
//             Delete
//           </h3>
//         </div>

//         <hr className="mt-[18px]" />

//         {/* Rows Section */}
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : folders.length > 0 ? (
//           folders.map((folder) => (
//             <div
//               key={folder.id}
//               className="grid grid-cols-6 gap-[16px] px-[18px] mt-[13px] items-center"
//             >
//               {/* Name Column */}
//               <div className="flex items-center gap-1 pr-[30px]">
//                 <img
//                   className="w-[15px] h-[10px] object-contain"
//                   src={folderIcon}
//                   alt="Folder Icon"
//                 />
//                 <h3 className="font-[Poppins] text-[#7E838B] font-normal text-[10px]">
//                   {folder.name}
//                 </h3>
//               </div>

//               {/* Modified Date Column */}
//               <h3 className="font-[Poppins] font-normal text-[10px] text-[#7E838B]">
//                 {folder.modified}
//               </h3>

//               {/* Shared With Column */}
//               <div>
//                 <img
//                   className="w-[15px] h-[15px] object-contain"
//                   src={userIcon}
//                   alt="User Icon"
//                 />
//               </div>

//               {/* Size Column */}
//               <h3 className="font-[Poppins] font-normal text-[10px] text-[#7E838B]">
//                 {folder.size}
//               </h3>

//               {/* Share Button */}
//               <button
//                 className="bg-blue-500 text-white px-2 py-1 rounded text-[10px] font-medium"
//                 onClick={() => shareFolder(folder)}
//               >
//                 Share
//               </button>

//               {/* Delete Button */}
//               <button
//                 className="text-red-500 text-[10px] font-medium mr-[20px] lg:mr-[125px]"
//                 onClick={() => removeFolder(folder.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-[#7E838B] text-[10px] text-center mt-4">
//             No folders available.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Folders;


import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Apikit from "../../Base/Apikit"; // Ensure Apikit is correctly configured
import { useNavigate } from "react-router-dom";

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token (or adjust based on auth implementation)
    navigate("/login"); // Redirect to login page
  };

  const navigate = useNavigate();


  const [isMenuOpen,setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Retrieve token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error("Authentication token not found.");
    }
  }, []);

  // Fetch folders from the API
  const fetchFolders = async () => {
    if (!token) {
      toast.error("You must be logged in to fetch folders.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://proodoosfiles.onrender.com/api/all-folders/",
         {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setFolders(response.data.folders || []);
        toast.success("Folders loaded successfully!");
      } else {
        toast.error("Failed to load folders. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while fetching folders."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchFolders();
  }, [token]);

  const removeFolder = (id) => {
    setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== id));
  };

  const shareFolder = (folder) => {
    const shareData = {
      title: folder.name,
      text: `Check out this folder: ${folder.name}, last modified on ${folder.modified}, size: ${folder.size}`,
      url: `https://example.com/folders/${folder.id}`, // Replace with your folder's actual URL
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => toast.success("Folder shared successfully!"))
        .catch((error) => toast.error("Error sharing folder: " + error.message));
    } else {
      navigator.clipboard
        .writeText(shareData.url)
        .then(() => toast.info("Link copied to clipboard!"))
        .catch((error) => toast.error("Error copying link: " + error.message));
    }
  };

  const FolderRow = ({ folder }) => (
    <div
      key={folder.id}
      className="grid grid-cols-6 gap-[16px] px-[18px] mt-[13px] items-center"
    >
      <div className="flex items-center gap-1 pr-[30px]">
        <img
          className="w-[15px] h-[10px] object-contain"
          src={folderIcon}
          alt="Folder Icon"
        />
        <h3 className="font-[Poppins] text-[#7E838B] font-normal text-[10px]">
          {folder.name}
        </h3>
      </div>
      <h3 className="font-[Poppins] font-normal text-[10px] text-[#7E838B]">
        {folder.modified}
      </h3>
      <div>
        <img
          className="w-[15px] h-[15px] object-contain"
          src={userIcon}
          alt="User Icon"
        />
      </div>
      <h3 className="font-[Poppins] font-normal text-[10px] text-[#7E838B]">
        {folder.size}
      </h3>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded text-[10px] font-medium"
        onClick={() => shareFolder(folder)}
      >
        Share
      </button>
      <button
        className="text-red-500 text-[10px] font-medium mr-[20px] lg:mr-[125px]"
        onClick={() => removeFolder(folder.id)}
      >
        Remove
      </button>
    </div>
  );

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
      
      <div className="w-[80%] h-[586px] md:w-[50%] md:ml-[300px] md:h-[350px] lg:w-[72%] lg:h-[422px] border-[#EAEAEA] border lg:ml-[300px] ml-[44px] mt-[45px]">
        
        <div className="grid grid-cols-6 gap-[16px] px-[18px] mt-[24px]">
          {["Name", "Modified", "Shared With", "Size", "Share", "Delete"].map(
            (header) => (
              <h3
                key={header}
                className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left"
              >
                {header}
              </h3>
            )
          )}
        </div>
        <hr className="mt-[18px]" />
        {isLoading ? (
          <p className="text-center mt-4">Loading...</p>
        ) : folders.length > 0 ? (
          folders.map((folder) => <FolderRow key={folder.id} folder={folder} />)
        ) : (
          <p className="text-[#7E838B] text-[10px] text-center mt-4">
            No folders available.
          </p>
        )}
      </div>

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
      )}
    </div>
  );
};

export default Folders;
