import React, { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";
import { errorContext } from "./ErrorContext";
export const contentContext = createContext();

const ContentContextProvider = ({ children }) => {
  const { handleApiError, clearErrors } = useContext(errorContext);
  const API_URL = import.meta.env.VITE_BACKEND_URL;
 const [contents, setContents] = useState([]); 
const [content, setContent] = useState(null);


  const uploadContent = async (formData) => {
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
  };

  const updateLike = async (contentId) => {
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
  };

  const savedContent = async (contentId) => {
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
  };

  const fetchAllContent = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/content/get-content`)
      console.log(res)
      if(res.data.success){
        setContents(res.data.contents)
      }
    } catch (error) {
      console.error("Error fetching content:", err);
      handleApiError(err);
    }
  }

  const fetchContentByUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/content/get-content-user`,{withCredentials:true})
      console.log(res)
      if(res.data.success){
        setContents(res.data.contents)
      }
    } catch (error) {
      console.error("Error fetching content:", err);
      handleApiError(err);
    }
  }

  const fetchContentById = async (contentId) => {
    try {
      const res = await axios.get(`${API_URL}/api/content/get-content/${contentId}`)
      console.log(res)
      if(res.data.success){
        setContent(res.data.content)
      }
    } catch (error) {
      console.error("Error fetching content:", err);
      handleApiError(err);
    }
  }

   const searchContent = async (queryType, queryValue) => {
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
  };

  return (
    <contentContext.Provider
      value={{ uploadContent, updateLike, savedContent,fetchAllContent,fetchContentById,fetchContentByUser,content,contents,searchContent }}
    >
      {children}
    </contentContext.Provider>
  );
};

export default ContentContextProvider;
