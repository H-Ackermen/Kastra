import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { collectionContext } from "../context/CollectionContext";
import ContentCard from "../components/ContentCard";

const CollectionPage = () => {
  const { collectionId } = useParams();
  const { fetchContentofCollection, collectionContent } = useContext(collectionContext);

    useEffect(() => {
    const fetchData = async () => {
      await fetchContentofCollection();
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Collection Contents</h1>
      <div className="grid grid-cols-3 gap-4">
        {collectionContent.length === 0 ? (
          <p>No content in this collection yet.</p>
        ) : (
          collectionContent.map((content) => (
           <ContentCard key={content._id} content={content} />
          ))
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
