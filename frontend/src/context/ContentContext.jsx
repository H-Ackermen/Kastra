import React, { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";
import { errorContext } from "./ErrorContext";
export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const { handleApiError, clearErrors } = useContext(errorContext);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

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

  return (
    <ContentContext.Provider
      value={{ uploadContent, updateLike, savedContent }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;
