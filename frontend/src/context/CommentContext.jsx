import { createContext, useState } from "react";
import axios from "axios";

export const CommentContext = createContext();

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async (contentId) => {
    try {
      const res = await axios.get(`${API_URL}/api/comments/get-comment/${contentId}`);
      setComments(res.data.comments || []);
    } catch (err) {
      setComments([]);
      console.log(err.message)
    }
  };

  // Add comment
  const addComment = async (formData) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/comments/create-comment`,
        formData,
        {withCredentials:true } 
      );
      console.log(res);
      // if(res.data.success){
      //   console.log("Fetching Comments after adding new comment");
      //   await fetchComments(contentId);

      // }
        
    } catch (err) {
      console.log(err.message)
    }
  };

  // Delete comment
  const deleteComment = async (commentId)=>{
    try {
      const res = await axios.delete(`${API_URL}/api/comments/delete-comment/${commentId}`,{ withCredentials:true}
      );
      console.log(res);
      await fetchComments(contentId);
    } catch (err) {
      console.log(err.message)
    }
  };

  return (
    <CommentContext.Provider value={{ comments, fetchComments, addComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
};