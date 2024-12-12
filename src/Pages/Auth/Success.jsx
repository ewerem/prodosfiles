// import React, { useEffect } from 'react'
// import Menu from '../../assets/Menu.png'
// import unsplash from '../../assets/unsplash.png'
// import { useNavigate } from 'react-router-dom'

// const Success = () => {
//     const navigate = useNavigate();
//     const urlParams = new URLSearchParams(window.location.search);
//   const user_id = urlParams.get("u_info");
//     const decodedInfo = JSON.parse(user_id.replace(/'/g, '"'));
//     const token = decodedInfo.token;
//     const uidb64 = decodedInfo.u_id;
//     const value = { token, uidb64 };

//   useEffect(()=>{
//     axios.post(`https://proodoosfiles.onrender.com/api/verify`, value)
//     .then(res => {
//         console.log(res);
//         navigate('/login')
//     })
//     .catch(err => {
//         console.log(err);
//     })

//   }, [])

//   console.log(user_id);
  

//   return (
//     <div className=' w-full h-screen'>
   
//    <div className='flex justify-between items-center lg:block'>
//             <h3 className=' font-[Poppins] text-[#773DD3] text-base font-extrabold mt-[37px] ml-[24px] lg:ml-[70px] lg:mt-[40px] '>Prodos<span className='font-normal'>Files</span></h3>
//             <img className='mt-[37px] mr-[24px] lg:hidden' src = {Menu}/>
//         </div>

//         <h3 className='block  lg:hidden font-[Poppins] text-xs font-normal text-center mt-[142px] text-[#242424]'>Your account has been created <br/>
//               successfully!</h3>  
              
//               <h3 className='lg:hidden font-[Poppins] mt-[31px] text-center text-[#242424] font-semibold'>Thank You</h3>
//               <div className='lg:hidden flex justify-center '><button className='pt-[13px] pb-[13px] pl-[20px] pr-[20px] bg-[#5A7CD2] text-[white] font-normal text-xs  mt-[31px]'>Go back home</button> 
//                </div>

//                {/* big screen */}
//                <div className="hidden lg:flex lg:justify-between lg:items-center ml-[70px] mt-[84px]">
//     {/* Text Section */}
//     <div>
//       <h3 className="font-[Poppins] text-base font-normal text-[#242424]">
//         Your account has been created successfully!
//       </h3>
//       <h3 className="font-[Poppins] font-semibold text-2xl mt-[20px]">
//         Thank You
//       </h3>
//     </div>

//     {/* Image Section */}
//     <div className="object-contain mr-[76px]">
//       <img src={unsplash} alt="Thank You" />
//     </div>
//   </div>
//     <div class="hidden lg:grid place-items-center  ">
//   <button class="px-4 py-2 text-white text-[#white] bg-[#5A7CD2] rounded">Continue</button>
// </div>
// </div>
        
    
//   )
// }

// export default Success

// import React, { useEffect } from 'react';
// import axios from 'axios'; // Added axios import
// import Menu from '../../assets/Menu.png';
// import unsplash from '../../assets/unsplash.png';
// import { useNavigate } from 'react-router-dom';

// const Success = () => {
//   const navigate = useNavigate();
//   const urlParams = new URLSearchParams(window.location.search);
//   const user_id = urlParams.get("u_info");

//   // Safely parse user_id
//   let decodedInfo;
//   try {
//     decodedInfo = user_id ? JSON.parse(user_id.replace(/'/g, '"')) : null;
//   } catch (error) {
//     console.error("Error parsing user_id:", error);
//     decodedInfo = null;
//   }

//   const token = decodedInfo?.token;
//   const uidb64 = decodedInfo?.u_id;
//   const value = { token, uidb64 };

//   useEffect(() => {
//     if (!token || !uidb64) {
//       console.error("Invalid token or uidb64");
//       return;
//     }

//     axios
//       .post(`https://proodoosfiles.onrender.com/api/verify`, value)
//       .then((res) => {
//         console.log(res);
//         navigate('/login');
//       })
//       .catch((err) => {
//         console.error("Verification failed:", err);
//       });
//   }, [value, navigate, token, uidb64]);

//   console.log(user_id);

