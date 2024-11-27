import React, { useState } from "react";

const RecycleBin = () => {
  // State to manage recycle bin items
  const [recycleBinItems, setRecycleBinItems] = useState([
    { id: 1, name: "Document 1", deletedAt: "2024-11-25" },
    { id: 2, name: "Image 2", deletedAt: "2024-11-24" },
    { id: 3, name: "Video 3", deletedAt: "2024-11-23" },
  ]);

  // Function to restore an item
  const restoreItem = (id) => {
    setRecycleBinItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
    alert(`Item ${id} restored successfully.`);
  };

  // Function to permanently delete an item
  const deleteItemPermanently = (id) => {
    setRecycleBinItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
    alert(`Item ${id} deleted permanently.`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recycle Bin</h2>
      {recycleBinItems.length === 0 ? (
        <p className="text-gray-500">The recycle bin is empty.</p>
      ) : (
        <div className="border border-gray-300 rounded-md p-4 lg:ml-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2">Name</th>
                <th className="border-b py-2">Deleted At</th>
                <th className="border-b py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recycleBinItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.deletedAt}</td>
                  <td className="py-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                      onClick={() => restoreItem(item.id)}
                    >
                      Restore
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded"
                      onClick={() => deleteItemPermanently(item.id)}
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
