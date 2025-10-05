import React, { useContext } from "react";
import { Sparkles } from "lucide-react";

import { Link } from "react-router";
import { authContext } from "../context/AuthContext";
export default function Navbar() {
  const { user, logout } = useContext(authContext);
  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
           
          </div>
          <span className="text-xl font-bold">Kastra</span>
          </div>


          <div className="flex items-center gap-6">


            <a href="#" className="text-gray-300 hover:text-white">Explore</a>


            <a href="#" className="text-gray-300 hover:text-white">About</a>
            {!user && 
            (<Link to="/login" className="text-gray-300 hover:text-white">Login</Link>)
}
{!user && (
            <Link to="/signup" className="text-gray-300 hover:text-white">Sign Up</Link>
          )  }
          {user && <Link to='/' onClick={logout} className="text-gray-300 hover:text-white">Log out</Link>}
          {user && <Link to="/dashboard" className="text-gray-300 hover:text-white">{user.username}</Link>}
          </div>


        </div>

        {/* <div className="flex items-center gap-6">
          <a href="#" className="text-gray-300 hover:text-white">
            Explore
          </a>

          <a href="#" className="text-gray-300 hover:text-white">
            About
          </a>
          {!user && (
            <Link to="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
          )}
          {!user && (
            <Link to="/signup" className="text-gray-300 hover:text-white">
              Sign Up
            </Link>
          )}
          {user && (
            <button onClick={logout} className="text-gray-300 hover:text-white">
              Sign Up
            </button>
          )}
        </div> */}
   
    </nav>
  );
}
