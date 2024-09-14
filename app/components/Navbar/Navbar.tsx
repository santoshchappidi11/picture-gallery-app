"use client";

import { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { usePhotoContext } from "@/app/Context/PhotoContext";
// import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchPhotos, serverError } = usePhotoContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensures client-side rendering only
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      fetchPhotos(searchQuery);
      setSearchQuery("");
    } else {
      // toast.error("Please enter something!");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (!isMounted) {
    return null; // Prevent rendering until client-side mount
  }

  return (
    <>
      {!serverError && (
        <div className="h-20 w-full flex justify-center items-center sticky top-0 bg-transparent backdrop-blur-md z-10">
          <div className="h-auto lg:w-96 sm:w-80 border border-black flex justify-between items-center rounded-md bg-gray-100 focus:bg-white">
            <input
              type="text"
              placeholder="search category..."
              className="w-full h-10 outline-none placeholder:text-sm bg-gray-100 focus:bg-white rounded-md px-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="flex justify-between items-center w-auto h-10 pl-2 bg-none bg-black text-white hover:bg-gray-800 rounded-r-md outline-none"
              onClick={handleSearch}
            >
              <FaArrowRightLong className="ml-2 mr-4" size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
