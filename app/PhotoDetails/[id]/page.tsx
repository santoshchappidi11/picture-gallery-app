"use client";

import api from "@/app/ApiConfig";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaLocationDot, FaUnsplash } from "react-icons/fa6";
import { PiDownloadSimple } from "react-icons/pi";
import { TbEyeSearch } from "react-icons/tb";
import { TiHeart } from "react-icons/ti";

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

  console.log(photoDetails, "photo single");

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

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <p className="font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="h-auto w-full border border-black flex justify-between items-start">
          <div className="h-screen w-3/5 flex justify-center items-center relative overflow-hidden">
            <Image
              src={photoDetails ? photoDetails?.urls?.regular : ""}
              //   width={500}
              //   height={500}
              alt={
                photoDetails
                  ? photoDetails?.alt_description
                  : "some random photo"
              }
              layout="fill"
              className="object-contain transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
            />
          </div>

          <div className="my-5 mx-5 w-2/6">
            <div>
              {" "}
              <div className="flex justify-start items-center">
                <Image
                  src={
                    photoDetails ? photoDetails?.user?.profile_image?.large : ""
                  }
                  alt={photoDetails ? photoDetails?.alt_description : ""}
                  width={50}
                  height={50}
                  className="rounded-3xl"
                />
                <h2 className="font-semibold mx-2">
                  {photoDetails?.user?.name}
                </h2>
              </div>
              <div className="mt-2">
                {" "}
                <p className="my-1">{photoDetails?.alt_description}</p>
                <p>
                  By{" "}
                  <a
                    className="font-medium"
                    href={`https://unsplash.com/@${photoDetails?.user.username}`}
                  >
                    @{photoDetails?.user.name}
                  </a>
                </p>
                <p className="flex justify-start items-center my-1">
                  <FaLocationDot className="mr-1" />{" "}
                  {photoDetails?.user?.location
                    ? photoDetails?.user?.location
                    : "Not available"}
                </p>
              </div>
            </div>
            <div className="w-full h-auto my-10 ">
              <div className="w-3/5 flex justify-between items-center my-3">
                <p>Views: </p>
                <span className="flex">
                  {photoDetails?.views?.toLocaleString()}
                  {"  "} <TbEyeSearch className="text-2xl mx-1" />
                </span>{" "}
              </div>
              <div className="w-3/5 flex justify-between items-center my-3">
                <p>Downloads:</p>
                <span className="flex">
                  {photoDetails?.downloads.toLocaleString()}{" "}
                  <PiDownloadSimple className="text-2xl mx-1" />
                </span>{" "}
              </div>
              <div className="w-3/5 flex justify-between items-center my-3">
                <p>Likes:</p>
                <span className="flex">
                  {photoDetails?.likes.toLocaleString()}{" "}
                  <TiHeart className="text-2xl mx-1" />
                </span>{" "}
              </div>
            </div>

            <div className="w-full my-5 ">
              <h3>Additional Information</h3>
              <div className="w-3/5 flex justify-between items-center my-3">
                <p>Taken at:</p>
                <span>
                  {photoDetails?.taken_at
                    ? photoDetails?.taken_at
                    : "Not available"}
                </span>
              </div>
              <div className="w-3/5 flex justify-between items-center my-3">
                <p>Camera:</p>
                <span>
                  {photoDetails?.camera
                    ? photoDetails?.camera
                    : "Not available"}
                </span>
              </div>
              <div className="w-auto my-12">
                <h2>Tags:</h2>
                <p className=" w-auto">
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
                className="w-full p-3 cursor-pointer flex justify-center items-center"
              >
                View on unsplash <FaUnsplash className="mx-2 text-xl" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePhotoDetails;
