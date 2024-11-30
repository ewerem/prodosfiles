// // import React, { useState } from "react";
// // import userprofile from "../../assets/userprofile.png";
// // import bellicon from "../../assets/bellicon.png";
// // import menuvector from "../../assets/menuvector.png";
// // import Home from "../../assets/Home.png";
// // import { Link } from "react-router-dom";
// // import FTP from "../../assets/FTP.png";
// // import Rating from "../../assets/Rating.png";
// // import Disposal from "../../assets/Disposal.png";
// // import AddFolder from "../../assets/AddFolder.png";
// // import LogoutRounded from "../../assets/LogoutRounded.png";
// // import close from "../../assets/close.png";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import Apikit from "../../Base/Apikit";


// // const Create = () => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };

// //   const [folderName, setFolderName] = useState("");
// //   const [message, setMessage] = useState("");

  

// //   const handleCreateFolder = async () => {
// //     if (!folderName.trim()) {
// //       toast.error("Folder name cannot be empty.");
// //       return;
// //     }

// //     try {
// //       const response = await Apikit ("Create")({ folderName });
// //       toast.success("Folder created successfully!");
// //     } catch (error) {
// //       toast.error(error.response?.data || "Error creating folder.");
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="flex justify-between items-center mt-[29px] lg:hidden">
// //         <p className="font-[Poppins] text-[#773DD3] text-base font-extrabold ml-[22px]">
// //           Prodoos<span className="font-light">Files</span>
// //         </p>
// //         <img
// //           className="mr-[22px] lg:hidden"
// //           src={menuvector}
// //           alt="hamburgermenuicon"
// //           onClick={toggleMenu}
// //         />
// //       </div>

// //       <div className="hidden lg:flex justify-between items-center ">
// //         <div>
// //           <input
// //             className="text-xs w-[261px] h-[40px] border border-[#EAEAEA] mb-[50px] ml-[310px] p-4 rounded-3xl font-[Poppins]"
// //             type="text"
// //             placeholder="Search"
// //           ></input>
// //         </div>
// //         <div className="mb-[30px] flex justify-center items-center gap-2 mt-[36px] mr-[59px]">
// //           <img className="object-contain mb-[50px]" src={bellicon} alt="" />
// //           <img className="object-contain mb-[50px]" src={userprofile} alt="" />
// //           <h3 className="text-[#242424] font-normal font-[Poppins] text-xs mb-[50px]">
// //             Jack Baeur
// //           </h3>
// //         </div>
// //       </div>

// //       <div className="">
// //         <input
// //           className="ml-5 mr-2- mt-2 relative mx-auto  rounded w-[90%] md:w-[55%] md:ml-[300px] lg:w-[75%]  h-[72px] lg:[100%] lg:ml-[315px] lg:mt-1 border border-[#EAEAEA] "
// //           type="text"
// //           value={folderName}
// //           onChange={(e) => setFolderName(e.target.value)}
// //         />
// //         <button
// //           onClick={handleCreateFolder}
// //           className=" absolute right-8 md:right-14 top-30 mt-6 lg:top-44 lg:right-24 lg:mt-4 mb-[19px] ml-[15px] cursor-pointer rounded Font-[Poppins] bg-[#773DD3] pb-[10px] pt-[10px] pl-[16px] pr-[16px] text-[#fff] text-[10px] font-normal"
// //         >
// //           New Folder
// //         </button>
// //         {message && <p>{message}</p>}
// //       </div>

// //       {isMenuOpen ? (
// //         <div>
// //           <div
// //             className="bg-[#344054B2] opacity-70 w-[100%] h-full fixed top-0 left-0 lg:hidden"
// //             onClick={toggleMenu}
// //           ></div>
// //           <div className="bg-[#fff] w-[272px] h-[100%] fixed left-0 top-0 z-50 lg:hidden">
// //             <div className="flex justify-between items-center ">
// //               <p className=" mt-[22px] font-[Poppins] text-[#773DD3] text-base font-extrabold ml-[22px]">
// //                 Prodoos<span className="font-light">Files</span>
// //               </p>
// //               <img
// //                 className="mt-[28px] mr-[20px]"
// //                 src={close}
// //                 alt=""
// //                 onClick={toggleMenu}
// //               />
// //             </div>

// //             <div className="flex ml-[16px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200 ">
// //               <img
// //                 className="object-contain cursor-pointer"
// //                 src={Home}
// //                 alt=""
// //               />
// //               <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-sm font-normal">
// //                 Dashboard
// //               </h3>
// //             </div>

// //             <Link to="/Folders">
// //               <div className="flex ml-[16px] mt-[25px]">
// //                 <img
// //                   className="object-contain cursor-pointer"
// //                   src={FTP}
// //                   alt=""
// //                 />
// //                 <h3 className="text-[#242424]  cursor-pointer font-[Poppins] text-sm font-normal">
// //                   Folders
// //                 </h3>
// //               </div>
// //             </Link>

