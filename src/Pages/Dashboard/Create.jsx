import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import userprofile from "../../assets/userprofile.png";
import bellicon from "../../assets/bellicon.png";
import FTP from "../../assets/FTP.png";
import menuvector from "../../assets/menuvector.png";
import close from "../../assets/close.png";
import uploadcloud from "../../assets/uploadcloud.png";
import LogoutRounded from "../../assets/LogoutRounded.png";
import Home from "../../assets/Home.png";
import Rating from "../../assets/Rating.png";
import Disposal from "../../assets/Disposal.png";
import AddFolder from "../../assets/AddFolder.png";

const Create = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();

  

  useEffect(() => {
    // Retrieve the token stored in localStorage
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error("Authentication token not found.");
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      toast.error("Folder name cannot be empty.");
      return;
    }

    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://proodoosfiles.onrender.com/api/create-f/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, // Corrected template string
          },
          body: JSON.stringify({
            folder_name: folderName,
            parent_folder_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.message || `Failed with status code ${response.status}`; // Corrected string interpolation
        throw new Error(errorMessage);
      }

      toast.success("Folder created successfully!");
      setFolderName("");
    } catch (error) {
      console.error("Error during folder creation:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const [showConfirm, setShowConfirm] = useState(false);

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

      {/* Folder Name Input */}
      <div>
        <input
          aria-label="Folder Name"
          className="ml-5 mt-1 p-3 text-xs relative mx-auto rounded w-[90%] md:w-[60%] lg:w-[72%] h-[72px] lg:mt-28 lg:ml-[320px] md:ml-[300px] border border-[#EAEAEA]"
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Enter folder name"
        />
        <button
          aria-label="Create New Folder"
          onClick={handleCreateFolder}
          disabled={isLoading}
          className={`absolute right-8 mt-6 cursor-pointer pt-3 pl-4 pr-4 pb-3 rounded  lg:mr-[20px]  lg:mt-32 bg-[#773DD3] text-white text-[10px] ${
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
            className="bg-[#344054B2] opacity-70 w-full h-full fixed top-0 left-0"
            onClick={toggleMenu}
          ></div>
          <div className="bg-white w-[272px] h-full fixed left-0 top-0 z-50">
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
            {/* <div className="flex flex-col">
              <Link to="/Folders">
                <div className="flex ml-[16px] mt-[25px]">
                  <img
                    className="object-contain cursor-pointer"
                    src={FTP}
                    alt="Folders Icon"
                  />
                  <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-sm font-normal">
                    Folders
                  </h3>
                </div>
              </Link>
            </div> */}
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
                className="mt-[28px] mr-[20px] cursor-pointer"
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
    
      <ToastContainer />
    </div>
    )}
    </div>
            
  );
};

export default Create;
