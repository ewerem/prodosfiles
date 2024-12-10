// import React, { useState } from "react";
// import folderIcon from "../../assets/folder.png";
// import userIcon from "../../assets/user.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Folders = () => {
//   const [folders, setFolders] = useState([
//     { id: 1, name: "Games", modified: "Aug, 20, 2026", size: "3.2GB" },
//     { id: 2, name: "Tech", modified: "Jul, 15, 2026", size: "1.5GB" },
//     { id: 3, name: "Music", modified: "Jun, 12, 2026", size: "2.8GB" },
//     { id: 4, name: "Pictures", modified: "May, 18, 2026", size: "4.1GB" },
//     { id: 5, name: "Videos", modified: "Apr, 10, 2026", size: "10GB" },
//   ]);

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
//       <div className="w-[80%] h-[586px] md:w-[50%] md:ml-[300px] md:h-[350px] lg:w-[72%] lg:h-[422px] border-[#EAEAEA] border lg:ml-[300px] ml-[44px]">
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
//                 className="bg-blue-500 text-white px-2 py-1 rounded text-[10px]  font-medium"
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
import Apikit from '../../Base/Apikit';
import React, { useState, useEffect } from "react";
import folderIcon from "../../assets/folder.png";
import userIcon from "../../assets/user.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetFolderAction } from "../../Base/data";
import menuvector from "../../assets/menuvector.png";
import Home from "../../assets/Home.png";
import { Link } from "react-router-dom";
import FTP from "../../assets/FTP.png";
import Rating from "../../assets/Rating.png";
import Disposal from "../../assets/Disposal.png";
import AddFolder from "../../assets/AddFolder.png";
import LogoutRounded from "../../assets/LogoutRounded.png";
import close from "../../assets/close.png";

const Folders = () => {
  const [folders, setFolders] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch folders from API
  const fetchFolders = async () => {
    try {
      const response = await GetFolderAction(); // Make the GET request
      if (response.status === 200) {
        setFolders(response.data.folders || []); // Update folders with data from API
        toast.success("Folders loaded successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error("Failed to load folders. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred while fetching folders.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  // Fetch folders on component mount
  useEffect(() => {
    fetchFolders();
  }, []);

  const removeFolder = (id) => {
    setFolders((prevFolders) =>
      prevFolders.filter((folder) => folder.id !== id)
    );
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
      // Fallback for unsupported browsers
      navigator.clipboard
        .writeText(shareData.url)
        .then(() => toast.info("Link copied to clipboard!"))
        .catch((error) => toast.error("Error copying link: " + error.message));
    }
  };

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
      <div className=" mt-[30px] w-[80%] h-[586px] md:w-[50%] md:ml-[300px] md:h-[350px] lg:w-[72%] lg:h-[422px] border-[#EAEAEA] border lg:ml-[300px] ml-[44px]">
        {/* Header Section */}
        <div className="grid grid-cols-5 gap-[16px] px-[18px] mt-[24px]">
          <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal  text-left">
            Name
          </h3>
          <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
            Modified
          </h3>
          <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
            Shared With
          </h3>
          <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
            Size
          </h3>
          {/* <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
            Share
          </h3> */}
          <h3 className="font-[Poppins] text-[#7E838B] text-[10px] font-normal text-left">
            Delete
          </h3>
        </div>

        <hr className="mt-[18px]" />

        {/* Rows Section */}
        {folders.length > 0 ? (
          folders.map((folder) => (
            <div
              key={folder.id}
              className="grid grid-cols-6 gap-[16px] px-[18px] mt-[13px] items-center"
            >
              {/* Name Column */}
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

              {/* Modified Date Column */}
              <h3 className="font-[Poppins] font-normal text-[10px] text-[#7E838B]">
                {folder.modified}
              </h3>

              {/* Shared With Column */}
              <div>
                <img
                  className="w-[15px] h-[15px] object-contain"
                  src={userIcon}
                  alt="User Icon"
                />
              </div>

              {/* Size Column */}
              <h3 className="font-[Poppins] font-normal text-[10px] text-[#7E838B]">
                {folder.size}
              </h3>

              {/* Share Button */}
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded text-[10px] font-medium"
                onClick={() => shareFolder(folder)}
              >
                Share
              </button>

              {/* Delete Button */}
              <button
                className="text-red-500 text-[10px] font-medium mr-[20px] lg:mr-[125px]"
                onClick={() => removeFolder(folder.id)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-[#7E838B] text-[10px] text-center mt-4">
            No folders available.
          </p>
        )}
      </div>
      {isMenuOpen ? (
        <div>
          <div
            className="bg-[#344054B2] opacity-70 w-[100%] h-full fixed top-0 left-0 lg:hidden"
            onClick={toggleMenu}
          ></div>
          <div className="bg-[#fff] w-[272px] h-[100%] fixed left-0 top-0 z-50 lg:hidden">
            <div className="flex justify-between items-center ">
              <p className=" mt-[22px] font-[Poppins] text-[#773DD3] text-base font-extrabold ml-[22px]">
                Prodoos<span className="font-light">Files</span>
              </p>
              <img
                className="mt-[28px] mr-[20px]"
                src={close}
                alt=""
                onClick={toggleMenu}
              />
            </div>

            <div className="flex ml-[16px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200 ">
              <img
                className="object-contain cursor-pointer"
                src={Home}
                alt=""
              />
              <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-sm font-normal">
                Dashboard
              </h3>
            </div>

            <Link to="/Folders">
              <div className="flex ml-[16px] mt-[25px]">
                <img
                  className="object-contain cursor-pointer"
                  src={FTP}
                  alt=""
                />
                <h3 className="text-[#242424]  cursor-pointer font-[Poppins] text-sm font-normal">
                  Folders
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

            <Link to="/Logout">
              <div className="flex ml-[16px] mt-[25px]">
                <img
                  className="object-contain cursor-pointer"
                  src={LogoutRounded}
                  alt=""
                />
                <h3 className="text-[#242424] font-[Poppins] text-sm font-normal cursor-pointer">
                  Logout
                </h3>
              </div>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Folders;

