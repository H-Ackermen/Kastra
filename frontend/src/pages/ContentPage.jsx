import React, { useState, useContext, useEffect } from "react";
import axios from "axios"; // Import axios
import { Heart, Bookmark, Plus } from "lucide-react";
import { useParams } from "react-router";
import { authContext } from "../context/AuthContext";
import { contentContext } from "../context/ContentContext";
import ContentCard from "../components/ContentCard";
import Popover from '../components/Popover'
import Navbar from "../components/Navbar"
import Comment from "../components/Comment"
export default function ContentPage() {
  const { contentId } = useParams();
  // Get API_URL and token from environment and context, similar to ContentCard
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const { user, token } = useContext(authContext);
  const { content, contents, fetchContentById, fetchAllContent } =
    useContext(contentContext); // Removed updateLike, savedContent

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [showComments, setShowComments] = useState(false);

  // Fetch content and related data
  useEffect(() => {
    if (contentId) fetchContentById(contentId);
  }, [contentId, fetchContentById]);

  useEffect(() => {
    if (!contents || contents.length === 0) fetchAllContent();
  }, [contents?.length, fetchAllContent]);

  // Initialize like/save state on content or user change
  useEffect(() => {
    if (!content) return;
    setLikeCnt(content.likecnt || 0);
    if (user?._id) {
      // Use includes on the post data to initialize state
      setIsLiked(content?.likedBy?.includes(user._id));
      setIsSaved(content?.savedBy?.includes(user._id));
    } else {
      setIsLiked(false);
      setIsSaved(false);
    }
  }, [content, user?._id]);

  // --------------------------
  //   LIKE HANDLER (Direct API Call like ContentCard)
  // --------------------------
  const handleLike = async () => {
    if (!token || !user?._id || !content?._id) {
      alert("You need to be logged in to like!");
      return;
    }

    // Optimistic Update
    const prevLiked = isLiked;
    const prevLikeCnt = likeCnt;
    setIsLiked((prev) => !prev);
    setLikeCnt((cnt) => cnt + (prevLiked ? -1 : 1));

    try {
      const res = await axios.put(
        `${API_URL}/api/media/update/${content._id}/like`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Revert if API call failed but state was optimistically updated
      if (res.status !== 200 && res.status !== 204) {
        setIsLiked(prevLiked);
        setLikeCnt(prevLikeCnt);
      } else if (res.status === 200 && res.data.success) {
        // Update count with value from backend if available
        setLikeCnt(res.data.data.likecnt);
      }
    } catch (err) {
      console.error("Error liking content:", err);
      // Revert state on error
      setIsLiked(prevLiked);
      setLikeCnt(prevLikeCnt);
    }
  };

  // --------------------------
  //   SAVE HANDLER (Direct API Call like ContentCard)
  // --------------------------
  const handleSave = async () => {
    if (!token || !user?._id || !content?._id) {
      alert("You need to be logged in to save content!");
      return;
    }

    // Optimistic Update
    const prevSaved = isSaved;
    setIsSaved((prev) => !prev);

    try {
      const res = await axios.put(
        `${API_URL}/api/media/update/${content._id}/saved`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Revert if API call failed but state was optimistically updated
      if (res.status !== 200 && res.status !== 204) {
        setIsSaved(prevSaved);
      }
    } catch (err) {
      console.error("Error saving content:", err);
      // Revert state on error
      setIsSaved(prevSaved);
    }
  };

  // The rest of the component remains the same
  const renderContent = () => {
    if (!content)
      return (
        <div className="flex items-center justify-center h-96 text-gray-400">
          Loading...
        </div>
      );
    if (content.contentType === "video")
      return (
        <video
          src={content.url}
          controls
          autoPlay
          className="w-full h-auto rounded-lg bg-black"
        />
      );
    if (content.contentType === "image")
      return (
        <img
          src={content.url}
          alt={content.title}
          className="w-full h-auto rounded-lg object-contain"
        />
      );
    return (
      <div className="flex items-center justify-center h-96 text-gray-400">
        No content available
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Responsive YouTube-like layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT SIDE: Main video + info + comments */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Video / Image Display */}
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <div className="aspect-video">{renderContent()}</div>
            </div>

            {/* Title + Owner + Buttons */}
            <div className="bg-slate-800 rounded-lg p-4 flex flex-col gap-3">
              <h2 className="text-2xl font-bold">{content?.title}</h2>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {content?.owner?.username?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {content?.owner?.username || "Unknown"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {content?.contentType?.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked
                        ? "bg-pink-500 text-white"
                        : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                    />
                    <span>{likeCnt}</span>
                  </button>

                  <button
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isSaved
                        ? "bg-purple-600 text-white"
                        : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                    }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
                    />
                    <span>Save</span>
                  </button>

  
                   {/* <Plus className="w-5 h-5" /> */}
                    <Popover/>

                
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-2">
                {content?.description || "No description available."}
              </p>
            </div>

            {/* Comments */}
            <div className="bg-slate-800 rounded-lg p-4">
              <button
                onClick={() => setShowComments(!showComments)}
                className="text-lg font-semibold text-gray-200 hover:text-white transition-colors"
              >
                Comments
              </button>

              {showComments && (
                <div className="mt-4 space-y-4">
                  {user ? (
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold">
                          {user.username?.[0]?.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <textarea
                          placeholder="Add a comment..."
                          className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                          rows="3"
                        />
                        <button className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                          Post Comment
                        </button>
                        <Comment/>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">
                      Please login to comment
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Recommended videos */}
          <div className="w-full lg:w-96 bg-slate-900 flex flex-col gap-4">
            <h3 className="text-lg font-semibold mb-2">More to Explore</h3>
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
              {(contents || [])
                .filter((c) => c?._id !== content?._id)
                .slice(0, 20)
                .map((c) => (
                  <div
                    key={c._id}
                    className="w-full overflow-hidden rounded-lg"
                  >
                    <ContentCard post={c} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}