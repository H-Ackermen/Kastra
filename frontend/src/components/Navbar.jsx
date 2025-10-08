import React, { useContext, useState } from "react";
import { Sparkles, Menu, X, User, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { Link } from "react-router";
import { authContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(authContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  return (
    <nav className="bg-slate-900 border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Kastra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/explore"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
            >
              Explore
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
            >
              About
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-lg transition-all duration-200"
                >
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="w-8 h-8 rounded-full border-2 border-purple-500/30 object-cover"
                  />
                  <span className="text-gray-200 font-medium">{user.username}</span>
                </button>

                {/* Profile Dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-700">
                      <p className="text-sm text-gray-400">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <Link
                        to="/editprofile"
                        className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Edit Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setProfileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/50">
            <div className="flex flex-col gap-2">
              <Link
                to="/explore"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                onClick={toggleMobileMenu}
              >
                Explore
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                onClick={toggleMobileMenu}
              >
                About
              </Link>

              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 text-center"
                    onClick={toggleMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <div className="px-4 py-3 border-t border-b border-slate-700/50 my-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 rounded-full border-2 border-purple-500/30 object-cover"
                      />
                      <div>
                        <p className="text-white font-medium">{user.username}</p>
                        <p className="text-sm text-gray-400 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                    onClick={toggleMobileMenu}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMobileMenu();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}