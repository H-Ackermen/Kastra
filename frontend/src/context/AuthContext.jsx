import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { errorContext } from "./ErrorContext";
import { toast } from 'react-toastify';

export const authContext = createContext();

axios.defaults.withCredentials = true; 


const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(()=>localStorage.getItem('token'));
  const {handleApiError,clearErrors} = useContext(errorContext)
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // set Token
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if(!user) getCurrentUser();
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, [token]);

  // Register
  const register = async (userData) => {
    try {
      clearErrors();
      const res = await axios.post(
        `${API_URL}/api/auth/register-user`,
        userData, {withCredentials:true}
      );
      const { user, token } = res.data;     
      setToken(token);     
      setUser(user);
      toast.success("Account created successfully! Welcome to Kastra!");
      return user;
    } catch (error) {
      console.log(error.message);
      handleApiError(error);
    }
  };

  // Login
  const login = async (userData) => {
    try {
      clearErrors();
      console.log(userData);
      const res = await axios.post(`${API_URL}/api/auth/login-user`, userData, {withCredentials:true});
      const { user, token } = res.data;     
      setToken(token);     
      setUser(user);
      toast.success(`Welcome back, ${user.username || user.name}!`);
      return user;
    } catch (error) {
      console.log(error.message);
      handleApiError(error)
    }
  };

  // Logout
  const logout = async () => {
    try {
      clearErrors();
      await axios.post(`${API_URL}/api/auth/logout-user`, {withCredentials:true});
      setToken(null);
      setUser(null);
      toast.success("Logged out successfully!");
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error.message);
      handleApiError(error)
    }
  };

   // Get current user from backend
  const getCurrentUser = async () => {
    try {
      clearErrors()
      if (!token) return null;
      const res = await axios.get(`${API_URL}/api/auth/current-user`, {withCredentials:true});
      const { user } = res.data;
      setUser(user);
      return user;
    } catch (error) {
        console.log(error.message);  
        handleApiError(error)     
    } 
  };

  const forgotPassword = async (formData) => {
    try {
      console.log("frontend",formData);
      
      const res = await axios.post(`${API_URL}/api/auth/forgot-password`,formData)
      console.log(res);
      
      if(res.data.success){
        console.log(res.data.resetToken);
        toast.success(res.data.message);
      }
      return res.data.success;
    } catch (error) {
      console.log(error.message)
      handleApiError(error)
      return false;
    }
  }

  const resetPassword = async (formData,resetToken) => {
    try {
      console.log("Frontend")
      const res = await axios.put(`${API_URL}/api/auth/reset-password`,formData,  { params: { token: resetToken } }  )
      console.log("FRONTEND")
      if(res.data.success){
        toast.success(res.data.message);
      }
        return res.data.success;
    } catch (error) {
      console.log(error);
      handleApiError(error)
      return false;
    }
  }

  const verifyJWT = async(resetToken) => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/verify-token`,{params: { token: resetToken }})
      console.log(res.data.valid)
      return res.data.valid
    } catch (error) {
      
      return false;
    }
  }

  // On mount, if token exists, fetch user
  useEffect(() => {
    if (token && !user) {
      getCurrentUser();
    }
  }, [token]);

  

  const contextValues = {
    user,
    setUser,
    token,
    setToken,
    register,
    login,
    logout,
    getCurrentUser,
    forgotPassword,
    resetPassword,
    verifyJWT
  };

  return (
    <authContext.Provider value={contextValues}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
