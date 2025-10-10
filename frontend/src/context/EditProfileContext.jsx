import { createContext, useState, useContext } from "react";
import axios from "axios";
import { authContext } from "./AuthContext";

export const EditProfileContext = createContext();

export const EditProfileContextProvider = ({ children }) => {
  const { setUser } = useContext(authContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const editProfile = async (formData) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axios.put(`${API_URL}/api/users/edit-profile`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(res.data.message || "Profile updated!");
      setUser(res.data.user); // update user in authContext
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditProfileContext.Provider
      value={{
        editProfile,
        error,
        success,
        loading,
      }}
    >
      {children}
    </EditProfileContext.Provider>
  );
};

export default EditProfileContextProvider;
