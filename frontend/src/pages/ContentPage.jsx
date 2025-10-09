import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Heart, Bookmark, Plus, MessageCircle, User, Calendar, Eye } from "lucide-react";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { authContext } from "../context/AuthContext";
import { contentContext } from "../context/ContentContext";
import { CommentContext } from "../context/CommentContext";
import ContentCard from "../components/ContentCard";
import Popover from '../components/Popover'
import Navbar from "../components/Navbar"
import Comment from "../components/Comment"
import { toast } from 'react-toastify';

export default function ContentPage() {
  const { contentId } = useParams();
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const { user, token } = useContext(authContext);
  const { content, contents, fetchContentById, fetchAllContent } =
    useContext(contentContext);

  // Comment context
  const { comments, fetchComments, addComment,deleteComment } = useContext(CommentContext);

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [reloadComments, setReloadComments] = useState(false);
  // For new comment input
  const [commentText, setCommentText] = useState("");

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
      setIsLiked(content?.likedBy?.includes(user._id));
      setIsSaved(content?.savedBy?.includes(user._id));
    } else {
      setIsLiked(false);
      setIsSaved(false);
    }
  }, [content, user?._id]);

  // Fetch comments when showComments is true and contentId changes
  useEffect(() => {
    const fetchData = async (contentId) => {
      await fetchComments(contentId);

    };
    fetchData(contentId);
  }, [showComments, contentId,reloadComments]);

  // LIKE HANDLER
  const handleLike = async () => {
    if (!token || !user?._id || !content?._id) {
      toast.error("You need to be logged in to like!");
      return;
    }
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
      if (res.status !== 200 && res.status !== 204) {
        setIsLiked(prevLiked);
        setLikeCnt(prevLikeCnt);
      } else if (res.status === 200 && res.data.success) {
        setLikeCnt(res.data.data.likecnt);
      }
    } catch (err) {
      setIsLiked(prevLiked);
      setLikeCnt(prevLikeCnt);
    }
  };

  // SAVE HANDLER
  const handleSave = async () => {
    if (!token || !user?._id || !content?._id) {
      toast.error("You need to be logged in to save content!");
      return;
    }
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
      if (res.status !== 200 && res.status !== 204) {
        setIsSaved(prevSaved);
      }
    } catch (err) {
      setIsSaved(prevSaved);
    }
  };

  // ADD COMMENT HANDLER
  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    await addComment({contentId, description: commentText })
    setCommentText("")
    setReloadComments((prev)=>!prev);
  };

  // Delete Comment
  const handleDelete = async (commentId) => {
    await deleteComment(commentId)
    //  setCommentText("")
    setReloadComments((prev)=>!prev);
  };
  // RENDER CONTENT (image/video)
  const renderContent = () => {
    if (!content)
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center h-96 text-gray-500"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="modern-subtitle">Loading content...</p>
          </div>
        </motion.div>
      );
    if (content.contentType === "video")
      return (
        <motion.video
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={content.url}
          controls
          autoPlay
          className="w-full h-auto rounded-xl shadow-lg bg-black"
        />
      );
    if (content.contentType === "image")
      return (
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={content.url}
          alt={content.title}
          className="w-full h-auto rounded-xl shadow-lg object-contain"
        />
      );
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-96 text-gray-500"
      >
        <div className="text-center">
          <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="modern-subtitle">No content available</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 modern-pattern">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT SIDE: Main video + info + comments */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Video / Image Display */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="modern-card rounded-xl overflow-hidden shadow-lg"
            >
              <div className="aspect-video">{renderContent()}</div>
            </motion.div>

            {/* Title + Owner + Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="modern-card rounded-xl p-6 shadow-lg"
            >
              <h1 className="text-3xl font-bold modern-title text-gray-900 mb-4">{content?.title}</h1>
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 modern-gradient rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-semibold">
                      {content?.owner?.username?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold modern-subtitle text-gray-900">
                      {content?.owner?.username || "Unknown"}
                    </p>
                    <p className="text-gray-500 text-sm modern-subtitle flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {content?.contentType?.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 modern-subtitle ${
                      isLiked
                        ? "bg-red-500 text-white shadow-lg"
                        : "modern-card text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                    />
                    <span>{likeCnt}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 modern-subtitle ${
                      isSaved
                        ? "modern-button text-white shadow-lg"
                        : "modern-card text-gray-600 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200"
                    }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
                    />
                    <span>Save</span>
                  </motion.button>

                  <Popover contentId={contentId} />
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-600 modern-subtitle leading-relaxed">
                  {content?.description || "No description available."}
                </p>
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="modern-card rounded-xl p-6 shadow-lg"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-xl font-semibold modern-title text-gray-900 hover:text-indigo-600 transition-colors mb-4" 
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="w-6 h-6" />
                Comments
                <span className="text-sm text-gray-500 modern-subtitle">({comments.length})</span>
              </motion.button>

              <AnimatePresence>
                {showComments && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {user ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex gap-4 p-4 modern-card rounded-lg border border-gray-200"
                      >
                        <div className="w-10 h-10 modern-gradient rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                          <span className="text-sm font-semibold text-white">
                            {user.username?.[0]?.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="w-full modern-input rounded-lg px-4 py-3 resize-none modern-subtitle"
                            rows="3"
                          />
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-3 px-6 py-2 modern-button text-white modern-subtitle rounded-lg"
                            onClick={handleAddComment}
                          >
                            Post Comment
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8 modern-card rounded-lg border border-gray-200"
                      >
                        <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 modern-subtitle">
                          Please login to comment
                        </p>
                      </motion.div>
                    )}

                    {/* Comments List */}
                    <div className="space-y-4">
                      {comments.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-8 modern-card rounded-lg border border-gray-200"
                        >
                          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600 modern-subtitle">No comments yet. Be the first to comment!</p>
                        </motion.div>
                      ) : (
                        comments.map((c, index) => (
                          <motion.div
                            key={c._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Comment
                              commentId={c._id}
                              text={c.description}
                              commentedby={c.user?.username || "User"}
                              handleDelete={handleDelete}
                              time={c.createdAt}
                            />
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Recommended videos */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full lg:w-96"
          >
            <div className="modern-card rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold modern-title text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                More to Explore
              </h3>
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
                {(contents || [])
                  .filter((c) => c?._id !== content?._id)
                  .slice(0, 20)
                  .map((c, index) => (
                    <motion.div
                      key={c._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="w-full overflow-hidden rounded-lg"
                    >
                      <ContentCard post={c} />
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}