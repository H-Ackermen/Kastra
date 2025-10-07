import React from "react";
import myImage from "../assets/mobile-reso.jpg";
import { Link } from "react-router";
import { Heart, BookMarked } from "lucide-react";

const ContentCard = ({content}) => {
  return (
    <div className="relative w-80 rounded-lg shadow-md overflow-hidden bg-[#3b82f6]">
     
      <Link to="/contentpage">
        <div className="h-40 overflow-hidden">
          <img
            src={myImage}
            alt="Image"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Content info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">content Title</h2>
        <p >
          decription about the content
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto modi nisi delectus sunt consequatur quo sint ipsam itaque dolore ea rem ad voluptas laborum voluptatibus, sapiente 
        </p>
        <div className="flex justify-between mt-4">
          <button>
            <div className="flex items-center">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="ml-2">123</span>
            </div>
          </button>
          <button >
            <BookMarked  />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
