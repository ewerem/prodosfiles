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
import folder from "../../assets/folder.png";
import starred from "../../assets/starred.png";

const Create = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();
  const [folders, setFolders] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token (or adjust based on auth implementation)
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
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
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            folder_name: folderName.trim(),
            parent_folder_id: selectedParentId, // Add parent folder ID
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.message || `Failed with status code ${response.status}`;
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

  const handleShareFolder = async (folderId, sharedWithEmail) => {
    if (!folderId) {
      toast.error("Folder ID cannot be empty.");
      return;
    }

    if (!sharedWithEmail.trim()) {
      toast.error("Shared email cannot be empty.");
      return;
    }

    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://proodoosfiles.onrender.com/api/fo/sharing/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            folder_id: folderId,
            shared_with_email: sharedWithEmail.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.message || `Failed with status code ${response.status}`;
        throw new Error(errorMessage);
      }

      toast.success("Folder shared successfully!");
    } catch (error) {
      console.error("Error during folder sharing:", error);
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

      {/* Toast Notification */}
      <ToastContainer />

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

            {/* Example Links */}
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

            <div
              className="flex ml-[16px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200 cursor-pointer"
              onClick={() => setShowConfirm(true)} // Open confirmation modal
            >
              <img
                className="object-contain"
                src={LogoutRounded}
                alt="Logout"
              />
              <h3 className="text-[#242424] font-[Poppins] text-base font-normal">
                Logout
              </h3>
            </div>
          </div>
        </div>
      )}

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

export default Create;
