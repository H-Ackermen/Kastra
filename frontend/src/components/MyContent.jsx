import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Image as ImageIcon } from "lucide-react";
import { contentContext } from "../context/ContentContext";
import ContentCard from "./ContentCard";

const MyContent = () => {
  const { contents, fetchContentByUser,deleteContent } = useContext(contentContext);

   useEffect(() => {
    const fetchData = async () => {
      await fetchContentByUser();
    };
    fetchData();
  }, []);

    const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this content?");
    if (confirmDelete) {
      await deleteContent(id);
    }
  };
  return (
    <div className="p-6">
      {contents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="modern-card p-8 rounded-xl shadow-lg max-w-md mx-auto">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold modern-title text-gray-900 mb-2">No Content Yet</h3>
            <p className="text-gray-600 modern-subtitle">
              Start creating by uploading your first piece of content!
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {contents.map((content, index) => (
            <motion.div
              key={content._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <ContentCard post={content} />
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDelete(content._id)}
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-1 modern-subtitle"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden group-hover:inline text-sm">Delete</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyContent;
