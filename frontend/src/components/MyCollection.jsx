import React, { useContext, useEffect } from "react";
import CollectionCard from "./CollectionCard";
import { collectionContext } from "../context/CollectionContext";


const MyCollection = () => {
  const {
    collections,
    collabCollections,
    fetchCollectionByUser,
    fetchCollectionByCollaborators
  } = useContext(collectionContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCollectionByUser();
      await fetchCollectionByCollaborators();
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      

      <div className="p-8">
        {/* Owner Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Your Collections
          </h2>
          {collections?.length === 0 ? (
            <p className="text-gray-400">You haven’t created any collections yet.</p>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center">
              {collections.map((collection) => (
                <CollectionCard key={collection._id} collection={collection} />
              ))}
            </div>
          )}
        </section>

        {/* Collaborator Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Collaborating In
          </h2>
          {collabCollections?.length === 0 ? (
            <p className="text-gray-400">
              You’re not a collaborator in any collections yet.
            </p>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center">
              {collabCollections.map((collection) => (
                <CollectionCard key={collection._id} collection={collection} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyCollection;
