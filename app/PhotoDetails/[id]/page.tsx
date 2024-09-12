"use client";

import api from "@/app/ApiConfig";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
    profile_image: {
      large: string;
    };
  };
  views: number;
  likes: number;
  downloads: number;
};

const SinglePhotoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [photoDetails, setPhotoDetails] = useState<Photo>();
  console.log(id);
  console.log(photoDetails, "photo info");

  useEffect(() => {
    try {
      const getSinglePhotoDetails = async () => {
        const response = await api.get(`/photos/${id}`, {
          params: {},
        });

        if (response) {
          setPhotoDetails(response.data);
        }
      };

      getSinglePhotoDetails();
    } catch (error) {
      console.log("Error occured while fetching data", error);
    }
  }, [id]);

  return (
    <div className="h-auto w-full border border-black flex justify-between items-start">
      <div className="border border-black h-screen w-9/12 flex justify-center items-center relative overflow-hidden">
        <Image
          src={photoDetails ? photoDetails?.urls?.regular : ""}
          //   width={500}
          //   height={500}
          alt={
            photoDetails ? photoDetails?.alt_description : "some random photo"
          }
          layout="fill"
          className="object-contain transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
        />
      </div>

      <div className="my-5 mx-5">
        <div className="flex justify-start items-center">
          <Image
            src={photoDetails ? photoDetails?.user?.profile_image?.large : ""}
            alt={photoDetails ? photoDetails?.alt_description : ""}
            width={50}
            height={50}
            className="rounded-3xl"
          />
          <h2 className="font-semibold mx-2">{photoDetails?.user?.name}</h2>
        </div>
        <p>{photoDetails?.alt_description}</p>
        <p>
          By{" "}
          <a href={`https://unsplash.com/@${photoDetails?.user.username}`}>
            @{photoDetails?.user.name}
          </a>
        </p>
        <p>
          Views: {photoDetails?.views} | Downloads: {photoDetails?.downloads} |
          Likes: {photoDetails?.likes}
        </p>
      </div>
    </div>
  );
};

export default SinglePhotoDetails;
