import React, { createContext, useContext, useState, useEffect } from "react";

import axios from 'axios'
import {errorContext} from "./ErrorContext";
export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const {handleApiError, clearErrors} = useContext(errorContext);
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
            console.error('Error uploading content:', err);
            handleApiError(err);    
        } 
    };

    return (
        <ContentContext.Provider value={{ uploadContent}}>
            {children}
        </ContentContext.Provider>
    );
}

export default ContentContext;