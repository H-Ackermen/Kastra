import React, { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ContentCard from "../components/ContentCard";
import Navbar from "../components/Navbar"
const ExplorePage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (queryType, queryValue) => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/search", {
        params: { [queryType]: queryValue },
      });
      console.log(response.data);
      setResults(response.data);
    } catch (err) {
      console.error("Error searching:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
        <Navbar/>
      <SearchBar onSearch={handleSearch} />

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          results.map((content) => (
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
