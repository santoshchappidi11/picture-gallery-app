"use client";

import React from "react";
import Image from "next/image";
import { usePhotoContext } from "@/app/Context/PhotoContext";
// import { usePhotoContext } from "@/context/PhotoContext";

const HomePage: React.FC = () => {
  const { photos } = usePhotoContext();

  return (
    <div className="h-auto w-full 2xl:mt-10 2xl:mb-5 2xl:px-5 ">
      <div className="h-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center ">
        {photos?.map((item) => (
          <div
            className="relative h-96 w-full overflow-hidden rounded-sm"
            key={item.id}
          >
            <Image
              src={item.urls.small}
              alt={item.alt_description || "gallery"}
              // width={400}
              // height={400}
              layout="fill" // Use 'fill' to cover the parent container
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
            {/* <h2 className="border border-black mt-96">{item.title}</h2>
            <p>{item.alt_description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
