import React,{useRef} from "react";
import { Link } from "react-router";
import { Heart, BookMarked } from "lucide-react";

const ContentCard = ({ post }) => {
    const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) videoRef.current.pause();
  };

  const isVideo = post.contentType === "video"
  return (
    <div className="relative w-80 rounded-lg shadow-md overflow-hidden bg-[#3b82f6]" onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {/* Image section */}
      <Link to={`/contentpage/${post._id}`}>
        <div className="h-40 overflow-hidden">
           {isVideo ? (
          <video
            ref={videoRef}
            src={post.url}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={post.url || "/placeholder.jpg"} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        )}
          
        </div>
      </Link>

      {/* Content info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate">
          {post.title || "Untitled"}
        </h2>
        <p className="text-sm text-gray-200 line-clamp-3">
          {post.description || "No description available."}
        </p>

        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="ml-2">{post.likecnt || 0}</span>
          </div>

          <BookMarked className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
