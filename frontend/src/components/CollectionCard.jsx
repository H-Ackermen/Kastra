import React, { useContext } from "react";
import { Folder, Trash,X } from "lucide-react";

import { useNavigate } from "react-router";
import { collectionContext } from "../context/CollectionContext";

const CollectionCard = ({ collection,isOwner }) => {
  const {deleteCollection,removeYourselfAsCollaborator} = useContext(collectionContext)
  console.log(collection);
  const handleRemove = async (e) => {
    e.stopPropagation();
    await removeYourselfAsCollaborator(collection._id)
  }
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
      {isOwner ? ( <button
          onClick={handleDelete}
        >
          <Trash className = 'text-red-600 text-2xl'></Trash>
        </button>) : (<button
          onClick={handleRemove}
        >
          
          <X className = 'text-red-600 text-2xl'></X>
        </button>)}
       
      </div>
    </div>
  );
};

export default CollectionCard;
