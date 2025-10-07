import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [searchVal, setSearchVal] = useState("");
  const [filterType, setFilterType] = useState("title");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearch(filterType, searchVal);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between h-20 w-full bg-gray-900 px-10"
    >
      <div className="flex items-center">
        <input
          type="text"
          placeholder={`Search by ${filterType}...`}
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-80 h-10 text-amber-400 bg-[#7c3aed] p-2 rounded-md outline-none"
        />
        <button type="submit" className="ml-2">
          <Search />
        </button>
      </div>

      <div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="text-violet-400 bg-gray-900 border border-violet-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="title">Title</option>
          <option value="category">Category</option>
          <option value="type">Type</option>
        </select>
      </div>
    </form>
  );
};

export default SearchBar;