// //             <Link to="/Starred">
// //               <div className="flex ml-[16px] mt-[25px]">
// //                 <img
// //                   className="object-contain cursor-pointer"
// //                   src={Rating}
// //                   alt=""
// //                 />
// //                 <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-sm font-normal">
// //                   Starred
// //                 </h3>
// //               </div>
// //             </Link>

// //             <Link to="/RecycleBin">
// //               <div className="flex ml-[16px] mt-[25px]">
// //                 <img
// //                   className="object-contain cursor-pointer"
// //                   src={Disposal}
// //                   alt=""
// //                 />
// //                 <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-sm font-normal">
// //                   Recycle Bin
// //                 </h3>
// //               </div>
// //             </Link>

// //             <Link to="/Create">
// //               <div className="flex ml-[16px] mt-[25px]">
// //                 <img
// //                   className="object-contain cursor-pointer"
// //                   src={AddFolder}
// //                   alt=""
// //                 />
// //                 <h3 className="text-[#242424]  cursor-pointer font-[Poppins] text-sm font-normal">
// //                   Create
// //                 </h3>
// //               </div>
// //             </Link>

// //             <Link to="/Logout">
// //               <div className="flex ml-[16px] mt-[25px]">
// //                 <img
// //                   className="object-contain cursor-pointer"
// //                   src={LogoutRounded}
// //                   alt=""
// //                 />
// //                 <h3 className="text-[#242424] font-[Poppins] text-sm font-normal cursor-pointer">
// //                   Logout
// //                 </h3>
// //               </div>
// //             </Link>
// //           </div>
// //         </div>
// //       ) : null}
// //     </div>
// //   );
// // };

// // export default Create;


// import React, { useState } from "react";
// import userprofile from "../../assets/userprofile.png";
// import bellicon from "../../assets/bellicon.png";
// import menuvector from "../../assets/menuvector.png";
// import Home from "../../assets/Home.png";
// import { Link } from "react-router-dom";
// import FTP from "../../assets/FTP.png";
// import Rating from "../../assets/Rating.png";
// import Disposal from "../../assets/Disposal.png";
// import AddFolder from "../../assets/AddFolder.png";
// import LogoutRounded from "../../assets/LogoutRounded.png";
// import close from "../../assets/close.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Apikit from "../../Base/Apikit";

// const Create = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [folderName, setFolderName] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleCreateFolder = async () => {
//     // Input validation
//     if (!folderName.trim()) {
//       toast.error("Folder name cannot be empty.");
//       return;
//     }

//     if (folderName.length > 100) {
//       toast.error("Folder name must be under 100 characters.");
//       return;
//     }

//     setIsLoading(true); // Set loading state

    

//     try {
//       // API call using Apikit
//       const response = await Apikit("Create")({ folderName });
//       toast.success(response.message || "Folder created successfully!");
//       setFolderName(""); // Reset input field
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || error.message || "Error creating folder.";
//       toast.error(errorMsg);
//     } finally {
//       setIsLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div>
//       <div className="  flex justify-between items-center mt-[29px] lg:hidden">
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

//       <div className="hidden lg:flex justify-between items-center">
//         <div>
//           <input
//             aria-label="Search"
//             className="text-xs w-[261px] h-[40px] border border-[#EAEAEA] mb-[50px] ml-[310px] p-4 rounded-3xl font-[Poppins]"
//             type="text"
//             placeholder="Search"
//           />
//         </div>
//         <div className="mb-[30px] flex justify-center items-center gap-2 mt-[36px] mr-[59px]">
//           <img className="object-contain mb-[50px]" src={bellicon} alt="" />
//           <img className="object-contain mb-[50px]" src={userprofile} alt="" />
//           <h3 className="text-[#242424] font-normal font-[Poppins] text-xs mb-[50px]">
//             Jack Baeur
//           </h3>
//         </div>
//       </div>

//       <div>
//         <input
//           aria-label="Folder Name"
//           className="ml-5 mr-2 mt-2 relative mx-auto rounded w-[90%] md:w-[55%] md:ml-[300px] lg:w-[75%] h-[72px] lg:[100%] lg:ml-[315px] lg:mt-1 border border-[#EAEAEA]"
//           type="text"
//           value={folderName}
//           onChange={(e) => setFolderName(e.target.value)}
//           placeholder="Enter folder name"
//         />
//         <button
//           aria-label="Create New Folder"
//           onClick={handleCreateFolder}
//           disabled={isLoading}
//           className={`absolute right-8 md:right-14 top-30 mt-6 lg:top-44 lg:right-24 lg:mt-4 mb-[19px] ml-[15px] cursor-pointer rounded font-[Poppins] bg-[#773DD3] pb-[10px] pt-[10px] pl-[16px] pr-[16px] text-[#fff] text-[10px] font-normal ${
//             isLoading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {isLoading ? "Creating..." : "New Folder"}
//         </button>
//       </div>

