import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import menuvector from "../../assets/menuvector.png";
import close from "../../assets/close.png";
import uploadcloud from "../../assets/uploadcloud.png";
import LogoutRounded from "../../assets/LogoutRounded.png";
import Home from "../../assets/Home.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State to store selected file
  const [uploadStatus, setUploadStatus] = useState(""); // State to store upload status
  const [showConfirm, setShowConfirm] = useState(false); // State for confirmation modal

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus(""); // Reset upload status on file selection
  };

  // // Handle file upload
  // const handleUpload = async () => {
  //   if (!selectedFile) {
  //     setUploadStatus("Please select a file to upload.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", selectedFile);

  //   try {
  //     setUploadStatus("Uploading...");
  //     const response = await axios.post("https://proodoosfiles.onrender.com/api/upload_file/", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     setUploadStatus("Upload successful!");
  //     console.log("Upload response:", response.data);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     setUploadStatus("Upload failed. Please try again.");
  //   }
  // };


  // Handle file upload
const handleUpload = async () => {
  if (!selectedFile) {
    setUploadStatus("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("files", selectedFile);
  formData.append("folder_id", "3fa85f64-5717-4562-b3fc-2c963f66afa6");
  formData.append("override", "false");

  try {
    setUploadStatus("Uploading...");

    // Retrieve CSRF token and authentication token from storage or context
    const csrfToken = "g"; // Replace with dynamic retrieval
    const authToken = localStorage.getItem("authToken"); // Assuming the auth token is stored in localStorage

    const response = await axios.post(
      "https://proodoosfiles.onrender.com/api/upload_file/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFTOKEN": csrfToken,
          Authorization: `Token ${authToken}`, // Include the auth token if required
        },
      }
    );

    setUploadStatus("Upload successful!");
    console.log("Upload response:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
    setUploadStatus("Upload failed. Please try again.");
  }
};


  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token (or adjust based on auth implementation)
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <Sidebar />

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

      {/* Logout button for large screens */}
      <div className="hidden lg:flex justify-end items-center px-6 py-4">
        <button
          onClick={() => setShowConfirm(true)} // Open confirmation modal
          className="bg-[#773DD3] text-white font-[Poppins] text-sm py-2 px-4  mr-[27px] mt-[20px] rounded-lg hover:bg-[#5a2aa3] transition duration-300"
        >
          Logout
        </button>
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

            <div className="flex ml-[16px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200">
              <img
                className="object-contain cursor-pointer"
                src={Home}
                alt="Dashboard"
              />
              <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-base font-normal">
                Dashboard
              </h3>
            </div>

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
              <h3 className="text-[#242424] font-[Poppins] text-base font-normal">
                Logout
              </h3>
            </div>
          </div>
        </div>
      )}

      <div className="w-[90%] ml-[20px] mt-[20px] h-[692px] lg:w-[70%] lg:h-[506px] border border-[#EAEAEA] rounded-xl lg:ml-[350px] lg:mt-[40px]">
        <div className="lg:flex justify-between items-center mt-[24px] ml-[24px] mr-[24px]">
          <div>
            <h3 className="font-[Poppins] font-normal text-base text-[#242424]">
              Personal Info
            </h3>
            <h4 className="font-[Poppins] text-sm text-[#475467]">
              Update your photo and personal details here.
            </h4>
          </div>
          <button
            onClick={handleUpload}
            className="bg-[#773DD3] text-[#ffff] pt-[10px] pb-[10px] pl-[24px] pr-[24px] rounded-lg"
          >
            Save
          </button>
        </div>

        <hr className="mt-[24px]" />

        <div className="lg:flex justify-between items-center mt-[24px] ml-[24px] mr-[24px]">
          <div>
            <h3 className="font-[Poppins] font-normal text-base text-[#242424]">
              Your photo
            </h3>
            <h4 className="font-[Poppins] text-sm text-[#475467]">
              This will be displayed on your profile.
            </h4>
          </div>
          <div className="flex justify-between gap-[35px]">
            <div className="rounded-full h-[50px] pt-3 pb-3 pl-4 pr-4 bg-[#F2F4F7]">
              JB
            </div>
          

            <div className="w-[428px] border border-[#EAEAEA] pt-[10px]">
              <label htmlFor="fileUpload" className="cursor-pointer">
                <img className="mx-auto" src={uploadcloud} alt="Upload" />
                <h3 className="text-center text-sm font-[Poppins] text-[#242424] font-medium">
                  Click to upload
                  <span className="text-xs font-normal text-[#475467]">
                    or drag and drop <br /> SVG, PNG, JPG, or GIF (max:
                    800x400px)
                  </span>
                </h3>
              </label>
              <input
                id="fileUpload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              {/* Show selected file name */}
              {selectedFile && (
                <p className="mt-2 text-sm text-center text-gray-600">
                  Selected file: {selectedFile.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Feedback message */}
        {uploadStatus && (
          <p
            className={`mt-4 text-center ${
              uploadStatus.includes("successful")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {uploadStatus}
          </p>
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

export default Logout;
