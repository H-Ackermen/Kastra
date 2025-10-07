import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Heart, BookmarkCheck, Bookmark } from "lucide-react";

const ContentCard = ({ post, currentUserId }) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Initialize like and save state safely
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likecnt || 0);

  // Setup from post data when component mounts
  useEffect(() => {
    if (post?.likedBy?.includes(currentUserId)) setLiked(true);
    if (post?.savedBy?.includes(currentUserId)) setSaved(true);
  }, [post, currentUserId]);

  // ============================
  //  LIKE HANDLER
  // ============================
  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to be logged in to like!");
        return;
      }

      const res = await axios.put(
        `${API_URL}/api/media/update/${post._id}/like`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Like API Response:", res.status, res.data);

      // Handle 200 OK response
      if (res.status === 200 && res.data.success) {
        setLikeCount(res.data.data.likecnt);
        setLiked(res.data.data.liked);
      } else if (res.status === 204) {
        console.warn("Got 204 - No Content from like API");
      }
    } catch (err) {
      console.error("Error liking content:", err);
    }
  };

  // ============================
  //  SAVE HANDLER
  // ============================
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to be logged in to save content!");
        return;
      }

      const res = await axios.put(
        `${API_URL}/api/media/update/${post._id}/saved`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Save API Response:", res.status, res.data);

      if (res.status === 200 && res.data.success) {
        setSaved((prev) => !prev);
      } else if (res.status === 204) {
        console.warn("Got 204 - No Content from save API");
      }
    } catch (err) {
      console.error("Error saving content:", err);
    }
  };

  // ============================
  //  RENDER COMPONENT
  // ============================
  return (
    <div className="relative w-80 rounded-lg shadow-md overflow-hidden bg-[#3b82f6] hover:scale-[1.02] transition-transform">
      {/* Image Section */}
      <Link to={`/contentpage/${post._id}`}>
        <div className="h-40 overflow-hidden">
          <img
            src={post.url || "/placeholder.jpg"}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform"
          />
        </div>
      </Link>

      {/* Content Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate">
          {post.title || "Untitled"}
        </h2>
        <p className="text-sm text-gray-200 line-clamp-3">
          {post.description || "No description available."}
        </p>

        <div className="flex justify-between mt-4 items-center">
          {/* Like Button */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLike}
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-200 ${
                liked ? "text-red-500 fill-red-500" : "text-red-500"
              }`}
            />
            <span>{likeCount}</span>
          </div>

          {/* Save Button */}
          <div className="cursor-pointer" onClick={handleSave}>
            {saved ? (
              <BookmarkCheck className="text-yellow-400" />
            ) : (
              <Bookmark className="text-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
