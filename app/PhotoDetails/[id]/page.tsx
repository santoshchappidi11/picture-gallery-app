"use client";

import api from "@/app/ApiConfig";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaDownload, FaLocationDot, FaUnsplash } from "react-icons/fa6";
import { PiDownloadSimple } from "react-icons/pi";
import { TbEyeSearch } from "react-icons/tb";
import { TiHeart } from "react-icons/ti";
// import { IoCloseSharp } from "react-icons/io5";

type tag = {
  title: string;
  type: string;
};

type Photo = {
  title: string;
  description: string;
  urls: {
    regular: string;
  };
  alt_description: string;
  user: {
    username: string;
    name: string;
    location: string;
    profile_image: {
      large: string;
    };
  };
  links: {
    html: string;
  };
  views: number;
  likes: number;
  downloads: number;
  taken_at?: string;
  camera?: string;
  tags?: tag[];
};

const SinglePhotoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [photoDetails, setPhotoDetails] = useState<Photo>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const imageRef = useRef();

  console.log(photoDetails, "photo single");

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    // Get the click coordinates
    const x = e.clientX;
    const y = e.clientY;

    // Calculate the zoom level based on the click coordinates
    const zoomLevel = 2; // adjust the zoom level to your liking
    const zoomX = x / (500 / zoomLevel);
    const zoomY = y / (500 / zoomLevel);

    // Get the current transform style of the image
    const imageContainer = document.querySelector(".image-container");
    if (imageContainer) {
      const img = imageContainer.querySelector("img");
      if (img) {
        const currentTransform = img.style.transform;

        // Toggle the zoom level
        if (currentTransform && currentTransform.includes("scale")) {
          // Zoom out
          img.style.transform = "";
        } else {
          // Zoom in
          img.style.transform = `translate(${zoomX}px, ${zoomY}px) scale(${zoomLevel})`;
        }
      }
    }
  };

  useEffect(() => {
    try {
      const getSinglePhotoDetails = async () => {
        const response = await api.get(`/photos/${id}`, {
          params: {},
        });

        if (response) {
          setIsLoading(false);
          setPhotoDetails(response.data);
        }
      };

      getSinglePhotoDetails();
    } catch (error) {
      setIsLoading(false);
      console.log("Error occured while fetching data", error);
    }
  }, [id]);

  const handleDownloadImage = () => {
    if (imageRef.current) {
      const imageSrc = imageRef.current.src;
      fetch(imageSrc)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${photoDetails?.alt_description}.jpg`; // set the download filename
          link.click();
          URL.revokeObjectURL(url); // revoke the object URL to avoid memory leaks
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <p className="font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="h-auto w-full relative border border-red-600 flex justify-center items-center">
          <div className="h-auto w-full lg:flex lg:justify-between lg:items-center">
            <div className="h-screen lg:w-3/5 lg:ml-5 image-container relative overflow-hidden">
              <Image
                ref={imageRef}
                // width={1000}
                // height={1000}
                src={photoDetails ? photoDetails?.urls?.regular : ""}
                alt={
                  photoDetails
                    ? photoDetails?.alt_description
                    : "some random photo"
                }
                layout="fill"
                className="object-contain transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer rounded-sm"
                onClick={handleImageClick}
              />
            </div>

            <div className="my-5 mx-5 lg:w-2/6">
              <div className="border-b border-b-gray-300  flex flex-col items-center justify-center">
                {" "}
                <div className="flex justify-start items-center">
                  <Image
                    src={
                      photoDetails
                        ? photoDetails?.user?.profile_image?.large
                        : ""
                    }
                    alt={photoDetails ? photoDetails?.alt_description : ""}
                    width={50}
                    height={50}
                    className="rounded-3xl"
                  />
                  <h2 className="font-semibold mx-2">
                    <p className="font-normal text-sm">
                      @{photoDetails?.user?.username}
                    </p>
                    {photoDetails?.user?.name}
                  </h2>
                </div>
                <div className="mt-2 flex justify-center items-center flex-col">
                  {" "}
                  <p className="text-center">{photoDetails?.alt_description}</p>
                  <p>
                    By{" "}
                    <a
                      className="font-medium"
                      href={`https://unsplash.com/@${photoDetails?.user.username}`}
                    >
                      @{photoDetails?.user.name}
                    </a>
                  </p>
                  <p className="flex justify-start items-center my-2">
                    <FaLocationDot className="mr-1" />{" "}
                    {photoDetails?.user?.location
                      ? photoDetails?.user?.location
                      : "Not available"}
                  </p>
                </div>
              </div>
              <div className="w-full h-auto mt-5 flex justify-center items-center flex-col">
                <h2 className="uppercase font-medium px-2 bg-gray-100 text-gray-600 rounded-sm">
                  Stats
                </h2>
                <div className="w-3/5 2xl:w-3/5 xl:w-3/5 lg:w-3/5 flex justify-between items-center my-2">
                  <p>Views: </p>
                  <span className="flex">
                    {photoDetails?.views?.toLocaleString()}
                    {"  "} <TbEyeSearch className="text-2xl mx-1" />
                  </span>{" "}
                </div>
                <div className="w-3/5 2xl:w-3/5 xl:w-3/5 lg:w-3/5 flex justify-between items-center my-2">
                  <p>Downloads:</p>
                  <span className="flex">
                    {photoDetails?.downloads.toLocaleString()}{" "}
                    <PiDownloadSimple className="text-2xl mx-1" />
                  </span>{" "}
                </div>
                <div className="w-3/5 2xl:w-3/5 xl:w-3/5 lg:w-3/5 flex justify-between items-center my-2">
                  <p>Likes:</p>
                  <span className="flex">
                    {photoDetails?.likes.toLocaleString()}{" "}
                    <TiHeart className="text-2xl mx-1" />
                  </span>{" "}
                </div>
              </div>

              <div className="w-full mt-5 flex justify-center items-center flex-col">
                <h2 className="uppercase font-medium px-2 bg-gray-100 text-gray-600 rounded-sm">
                  Additional Information
                </h2>
                <div className="sm w-3/5 2xl:w-3/5 xl:w-3/5 lg:w-3/5 flex justify-between items-center my-2">
                  <p className="">Taken at:</p>
                  <span>
                    {photoDetails?.taken_at
                      ? photoDetails?.taken_at
                      : "Not available"}
                  </span>
                </div>
                <div className="w-3/5 2xl:w-3/5 xl:w-3/5 lg:w-3/5 flex justify-between items-center my-2">
                  <p>Camera:</p>
                  <span>
                    {photoDetails?.camera
                      ? photoDetails?.camera
                      : "Not available"}
                  </span>
                </div>
                <div className="w-auto mt-10 mb-10 flex justify-center items-center flex-col">
                  <h2 className="px-2 bg-gray-100 text-gray-600 rounded-sm uppercase font-medium">
                    Tags:
                  </h2>
                  <p className=" w-auto text-center">
                    {photoDetails?.tags
                      ? photoDetails?.tags.map((tag) => tag?.title).join(", ")
                      : "Not available"}
                  </p>
                </div>
              </div>

              <div className="h-auto text-center border border-gray-400 rounded-md">
                <a
                  href={photoDetails?.links?.html}
                  target="blank"
                  className="w-full p-3 cursor-pointer transition-all flex justify-center items-center border border-black bg-white text-black hover:bg-gray-900 hover:text-white"
                >
                  View on unsplash <FaUnsplash className="mx-2 text-xl" />
                </a>
              </div>
              <button
                className="w-full py-3 mt-5 z-10 rounded-sm transition-all bg-black text-white  flex justify-center items-center hover:bg-gray-800"
                onClick={handleDownloadImage}
              >
                Download Image
                <FaDownload size={20} className="mx-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePhotoDetails;
