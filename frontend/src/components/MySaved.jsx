import React, { useContext, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Bookmark, Heart } from 'lucide-react';
import { contentContext } from '../context/ContentContext'
import ContentCard from './ContentCard'
const MySaved = () => {
  const {contents,getSavedContents} = useContext(contentContext)
  useEffect(() => {
      const fetchData = async () => {
        await getSavedContents();
      };
      fetchData();
    }, []);



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
            <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold modern-title text-gray-900 mb-2">No Saved Content</h3>
            <p className="text-gray-600 modern-subtitle">
              Start exploring and save content you love!
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
              className="relative"
            >
              <ContentCard post={content} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MySaved