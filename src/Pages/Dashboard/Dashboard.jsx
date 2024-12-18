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

const Dashboard = () => {
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


  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token (or adjust based on auth implementation)
    navigate("/login"); // Redirect to login page
  };

  const navigate = useNavigate();


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleShare = (fileId) => setShareModal({ isOpen: true, fileId });

  const confirmShare = async () => {
    if (!shareWith.trim()) {
      alert("Please enter a valid user to share with.");
      return;
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
      await axios.post(`/api/share`, {
        fileId: shareModal.fileId,
        shareWith,
      });
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

