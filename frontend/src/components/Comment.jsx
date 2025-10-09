import React, { useContext } from "react";
import { Trash } from "lucide-react";
import { authContext } from "../context/AuthContext";

const Comment = ({ text, commentedby, time, commentId, handleDelete }) => {
  const { user } = useContext(authContext);

  // Convert timestamp to DD/MM/YYYY
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full p-3 border-b border-gray-700 flex justify-between items-start text-black">
      {/* Left section - Comment content */}
      <div className="flex flex-col">
        <p className="text-black text-sm">{text}</p>
        <div className="flex items-center gap-2 text-xs text-black mt-1">
          <span className="font-medium text-black">{commentedby}</span>
          <span>•</span>
          <span className="text-black">{formatDate(time)}</span>
        </div>
      </div>

      {/* Right section - Delete icon */}
      {user?.username === commentedby && (
        <Trash
          className="text-red-600 hover:text-red-500 cursor-pointer transition-all"
          size={18}
          onClick={async () => await handleDelete(commentId)}
        />
      )}
    </div>
  );
};

export default Comment;
