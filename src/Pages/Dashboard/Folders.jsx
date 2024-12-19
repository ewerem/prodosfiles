import React, { useState, useEffect } from "react";
import folderIcon from "../../assets/folder.png";
import userIcon from "../../assets/user.png";
import menuvector from "../../assets/menuvector.png";
import close from "../../assets/close.png";
import LogoutRounded from "../../assets/LogoutRounded.png";
import Home from "../../assets/Home.png";
import Rating from "../../assets/Rating.png";
import Disposal from "../../assets/Disposal.png";
import AddFolder from "../../assets/AddFolder.png";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
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
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFolders(data || []);
        toast.success("Folders loaded successfully!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to load folders. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
      toast.error("An error occurred while fetching folders.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchFolders();
  }, [token]);

  const removeFolder = async (id) => {
    if (!id) {
      toast.error("Folder ID is missing.");
      return;
    }

    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://proodoosfiles.onrender.com/api/fo/del/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            parent_folder_id: parentFolderId, // Add parent folder ID
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.message || `Failed to delete folder with status ${response.status}`;
        throw new Error(errorMessage);
      }

      setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== id));
      toast.success("Folder deleted successfully!");
    } catch (error) {
      console.error("Error during folder deletion:", error);
      toast.error(error.message || "An error occurred while deleting the folder.");
    } finally {
      setIsLoading(false);
    }
  };

  const shareFolder = (folder) => {
    const shareData = {
      title: folder.name,
      text: `Check out this folder: ${folder.name}, last modified on ${folder.modified}, size: ${folder.size}`,
      url: `https://example.com/folders/${folder.id}`,
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
    </div>
  );
};

export default Folders;

