import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import ContentCard from "../components/ContentCard";
import Navbar from "../components/Navbar";
import { contentContext } from "../context/ContentContext";

const ExplorePage = () => {
  const { searchContent, contents, fetchAllContent } = useContext(contentContext);
  const [isFiltered, setIsFiltered] = useState(false); // track if user searched

  const handleSearch = async (queryType, queryValue) => {
    await searchContent(queryType, queryValue);
    setIsFiltered(true);
  };

  const handleReset = async () => {
    await fetchAllContent();
    setIsFiltered(false);
  };

  useEffect(() => {
    fetchAllContent();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 modern-pattern">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold modern-title text-gray-900 mb-4">
            <span className="modern-text">Explore</span> Creative Works
          </h1>
          <p className="text-gray-600 modern-subtitle max-w-2xl mx-auto">
            Discover amazing creations from our community of artists and creators
          </p>
        </div>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center items-center gap-4 mb-8"
      >
        <SearchBar onSearch={handleSearch} isFiltered={isFiltered} handleReset={handleReset}/>
      </motion.div>

      {/* Content Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container mx-auto px-6 pb-8"
      >
        {contents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {contents.map((content, index) => (
              <motion.div
                key={content._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <ContentCard post={content} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="modern-card p-8 rounded-xl shadow-lg max-w-md mx-auto">
              <p className="text-gray-600 modern-subtitle text-lg">
                {isFiltered ? "No content found matching your search." : "No content available yet."}
              </p>
              {isFiltered && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="mt-4 px-6 py-2 modern-button text-white modern-subtitle rounded-lg"
                >
                  Clear Search
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ExplorePage;
