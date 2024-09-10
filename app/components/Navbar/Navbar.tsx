import { FaArrowRightLong } from "react-icons/fa6";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-20 w-full border border-black flex justify-center items-center">
      <div className="h-auto w-64 lg:text-red-500 md:text-green-600 sm:text-yellow-500 lg:w-96 sm:w-80  border border-black flex justify-between items-center rounded-md">
        <input
          type="text"
          placeholder="search category..."
          className=" w-4/5 h-10 mx-2 outline-none"
        />
        <button className="flex justify-between items-center w-auto h-10 pl-2 bg-black text-white hover:bg-gray-800 ">
          search
          <FaArrowRightLong className="mx-2" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
