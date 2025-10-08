import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { collectionContext } from "../context/CollectionContext";
import ContentCard from "../components/ContentCard";
import Navbar from "../components/Navbar";
import { Trash2 } from "lucide-react";

const CollectionPage = () => {
  const { collectionId } = useParams();
  const { collections,collectionContent, fetchContentofCollection, removeContentFromCollection } = useContext(collectionContext);
  const collection = collections.find(c => c._id === collectionId);
  console.log("collection id of this collection",collectionId);

  useEffect(() => {
    fetchContentofCollection(collectionId);
  }, [collectionId]);

  const handleRemove = async (contentId) => {
    await removeContentFromCollection(collectionId, { contentId });
    // re-fetch after deletion to update the list
    fetchContentofCollection(collectionId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar /> {/* Navbar added here */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">{collection?.name}</h1>
        <div className="flex flex-wrap gap-4">
          {collectionContent.length === 0 ? (
            <p className="text-gray-400">No contents in this collection!</p>
          ) : (
            collectionContent.map((content) => (
              <div key={content._id} className="relative">
                <ContentCard post={content} />
                {/* Trash icon for removing content */}
                <button
                  onClick={() => handleRemove(content._id)}
                  className="absolute top-2 right-2 bg-red-600 p-1 rounded-full hover:bg-red-700"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
