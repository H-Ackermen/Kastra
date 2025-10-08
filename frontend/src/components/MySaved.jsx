import React, { useContext, useEffect } from 'react'
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
     <div className="flex flex-wrap gap-4 p-4 items-center justify-center">
      {contents.length === 0 ? (
        <p>No contents yet!</p>
      ) : (
        contents.map((content) => (
         <div key={content._id} className="relative">
            <ContentCard post={content} />
           
          </div>
        ))
        
      )}
    
    </div>
  )
}

export default MySaved