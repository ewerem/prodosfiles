import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
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
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RecycleBin = () => {
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

  

  // State to manage recycle bin items
  const [recycleBinItems, setRecycleBinItems] = useState([
    { id: 1, file_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", name: "Document 1", deletedAt: "2024-11-25" },
    { id: 2, file_id: "2fa75f64-5717-4562-b3fc-2c963f66afa7", name: "Image 2", deletedAt: "2024-11-24" },
    { id: 3, file_id: "1fa65f64-5717-4562-b3fc-2c963f66afa8", name: "Video 3", deletedAt: "2024-11-23" },
  ]);

  // State to manage authentication token
  const [token, setToken] = useState();

  // Fetch the token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      console.log(storedToken)
    } else {
      toast.error("Authentication token not found.");
    }

  }, []);


  



  // Function to restore an item (local operation)
  const restoreItem = (id) => {
    setRecycleBinItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
    alert(`Item ${id} restored successfully.`);
  };

  // Function to permanently delete an item (API call)
  const deleteItemPermanently = async (file_id, id) => {
    if (!token) {
      toast.error("You must be logged in to delete items.");
      return;
    }

    try {
      // Make the POST request to permanently delete the item
      const response = await fetch("https://proodoosfiles.onrender.com/api/fi/bin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "X-CSRFTOKEN": "5OeKiqmKEiWxPacQoMREqP0zWnDAXeOLN0kA05rIkgvsqpOZ60sgkFEqqqdhdOTU", // Assuming CSRF token is static or comes from another source
          "Authorization": `Bearer ${token}`, // Pass the token in the Authorization header
        },
        body: JSON.stringify({ file_id }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully deleted, now update the UI
        setRecycleBinItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
        toast.success(`Item ${file_id} deleted permanently.`, {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error(`Failed to delete item ${file_id}. ${data.detail || "Please try again."}`, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("An error occurred while deleting the item.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
       {/* Header for small screens */}
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

      

      <h2 className="hidden lg:block text-2xl font-bold mb-4">Recycle Bin</h2>
      {recycleBinItems.length === 0 ? (
        <p className="text-gray-500">The recycle bin is empty.</p>
      ) : (
        <div className="border border-gray-300 rounded-md p-4 md:ml-[300px] mt-8 lg:ml-[300px] ">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 font-[Poppins] font-medium text-[#242424] text-xs">Name</th>
                <th className="border-b py-2 font-[Poppins] font-medium text-[#242424] text-xs">Deleted At</th>
                <th className="border-b py-2 font-[Poppins] font-medium text-[#242424] text-xs text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recycleBinItems.map((item) => (
                <tr key={item.id} className="border-b ">
                  <td className="py-1 text-xs text-[#7E838B] font-[Poppins]">{item.name}</td>
                  <td className="py-1 text-xs text-[#7E838B] font-[Poppins]">{item.deletedAt}</td>
                  <td className="py-1 text-xs text-[#7E838B] font-[Poppins] text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded gap-2"
                      onClick={() => restoreItem(item.id)}
                    >
                      Restore
                    </button>
                    <button
                      className="bg-red-500 text-white px-1 py-1 rounded"
                      onClick={() => deleteItemPermanently(item.file_id, item.id)}
                    >
                      Delete Permanently
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

export default RecycleBin;
