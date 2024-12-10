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
          Authorization: `Token ${token}`,
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
