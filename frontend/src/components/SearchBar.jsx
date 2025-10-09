import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { motion } from "framer-motion";

const SearchBar = ({ onSearch, isFiltered,handleReset }) => {
  const [searchVal, setSearchVal] = useState("");
  const [filterType, setFilterType] = useState("title");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearch(filterType, searchVal);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="flex items-center justify-between h-20 w-full max-w-4xl modern-card rounded-xl shadow-lg px-6"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Search by ${filterType}...`}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full h-12 pl-10 pr-4 modern-input rounded-lg modern-subtitle"
          />
        </div>
        
        <motion.button 
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 modern-button text-white modern-subtitle rounded-lg flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Search
        </motion.button>
        
        {isFiltered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-4 py-3 modern-card text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 modern-subtitle rounded-lg flex items-center gap-2 transition-all"
          >
            <X className="w-4 h-4" />
            Clear
          </motion.button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-500" />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="modern-input px-4 py-2 rounded-lg modern-subtitle border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        >
          <option value="title">Title</option>
          <option value="category">Category</option>
          <option value="type">Type</option>
        </select>
      </div>
    </motion.form>
  );
};

export default SearchBar;
