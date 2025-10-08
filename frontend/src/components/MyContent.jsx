import React, { useContext, useEffect } from "react";

import { contentContext } from "../context/ContentContext";
import ContentCard from "./ContentCard";

const MyCollection = () => {
  const { contents, fetchContentByUser, removeSavedContents } = useContext(contentContext);

   useEffect(() => {
    const fetchData = async () => {
      await fetchContentByUser();
    };
    fetchData();
  }, []);

    const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this content?");
    if (confirmDelete) {
      await removeSavedContents(id);
    }
  };
  return (
    <div className="flex flex-wrap gap-4 p-4 items-center justify-center">
      {contents.length === 0 ? (
        <p>No contents yet!</p>
      ) : (
        contents.map((content) => (
         <div key={content._id} className="relative">
            <ContentCard post={content} />
            <button
              onClick={() => handleDelete(content._id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        ))
        
      )}
    
    </div>
  );
};

export default MyCollection;
