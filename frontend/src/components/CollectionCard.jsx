import React, { useContext } from "react";
import { Folder, Trash } from "lucide-react";

import { useNavigate } from "react-router";
import { collectionContext } from "../context/CollectionContext";

const CollectionCard = ({ collection }) => {
  const {deleteCollection} = useContext(collectionContext)
  console.log(collection);
  const handleDelete = async (e) => {
    e.stopPropagation();
    await deleteCollection(collection._id)
  }
  const navigate = useNavigate()
  
  return (
    <div
      className="relative w-60 rounded-lg shadow-md overflow-hidden bg-[#3b82f6] cursor-pointer hover:shadow-xl transition-shadow"
      onClick={() => navigate(`/collections/${collection._id}`)}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Folder className="w-10 h-10 text-yellow-600" />{" "}
          {/* Brownish folder color */}
          <h2 className="text-lg font-semibold">{collection.name}</h2>
        </div>

        <button
          onClick={handleDelete}
        >
          <Trash className = 'text-2xl'></Trash>
        </button>
      </div>
    </div>
  );
};

export default CollectionCard;
