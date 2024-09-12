"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import React, { useState } from "react";
import { usePhotoContext } from "@/app/Context/PhotoContext";
// import { usePhotoContext } from "@/context/PhotoContext";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchPhotos } = usePhotoContext();

  // console.log(searchQuery, "query here");

  const handleSearch = () => {
    fetchPhotos(searchQuery);
    setSearchQuery("");
  };

  return (
    <div className="h-20 w-full border-b border-b-gray-300 flex justify-center items-center sticky top-0 bg-transparent backdrop-blur-md z-10">
      <div className="h-auto w-72 bg-white lg:w-96 sm:w-80 border border-black flex justify-between items-center rounded-md">
        <input
          type="text"
          placeholder="search category..."
          className="w-4/5 h-10 mx-2 outline-none placeholder:text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="flex justify-between items-center w-auto h-10 pl-2 bg-none bg-black text-white hover:bg-gray-800 rounded-r-md outline-none"
          onClick={handleSearch}
          type="submit"
        >
          Search
          <FaArrowRightLong className="mx-2" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
