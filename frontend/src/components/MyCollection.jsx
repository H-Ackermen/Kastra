import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Grid3x3, Users } from "lucide-react";
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
    <div className="p-6">
      {/* Owner Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-semibold modern-title text-gray-900 mb-6 flex items-center gap-2">
          <Grid3x3 className="w-6 h-6 text-indigo-600" />
          Your Collections
        </h2>
        {collections?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
            <div className="modern-card p-6 rounded-xl shadow-lg max-w-md mx-auto">
              <Grid3x3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 modern-subtitle">You haven't created any collections yet.</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <motion.div
                key={collection._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CollectionCard collection={collection} isOwner={1} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Collaborator Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-semibold modern-title text-gray-900 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600" />
          Collaborating In
        </h2>
        {collabCollections?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
            <div className="modern-card p-6 rounded-xl shadow-lg max-w-md mx-auto">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 modern-subtitle">
                You're not a collaborator in any collections yet.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collabCollections.map((collection, index) => (
              <motion.div
                key={collection._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CollectionCard collection={collection} isOwner={0} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default MyCollection;
