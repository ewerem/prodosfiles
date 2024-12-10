import React, { useState } from "react";
import menuvector from "../../assets/menuvector.png";
import Home from "../../assets/Home.png";
import { Link } from "react-router-dom";
import FTP from "../../assets/FTP.png";
import Rating from "../../assets/Rating.png";
import Disposal from "../../assets/Disposal.png";
import AddFolder from "../../assets/AddFolder.png";
import LogoutRounded from "../../assets/LogoutRounded.png";
import close from "../../assets/close.png";
import Apikit from "../../Base/Apikit";
import { useNavigate } from "react-router-dom";



const Starred = () => {
  
  const [showConfirm, setShowConfirm] = useState(false);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token (or adjust based on auth implementation)
    navigate("/login"); // Redirect to login page
  };

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [folders, setFolders] = useState([
    { id: 1, name: "Games", modified: "Aug, 20, 2026", size: "3.2GB", isStarred: false },
    { id: 2, name: "Tech", modified: "Jul, 15, 2026", size: "1.5GB", isStarred: true },
    { id: 3, name: "Music", modified: "Jun, 12, 2026", size: "2.8GB", isStarred: false },
    { id: 4, name: "Pictures", modified: "May, 18, 2026", size: "4.1GB", isStarred: true },
    { id: 5, name: "Videos", modified: "Apr, 10, 2026", size: "10GB", isStarred: false },
  ]);

  const toggleStarred = async (id) => {
    const folder = folders.find((folder) => folder.id === id);
    if (!folder) return;

    try {
      // Make API call
      const updatedFolder = { id: folder.id, isStarred: !folder.isStarred };
       await Apikit("/starred-f/", updatedFolder);

      // Update UI
      setFolders((prevFolders) =>
        prevFolders.map((f) =>
          f.id === id ? { ...f, isStarred: !f.isStarred } : f
        )
      );
    } catch (error) {
      console.error("Failed to update starred status:", error);
      alert("Could not update starred status. Please try again.");
    }
  };

  return (
    <div>
      {/* Render folders */}

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

<<<<<<< HEAD
            <Link to="/Logout">
=======
            {/* <Link to="/Logout">
>>>>>>> 0058c0049cfff3030fd2718d3f3d7e7734dc6cae
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
            </Link> */}

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
      ) : null}
    
      
      <div>
        {folders.map((folder) => (
          <div key={folder.id} className="grid grid-cols-5 gap-[16px] px-[18px] mt-[43px] items-center md:ml-[350px]">
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

export default Starred;




