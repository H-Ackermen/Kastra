import React, { use } from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion';
import { Image, Grid3x3, Bookmark, Plus } from 'lucide-react';
import UploadContent from './UploadContent';
import AddCollection from './AddCollection';

const NavigationMenu = ( { activebtn, setActivebtn }) => {
    
    const handlebtn1=()=>{
        if(activebtn==="mycontent")
        {
            setActivebtn("");
        }
        else
        {
            setActivebtn("mycontent");
        }
    }
    const handlebtn2=()=>{
        if(activebtn==="mycollection")
        {
            setActivebtn("");
        }
        else 
        {
            setActivebtn("mycollection");
        }
    }
    const handlebtn3=()=>{
        if(activebtn==="mysaved")
        {
            setActivebtn("");
        }
        else
        {
            setActivebtn("mysaved");
        }
    }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full flex items-center justify-between h-20 modern-card rounded-xl shadow-lg p-4 mb-6'
    >
        <div className='flex items-center justify-center gap-2'>
            <motion.button  
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlebtn1}  
              className={`flex items-center gap-2 px-6 py-3 rounded-lg modern-subtitle font-medium transition-all duration-200 ${
                activebtn==="mycontent" 
                  ? "modern-button text-white shadow-lg" 
                  : "modern-card text-gray-600 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200"
              }`}
            >
              <Image className="w-4 h-4" />
              My Content
            </motion.button>
            
            <motion.button  
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlebtn2}  
              className={`flex items-center gap-2 px-6 py-3 rounded-lg modern-subtitle font-medium transition-all duration-200 ${
                activebtn==="mycollection" 
                  ? "modern-button text-white shadow-lg" 
                  : "modern-card text-gray-600 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
              My Collection
            </motion.button>
            
            <motion.button  
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlebtn3}  
              className={`flex items-center gap-2 px-6 py-3 rounded-lg modern-subtitle font-medium transition-all duration-200 ${
                activebtn==="mysaved" 
                  ? "modern-button text-white shadow-lg" 
                  : "modern-card text-gray-600 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              My Saved
            </motion.button>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {activebtn==="mycollection" ? <AddCollection /> : <UploadContent />}
        </motion.div>
    </motion.div>
  )
}

export default NavigationMenu