// import React, { useState } from "react";

// const RecycleBin = () => {
//   // State to manage recycle bin items
//   const [recycleBinItems, setRecycleBinItems] = useState([
//     { id: 1, name: "Document 1", deletedAt: "2024-11-25" },
//     { id: 2, name: "Image 2", deletedAt: "2024-11-24" },
//     { id: 3, name: "Video 3", deletedAt: "2024-11-23" },
//   ]);

//   // Function to restore an item
//   const restoreItem = (id) => {
//     setRecycleBinItems((prevItems) =>
//       prevItems.filter((item) => item.id !== id)
//     );
//     alert(`Item ${id} restored successfully.`);
//   };

//   // Function to permanently delete an item
//   const deleteItemPermanently = (id) => {
//     setRecycleBinItems((prevItems) =>
//       prevItems.filter((item) => item.id !== id)
//     );
//     alert(`Item ${id} deleted permanently.`);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="hidden lg:block text-2xl font-bold mb-4">Recycle Bin</h2>
//       {recycleBinItems.length === 0 ? (
//         <p className="text-gray-500">The recycle bin is empty.</p>
//       ) : (
//         <div className="border border-gray-300 rounded-md p-4 md:ml-[300px] mt-8 lg:ml-[300px] ">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr>
//                 <th className="border-b py-2 font-[Poppins] font-medium text-[#242424] text-xs ">Name</th>
//                 <th className="border-b py-2 font-[Poppins] font-medium text-[#242424] text-xs">Deleted At</th>
//                 <th className="border-b py-2 font-[Poppins] font-medium text-[#242424] text-xs text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recycleBinItems.map((item) => (
//                 <tr key={item.id} className="border-b ">
//                   <td className="py-1 text-xs text-[#7E838B] font-[Poppins]">{item.name}</td>
//                   <td className="py-1 text-xs text-[#7E838B] font-[Poppins]">{item.deletedAt}</td>
//                   <td className="py-1 text-xs text-[#7E838B] font-[Poppins] text-center">
//                     <button
//                       className="bg-blue-500 text-white px-4 py-1 rounded gap-2 "
//                       onClick={() => restoreItem(item.id)}
//                     >
//                       Restore
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-1 py-1 rounded"
//                       onClick={() => deleteItemPermanently(item.id)}
//                     >
//                       Delete Permanently
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecycleBin;


import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecycleBin = () => {
  // State to manage recycle bin items
  const [recycleBinItems, setRecycleBinItems] = useState([
    { id: 1, file_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", name: "Document 1", deletedAt: "2024-11-25" },
    { id: 2, file_id: "2fa75f64-5717-4562-b3fc-2c963f66afa7", name: "Image 2", deletedAt: "2024-11-24" },
    { id: 3, file_id: "1fa65f64-5717-4562-b3fc-2c963f66afa8", name: "Video 3", deletedAt: "2024-11-23" },
  ]);

  // State to manage authentication token
  const [token, setToken] = useState(null);

  // Fetch the token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
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
          "X-CSRFTOKEN": "5OeKiqmKEiWxPacQoMREqP0zWnDAXeOLN0kA05rIkgvsqpOZ60sgkFEqqqdhdOTU", // Assuming CSRF token is static or comes from another source
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
    </div>
  );
};

export default RecycleBin;