//       {isMenuOpen && (
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
//                 alt=""
//                 onClick={toggleMenu}
//               />
//             </div>
//             {/* Menu Links */}
//             <div className="flex flex-col">
//               <Link to="/Folders">
//                 <div className="flex ml-[16px] mt-[25px]">
//                   <img className="object-contain cursor-pointer" src={FTP} alt="" />
//                   <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-sm font-normal">
//                     Folders
//                   </h3>
//                 </div>
//               </Link>
//               {/* Add other links here */}
//             </div>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Create;

import React, { useState } from "react";
import userprofile from "../../assets/userprofile.png";
import bellicon from "../../assets/bellicon.png";
import menuvector from "../../assets/menuvector.png";
import Home from "../../assets/Home.png";
import { Link } from "react-router-dom";
import FTP from "../../assets/FTP.png";
import Rating from "../../assets/Rating.png";
import Disposal from "../../assets/Disposal.png";
import AddFolder from "../../assets/AddFolder.png";
import LogoutRounded from "../../assets/LogoutRounded.png";
import close from "../../assets/close.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Apikit from "../../Base/Apikit";

const Create = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const handleCreateFolder = async () => {
  //   if (!folderName.trim()) {
  //     toast.error("Folder name cannot be empty.");
  //     return;
  //   }

  //   if (folderName.length > 100) {
  //     toast.error("Folder name must be under 100 characters.");
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     // Adjust API call parameters as needed
  //     // const response = await Apikit("Create")({
  //     //   folder_name: folderName,
  //     //   parent_folder_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //     // });

  //     const response = await Apikit({
  //       endpoint:"/create-f/",
  //       method:"Get",
  //       data: {parent_folder_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"},
  //     });

  //     toast.success(response.message || "Folder created successfully!");
  //     setFolderName(""); // Reset folder name field
  //   } catch (error) {
  //     const errorMsg = error.response?.data?.message || error.message || "Error creating folder.";
  //     toast.error(errorMsg);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      toast.error("Folder name cannot be empty.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch("https://proodoosfiles.onrender.com/api/create-f/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          folder_name: folderName,
          parent_folder_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Error creating folder.");
      }
  
      toast.success("Folder created successfully!");
      setFolderName(""); // Reset the folder name
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mt-[29px] lg:hidden">
        <p className="font-[Poppins] text-[#773DD3] text-base font-extrabold ml-[22px]">
          Prodoos<span className="font-light">Files</span>
        </p>
        <img
          className="mr-[22px] lg:hidden cursor-pointer"
          src={menuvector}
          alt="Menu Icon"
          onClick={toggleMenu}
        />
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex justify-between items-center">
        <div>
          <input
            aria-label="Search"
            className="text-xs w-[261px] h-[40px] border border-[#EAEAEA] mb-[50px] ml-[310px] p-4 rounded-3xl font-[Poppins]"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="mb-[30px] flex justify-center items-center gap-2 mt-[36px] mr-[59px]">
          <img className="object-contain mb-[50px]" src={bellicon} alt="Bell Icon" />
          <img className="object-contain mb-[50px]" src={userprofile} alt="User Profile" />
          <h3 className="text-[#242424] font-normal font-[Poppins] text-xs mb-[50px]">
            Jack Baeur
          </h3>
        </div>
      </div>

      {/* Folder Name Input */}
      <div>
        <input
          aria-label="Folder Name"
          className="ml-5 mt-1 p-3 text-xs relative mx-auto rounded w-[90%]  md:ml-[310px] md:w-[55%] lg:ml-[310px] lg:w-[72%] h-[72px] border border-[#EAEAEA]"
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Enter folder name"
        />
        <button
          aria-label="Create New Folder"
          onClick={handleCreateFolder}
          disabled={isLoading}
          className={`absolute right-8 md:right-14 top-30 mt-6 lg:top-44 lg:right-24 lg:mt-4 mb-[19px] ml-[15px] cursor-pointer rounded font-[Poppins] bg-[#773DD3] pb-[10px] pt-[10px] pl-[16px] pr-[16px] text-[#fff] text-[10px] font-normal ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Creating..." : "New Folder"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div>
          <div
            className="bg-[#344054B2] opacity-70 w-full h-full fixed top-0 left-0 lg:hidden"
            onClick={toggleMenu}
          ></div>
          <div className="bg-white w-[272px] h-full fixed left-0 top-0 z-50 lg:hidden">
            <div className="flex justify-between items-center">
              <p className="mt-[22px] font-[Poppins] text-[#773DD3] text-base font-extrabold ml-[22px]">
                Prodoos<span className="font-light">Files</span>
              </p>
              <img
                className="mt-[28px] mr-[20px] cursor-pointer"
                src={close}
                alt="Close Menu"
                onClick={toggleMenu}
              />
            </div>
            {/* Menu Links */}
            <div className="flex flex-col">
              <Link to="/Folders">
                <div className="flex ml-[16px] mt-[25px]">
                  <img className="object-contain cursor-pointer" src={FTP} alt="Folders Icon" />
                  <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-sm font-normal">
                    Folders
                  </h3>
                </div>
              </Link>
              {/* Add other links here */}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Create;
