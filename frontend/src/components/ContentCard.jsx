import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Heart, BookmarkCheck, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { authContext } from "../context/AuthContext";
import { toast } from 'react-toastify';

const ContentCard = ({ post }) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const { user, token } = useContext(authContext);
  const videoRef = useRef(null);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likecnt || 0);
  const [loading, setLoading] = useState(true); // 🟢 new loading state

  const isVideo = post.contentType === "video";

  // Initialize like/save state
  useEffect(() => {
    if (!user?._id) return;
    if (post?.likedBy?.includes(user._id)) setLiked(true);
    if (post?.savedBy?.includes(user._id)) setSaved(true);
  }, [post, user?._id]);

  // --------------------------
  //   VIDEO HANDLERS
  // --------------------------
  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) videoRef.current.play();
  };
  const handleMouseLeave = () => {
    if (isVideo && videoRef.current) videoRef.current.pause();
  };

  // --------------------------
  //   LIKE HANDLER
  // --------------------------
  const handleLike = async () => {
    try {
      if (!token || !user?._id) {
        toast.error("You need to be logged in to like!");
        return;
      }

      const res = await axios.put(`${API_URL}/api/media/update/${post._id}/like`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200 && res.data.success) {
        setLikeCount(res.data.data.likecnt);
        setLiked((prev) => !prev);
      }
    } catch (err) {
      console.error("Error liking content:", err);
    }
  };

  // --------------------------
  //   SAVE HANDLER
  // --------------------------
  const handleSave = async () => {
    try {
      if (!token || !user?._id) {
        toast.error("You need to be logged in to save content!");
        return;
      }

      const res = await axios.put(`${API_URL}/api/media/update/${post._id}/saved`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200 && res.data.success) {
        setSaved((prev) => !prev);
      }
    } catch (err) {
      console.error("Error saving content:", err);
    }
  };

  // --------------------------
  //   RENDER COMPONENT
  // --------------------------
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative w-80 modern-card rounded-xl shadow-lg overflow-hidden transition-all duration-300 modern-pattern"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 🌀 LOADING SHIMMER */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"
          />
        </div>
      )}

      <Link to={`/contentpage/${post._id}`}>
        <div className="h-50 overflow-hidden">
          {isVideo ? (
            <video
              ref={videoRef}
              src={post.url}
              muted
              loop
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
              onLoadedData={() => setLoading(false)} // 🟢 hide loader after video loads
            />
          ) : (
            <img
              src={post.url || "/placeholder.jpg"}
              alt={post.title}
              onLoad={() => setLoading(false)} // 🟢 hide loader after image loads
              className={`w-full h-full object-cover transition-all duration-500 hover:scale-110 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
            />
          )}
        </div>
      </Link>

      {/* Content Info */}
      {!loading && (
        <div className="p-4 modern-gradient opacity-95">
          <h2 className="text-lg font-semibold mb-2 truncate text-white modern-title">
            {post.title || "Untitled"}
          </h2>
          <p className="text-sm text-gray-100 line-clamp-3 modern-subtitle">
            {post.description || "No description available."}
          </p>

          <div className="flex justify-between mt-4 items-center">
            {/* Like Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleLike}
            >
              <Heart
                className={`w-5 h-5 transition-colors duration-200 ${
                  liked ? "text-red-300 fill-red-300" : "text-white"
                }`}
              />
              <span className="text-white modern-subtitle">{likeCount}</span>
            </motion.div>

            {/* Save Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer"
              onClick={handleSave}
            >
              {saved ? (
                <BookmarkCheck className="text-yellow-300 w-5 h-5" />
              ) : (
                <Bookmark className="text-white w-5 h-5" />
              )}
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ContentCard;