//   return (
//     <div className="w-full h-screen">
//       {/* Header Section */}
//       <div className="flex justify-between items-center lg:block">
//         <h3 className="font-[Poppins] text-[#773DD3] text-base font-extrabold mt-[37px] ml-[24px] lg:ml-[70px] lg:mt-[40px]">
//           Prodos<span className="font-normal">Files</span>
//         </h3>
//         <img
//           className="mt-[37px] mr-[24px] lg:hidden"
//           src={Menu}
//           alt="Menu"
//         />
//       </div>

//       {/* Mobile View */}
//       <h3 className="block lg:hidden font-[Poppins] text-xs font-normal text-center mt-[142px] text-[#242424]">
//         Your account has been created <br />
//         successfully!
//       </h3>
//       <h3 className="lg:hidden font-[Poppins] mt-[31px] text-center text-[#242424] font-semibold">
//         Thank You
//       </h3>
//       <div className="lg:hidden flex justify-center">
//         <button className="pt-[13px] pb-[13px] pl-[20px] pr-[20px] bg-[#5A7CD2] text-white font-normal text-xs mt-[31px]">
//           Go back home
//         </button>
//       </div>

//       {/* Desktop View */}
//       <div className="hidden lg:flex lg:justify-between lg:items-center ml-[70px] mt-[84px]">
//         {/* Text Section */}
//         <div>
//           <h3 className="font-[Poppins] text-base font-normal text-[#242424]">
//             Your account has been created successfully!
//           </h3>
//           <h3 className="font-[Poppins] font-semibold text-2xl mt-[20px]">
//             Thank You
//           </h3>
//         </div>

//         {/* Image Section */}
//         <div className="object-contain mr-[76px]">
//           <img src={unsplash} alt="Thank You" />
//         </div>
//       </div>

//       <div className="hidden lg:grid place-items-center">
//         <button className="px-4 py-2 text-white bg-[#5A7CD2] rounded">
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Success;

// import React, { useEffect } from 'react';
// import axios from 'axios';
// import Menu from '../../assets/Menu.png';
// import unsplash from '../../assets/unsplash.png';
// import { useNavigate } from 'react-router-dom';

// const Success = () => {
//   const navigate = useNavigate();
//   const urlParams = new URLSearchParams(window.location.search);
//   const user_id = urlParams.get("u_info");

//   // Safely parse user_id
//   let decodedInfo;
//   try {
//     decodedInfo = user_id ? JSON.parse(user_id.replace(/'/g, '"')) : null;
//   } catch (error) {
//     console.error("Error parsing user_id:", error);
//     decodedInfo = null;
//   }

//   const token = decodedInfo?.token;
//   const uidb64 = decodedInfo?.u_id;
//   const value = { token, uidb64 };

//   useEffect(() => {
//     if (!token || !uidb64) {
//       console.error("Invalid token or uidb64: Token:", token, "UID:", uidb64);
//       return;
//     }

//     const verifyAccount = async () => {
//       try {
//         const response = await axios.post(`https://proodoosfiles.onrender.com/api/verify?`, value);
//         console.log("Verification successful:", response);
//         navigate('/login');
//       } catch (err) {
//         console.error("Verification failed:", err.response?.data || err.message);
//       }
//     };

//     verifyAccount();
//   }, [token, uidb64, navigate]);

//   if (!decodedInfo) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center">
//         <h3 className="text-center font-[Poppins] text-[#773DD3] text-base font-extrabold">
//           Error: Invalid or missing user information.
//         </h3>
//       </div>
//     );
//   }

//   return (
//     <main className="w-full h-screen">
//       {/* Header Section */}
//       <div className="flex justify-between items-center lg:block">
//         <h3 className="font-[Poppins] text-[#773DD3] text-base font-extrabold mt-[37px] ml-[24px] lg:ml-[70px] lg:mt-[40px]">
//           Prodos<span className="font-normal">Files</span>
//         </h3>
//         <img
//           className="mt-[37px] mr-[24px] lg:hidden"
//           src={Menu}
//           alt="Menu"
//         />
//       </div>

//       {/* Mobile View */}
//       <h3 className="block lg:hidden font-[Poppins] text-xs font-normal text-center mt-[142px] text-[#242424]">
//         Your account has been created <br />
//         successfully!
//       </h3>
//       <h3 className="lg:hidden font-[Poppins] mt-[31px] text-center text-[#242424] font-semibold">
//         Thank You
//       </h3>
//       <div className="lg:hidden flex justify-center">
//         <button
//           onClick={() => navigate('/')}
//           className="pt-[13px] pb-[13px] pl-[20px] pr-[20px] bg-[#5A7CD2] text-white font-normal text-xs mt-[31px]"
//         >
//           Go back home
//         </button>
//       </div>

