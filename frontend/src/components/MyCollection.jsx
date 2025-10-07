import React, { useContext, useEffect } from "react";
import CollectionCard from "./CollectionCard";
import { collectionContext } from "../context/CollectionContext";

const MyCollection = () => {
  const { collections, fetchCollectionByUser } = useContext(collectionContext);

   useEffect(() => {
    const fetchData = async () => {
      await fetchCollectionByUser();
    };
    fetchData();
  }, []);


  return (
    <div className="flex flex-wrap gap-4 p-4 items-center justify-center">
      {collections.length === 0 ? (
        <p>No collections yet!</p>
      ) : (
        collections.map((collection) => (
          <CollectionCard
            key={collection._id}
            collection={collection}
          />
        ))
      )}
    </div>
  );
};

export default MyCollection;
