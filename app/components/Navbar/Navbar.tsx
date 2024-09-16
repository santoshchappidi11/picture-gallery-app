"use client";

import { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { usePhotoContext } from "@/app/Context/PhotoContext";
import toast from "react-hot-toast";
import { BsSun, BsMoon } from "react-icons/bs"; // Icons for the toggle

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchPhotos, serverError, initialLoading, setIsDarkMode } =
    usePhotoContext();
  const [isMounted, setIsMounted] = useState(false);

  // State for theme (light/dark)
  const [theme, setTheme] = useState<string>("light");

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme); // Persist theme in localStorage
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    // Ensures client-side rendering only
    setIsMounted(true);

    // Load theme from localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      setIsDarkMode(storedTheme);
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      fetchPhotos(searchQuery);
      setSearchQuery("");
    } else {
      toast.error("Please enter something!");
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
      {!serverError && !initialLoading && (
        <div className="h-20 w-full flex justify-center items-center sticky top-0 bg-transparent backdrop-blur-md z-10 ">
          <div className="flex justify-center items-center mx-5 lg:mx-0">
            {" "}
            <div className="h-auto lg:w-96 sm:w-80 border border-black flex justify-between items-center rounded-md bg-gray-100 dark:bg-gray-800">
              <input
                type="text"
                placeholder="search category..."
                className="w-full h-10 outline-none placeholder:text-sm bg-gray-100 dark:bg-gray-800 dark:text-white focus:bg-white dark:focus:bg-gray-700 rounded-md px-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="flex justify-between items-center w-auto h-10 pl-2 bg-none bg-black text-white hover:bg-gray-800 transition-all rounded-r-md outline-none"
                onClick={handleSearch}
              >
                <FaArrowRightLong className="ml-2 mr-4" size={20} />
              </button>
            </div>
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
            >
              {theme === "light" ? (
                <BsMoon size={20} />
              ) : (
                <BsSun color="yellow" size={20} />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
