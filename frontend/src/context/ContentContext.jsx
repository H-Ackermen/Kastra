import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

import axios from "axios";
import { errorContext } from "./ErrorContext";
export const contentContext = createContext();

const ContentContextProvider = ({ children }) => {
  const { handleApiError, clearErrors } = useContext(errorContext);
  const API_URL = import.meta.env.VITE_BACKEND_URL;
 const [contents, setContents] = useState([]); 
const [content, setContent] = useState(null);


  const uploadContent = useCallback(async (formData) => {
    console.log("Uploading content with formData:", formData);

    try {
      clearErrors();
      const res = await axios.post(`${API_URL}/api/content/upload`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error("Error uploading content:", err);
      handleApiError(err);
    }
  }, [API_URL, clearErrors, handleApiError]);

  const updateLike = useCallback(async (contentId) => {
    try {
      const result = await axios.put(`${API_URL}/api/media/${contentId}/like`);
      if (result) {
        console.log("like updated successfully thorugh context api");
      } else {
        console.log("something went wrong");
      }
    } catch (err) {
      console.log("something went wrong in ui integration of updateLike");
    }
  }, [API_URL]);

  const savedContent = useCallback(async (contentId) => {
    try {
      const result = await axios.put(`${API_URL}/api/media/${contentId}/saved`);
      if (result) {
        console.log("saved updated successfully thorugh context api");
      } else {
        console.log("something went wrong in saving this content");
      }
    } catch (err) {
      console.log("something went wrong in ui integration of savedContent");
    }
  }, [API_URL]);

  const fetchAllContent = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/content/get-content`)
      console.log(res)
      if(res.data.success){
        setContents(res.data.contents)
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      handleApiError(error);
    }
  }, [API_URL, handleApiError]);

  const fetchContentByUser = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/content/get-content-user`,{withCredentials:true})
      console.log(res)
      if(res.data.success){
        setContents(res.data.contents)
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      handleApiError(error);
    }
  }, [API_URL, handleApiError]);

  const fetchContentById = useCallback(async (contentId) => {
    try {
      const res = await axios.get(`${API_URL}/api/content/get-content/${contentId}`)
      console.log(res)
      if(res.data.success){
        setContent(res.data.content)
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      handleApiError(error);
    }
  }, [API_URL, handleApiError]);

   const searchContent = useCallback(async (queryType, queryValue) => {
    try {
      const response = await axios.get(`${API_URL}/api/search`, {
        params: { [queryType]: queryValue },
      });
      console.log(response.data);
      setContents(response.data.contents);
    } catch (err) {
      console.error("Error searching:", err);
        handleApiError(err);
    } 
  }, [API_URL, handleApiError]);

  const deleteContent = useCallback(async (contentId) => {
  try {
    const res = await axios.delete(`${API_URL}/api/content/delete-content/${contentId}`, {
      withCredentials: true,
    });
    console.log(res.data);
    
    if (res.data.success) {
      await fetchContentByUser()
      console.log("Content deleted successfully");
    }
  } catch (err) {
    console.error("Error deleting content:", err);
    handleApiError(err);
  }
}, [API_URL, fetchContentByUser, handleApiError]);

  const getSavedContents = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/content/get-saved-content`,{withCredentials:true})
      console.log(res.data)
      if(res.data.success){
        setContents(res.data.contents)
        console.log("Contents fetched Successfully");
      }
    } catch (error) {
      console.error("Error deleting content:", err);
      handleApiError(err);
    }
  }


  return (
    <contentContext.Provider
      value={{ uploadContent, updateLike, savedContent,fetchAllContent,fetchContentById,fetchContentByUser,content,contents,searchContent, deleteContent, getSavedContents }}
    >
      {children}
    </contentContext.Provider>
  );
};

export default ContentContextProvider;
