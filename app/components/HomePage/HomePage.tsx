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
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-black hover:bg-white"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      {serverError ? (
        <div className="h-screen w-full flex justify-center items-center font-medium">
          <p className="text-gray-700">
            Can&apos;t get your photos right now{" "}
            <span className="text-red-500">!!!</span>
          </p>
        </div>
      ) : (
        <div className="h-auto w-full my-10 px-5">
          <div className="h-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
            {currentPagePhotos &&
              currentPagePhotos.map((item) => (
                <Link
                  href={`/PhotoDetails/${item.id}`}
                  key={item.id}
                  className="h-full w-full border border-gray-200"
                >
                  <div className="relative h-96 w-full overflow-hidden rounded-sm">
                    {initialLoading || !item.urls.regular ? (
                      <Skeleton
                        height="100%"
                        width="100%"
                        baseColor="#e0e0e0"
                        highlightColor="#f5f5f5"
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
                    !item.user.username ||
                    !item.user.name ? (
                      <Skeleton width={80} height={12} />
                    ) : (
                      <div>
                        <p className="text-xs">@{item.user.username}</p>
                        <h2 className="font-semibold">{item.user.name}</h2>
                      </div>
                    )}
                  </div>

                  {initialLoading || !item.alt_description ? (
                    <Skeleton count={2} />
                  ) : (
                    <p className="mt-3 mb-4 w-full h-auto text-center text-sm px-5">
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
                  className="bg-gray-200 text-black px-3 py-1 rounded-sm flex justify-center items-center hover:bg-white border"
                  disabled={initialLoading || currentPage === 1}
                >
                  <FaAnglesLeft className="mr-1" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-2 rounded-sm overflow-x-auto">
                  {renderPageNumbers()}
                </div>

                <button
                  onClick={nextPage}
                  className="bg-gray-200 text-black px-3 py-1 rounded-sm flex justify-center items-center hover:bg-white"
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
