"use client";

import React from "react";
import Image from "next/image";
import { usePhotoContext } from "@/app/Context/PhotoContext";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const HomePage: React.FC = () => {
  const {
    currentPagePhotos,
    initialLoading,
    serverError,
    nextPage,
    prevPage,
    currentPage,
    totalPages,
    goToPage,
    isDarkMode,
  } = usePhotoContext();

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 rounded ${
            currentPage === i
              ? "bg-gray-900 text-white dark:bg-gray-200 dark:text-black"
              : "bg-gray-200 text-black hover:bg-white dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const skeletonBaseColor = isDarkMode == "dark" ? "#333333" : "#e0e0e0"; // Dark mode base color
  const skeletonHighlightColor = isDarkMode == "dark" ? "#444444" : "#f5f5f5"; // Dark mode highlight color

  return (
    <>
      {serverError ? (
        <div className="h-screen w-full flex justify-center items-center font-medium dark:bg-gray-950 dark:text-gray-100">
          <p className="text-gray-700 dark:text-gray-300">
            Can&apos;t get your photos right now{" "}
            <span className="text-red-500 dark:text-red-400">!!!</span>
          </p>
        </div>
      ) : (
        <div className="h-auto w-full my-10 px-5  dark:bg-black ">
          <div className="h-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
            {currentPagePhotos &&
              currentPagePhotos.map((item) => (
                <Link
                  href={`/PhotoDetails/${item.id}`}
                  key={item.id}
                  className="h-full w-full border dark:border-gray-800 dark:bg-black rounded-md"
                >
                  <div className="relative h-96 w-full overflow-hidden rounded-sm">
                    {initialLoading || !item.urls.regular ? (
                      <Skeleton
                        height="100%"
                        width="100%"
                        baseColor={skeletonBaseColor}
                        highlightColor={skeletonHighlightColor}
                      />
                    ) : (
                      <Image
                        src={item.urls.regular}
                        alt={item.alt_description || "gallery"}
                        layout="fill"
                        className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
                      />
                    )}
                  </div>
                  <div className="w-full h-auto flex justify-center items-start mt-2 2xl:justify-start">
                    {initialLoading || !item.user.profile_image.large ? (
                      <Skeleton
                        circle
                        width={35}
                        height={35}
                        className="mx-2"
                        baseColor={skeletonBaseColor}
                        highlightColor={skeletonHighlightColor}
                      />
                    ) : (
                      <Image
                        width={35}
                        height={35}
                        src={item.user.profile_image.large}
                        alt={item.user.name}
                        className="rounded-3xl mx-2"
                      />
                    )}

                    {initialLoading ||
                    !item.user.name ||
                    !item.user.username ? (
                      <Skeleton
                        width={80}
                        height={12}
                        count={2}
                        baseColor={skeletonBaseColor}
                        highlightColor={skeletonHighlightColor}
                      />
                    ) : (
                      <div>
                        <p className="text-xs dark:text-gray-300">
                          @{item.user.username}
                        </p>
                        <h2 className="font-semibold dark:text-white">
                          {item.user.name}
                        </h2>
                      </div>
                    )}
                  </div>

                  {initialLoading ? (
                    <Skeleton
                      count={2}
                      width="100%"
                      baseColor={skeletonBaseColor}
                      highlightColor={skeletonHighlightColor}
                    />
                  ) : (
                    <p className="mt-3 mb-4 w-full h-auto text-center text-sm px-5 dark:text-gray-400">
                      {item.alt_description}
                    </p>
                  )}
                </Link>
              ))}
          </div>

          {/* Pagination Controls */}
          {!initialLoading && (
            <div className="fixed bottom-0 left-0 right-0 shadow-md z-50 py-2 bg-transparent backdrop-blur-md flex justify-center items-center">
              <div className="w-full xl:w-1/4 sm:w-ful flex justify-between items-center mx-5">
                <button
                  onClick={prevPage}
                  className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-sm flex justify-center items-center hover:bg-white dark:hover:bg-gray-600 border dark:border-gray-600"
                  disabled={initialLoading || currentPage === 1}
                >
                  <FaAnglesLeft className="mr-1" />
                  Prev
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-2 rounded-sm overflow-x-auto">
                  {renderPageNumbers()}
                </div>

                <button
                  onClick={nextPage}
                  className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-sm flex justify-center items-center hover:bg-white dark:hover:bg-gray-600 border dark:border-gray-600"
                  disabled={initialLoading || currentPage === totalPages}
                >
                  Next
                  <FaAnglesRight className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
