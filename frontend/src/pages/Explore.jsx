import React, { useContext, useEffect, useState } from "react";
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
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="flex justify-center items-center gap-4 mt-4">
        <SearchBar onSearch={handleSearch} isFiltered={isFiltered} handleReset={handleReset}/>
        
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {contents.length > 0 ? (
          contents.map((content) => (
            <ContentCard key={content._id} post={content} />
          ))
        ) : (
          <p className="text-gray-400">No content found.</p>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