//       {/* Desktop View */}
//       <div className="hidden lg:flex lg:justify-between lg:items-center ml-[70px] mt-[84px]">
//         {/* Text Section */}
//         <div>
//           <h3 className="font-[Poppins] text-base font-normal text-[#242424]">
//             Your account has been created successfully!
//           </h3>
//           <h3 className="font-[Poppins] font-semibold text-2xl mt-[20px]">
//             Thank You
//           </h3>
//         </div>

//         {/* Image Section */}
//         <div className="object-contain mr-[76px]">
//           <img src={unsplash} alt="Thank You" />
//         </div>
//       </div>

//       <div className="hidden lg:grid place-items-center">
//         <button
//           onClick={() => navigate('/')}
//           className="px-4 py-2 text-white bg-[#5A7CD2] rounded"
//         >
//           Continue
//         </button>
//       </div>
//     </main>
//   );
// };

// export default Success;


import React, { useEffect } from 'react';
import axios from 'axios';
import Menu from '../../assets/Menu.png';
import unsplash from '../../assets/unsplash.png';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const user_id = urlParams.get("u_info");

  // Log user_id for debugging
  console.log("Raw user_id from URL:", user_id);

  // Safely parse user_id
  let decodedInfo = null;
  try {
    decodedInfo = user_id ? JSON.parse(user_id.replace(/'/g, '"')) : null;
    console.log("Decoded user information:", decodedInfo);
  } catch (error) {
    console.error("Error parsing user_id:", error);
  }

  const token = decodedInfo?.token;
  const uidb64 = decodedInfo?.u_id;
  const value = { token, uidb64 };

  useEffect(() => {
    if (!token || !uidb64) {
      console.error("Invalid token or uidb64: Token:", token, "UID:", uidb64);
      return;
    }

    const verifyAccount = async () => {
      try {
        const response = await axios.post(`https://proodoosfiles.onrender.com/api/verify`, value);
        console.log("Verification successful:", response);
        navigate('/login');
      } catch (err) {
        console.error("Verification failed:", err.response?.data || err.message);
      }
    };

    verifyAccount();
  }, [token, uidb64, navigate]);

  // Handle case where user_id or decodedInfo is invalid
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
    <main className="w-full h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center lg:block">
        <h3 className="font-[Poppins] text-[#773DD3] text-base font-extrabold mt-[37px] ml-[24px] lg:ml-[70px] lg:mt-[40px]">
          Prodos<span className="font-normal">Files</span>
        </h3>
        <img
          className="mt-[37px] mr-[24px] lg:hidden"
          src={Menu}
          alt="Menu"
        />
      </div>

      {/* Mobile View */}
      <h3 className="block lg:hidden font-[Poppins] text-xs font-normal text-center mt-[142px] text-[#242424]">
        Your account has been created <br />
        successfully!
      </h3>
      <h3 className="lg:hidden font-[Poppins] mt-[31px] text-center text-[#242424] font-semibold">
        Thank You
      </h3>
      <div className="lg:hidden flex justify-center">
        <button
          onClick={() => navigate('/')}
          className="pt-[13px] pb-[13px] pl-[20px] pr-[20px] bg-[#5A7CD2] text-white font-normal text-xs mt-[31px]"
        >
          Go back home
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex lg:justify-between lg:items-center ml-[70px] mt-[84px]">
        {/* Text Section */}
        <div>
          <h3 className="font-[Poppins] text-base font-normal text-[#242424]">
            Your account has been created successfully!
          </h3>
          <h3 className="font-[Poppins] font-semibold text-2xl mt-[20px]">
            Thank You
          </h3>
        </div>

        {/* Image Section */}
        <div className="object-contain mr-[76px]">
          <img src={unsplash} alt="Thank You" />
        </div>
      </div>

      <div className="hidden lg:grid place-items-center">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-white bg-[#5A7CD2] rounded"
        >
          Continue
        </button>
      </div>
    </main>
  );
};

export default Success;
