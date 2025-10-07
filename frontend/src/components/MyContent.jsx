import React, { useContext, useEffect } from "react";

import { contentContext } from "../context/ContentContext";
import ContentCard from "./ContentCard";

const MyCollection = () => {
  const { contents, fetchContentByUser } = useContext(contentContext);

   useEffect(() => {
    const fetchData = async () => {
      await fetchContentByUser();
    };
    fetchData();
  }, []);


  return (
    <div className="flex flex-wrap gap-4 p-4 items-center justify-center">
      {contents.length === 0 ? (
        <p>No contents yet!</p>
      ) : (
        contents.map((content) => (
          <ContentCard
            key={content._id}
            post={content}
          />
        ))
        
      )}
    
    </div>
  );
};

export default MyCollection;
