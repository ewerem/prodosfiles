import React, { useEffect } from 'react';
import axios from 'axios';
import Menu from '../../assets/Menu.png';
import unsplash from '../../assets/unsplash.png';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const user_id = urlParams.get("u_info");

  console.log("Raw user_id from URL:", user_id);

  let decodedInfo = null;
  try {
    if (!user_id) {
      throw new Error("user_id is missing in the URL");
    }

    // Decode the Base64 string
    const decodedString = atob(user_id);
    console.log("Decoded Base64 string:", decodedString);

    // Parse the decoded string to JSON
    decodedInfo = JSON.parse(decodedString.replace(/'/g, '"'));
    console.log("Parsed JSON data:", decodedInfo);
  } catch (error) {
    console.error("Error decoding or parsing user_id:", error);
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");    
    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error("Authentication token not found.");
    }
  }, []);

  // Extract token and u_id safely
  const token = decodedInfo?.token || null;
  const uidb64 = decodedInfo?.u_id || null;

  // Log extracted values
  console.log("Extracted token:", token);
  console.log("Extracted uidb64:", uidb64);

  // Extract keys if `decodedInfo` is valid
  const keys = decodedInfo ? Object.keys(decodedInfo) : [];
  console.log("Extracted keys from decodedInfo:", keys);

  useEffect(() => {
    if (!token || !uidb64) {
      console.error("Invalid token or uidb64. Token:", token, "UID:", uidb64);
      return;
    }

     // Store the token and uidb64 in localStorage if valid
         localStorage.setItem("authToken", token);
         localStorage.setItem("userId", uidb64);

           console.log(authToken);
           console.log(uidb64);

    const verifyAccount = async () => {
      try {
        const response = await axios.post(`https://proodoosfiles.onrender.com/api/verify/`, {
          token,
          uidb64,
        });
        console.log("Verification successful:", response.data);
        navigate('/login');
      } catch (err) {
        console.error("Verification failed:", err.response?.data || err.message);
      }
    };

    verifyAccount();
  }, [token, uidb64, navigate]);

      

  if (!decodedInfo) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h3 className="text-center font-[Poppins] text-[#773DD3] text-base font-extrabold">
          Error: Invalid or missing user information. Please try again.
        </h3>
      </div>
    );
  }

  return (
    <div>
      
    </div>
  )
}

export default Success
