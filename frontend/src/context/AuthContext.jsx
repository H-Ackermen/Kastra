import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { errorContext } from "./ErrorContext";

export const authContext = createContext();

axios.defaults.withCredentials = true; 

// setting default axios 
const savedToken = localStorage.getItem("token");
if (savedToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
}

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
      // localStorage.removeItem("token");
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

  // On mount, if token exists, fetch user
  useEffect(() => {
  //  const token = localStorage.getItem("token");
    if (token && !user) {
      getCurrentUser();
    }
  }, [token]);

  // When token changes (after login/register), fetch user
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
    getCurrentUser
  };

  return (
    <authContext.Provider value={contextValues}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
