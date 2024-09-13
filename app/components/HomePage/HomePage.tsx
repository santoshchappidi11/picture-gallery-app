"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePhotoContext } from "@/app/Context/PhotoContext";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomePage: React.FC = () => {
  const { photos } = usePhotoContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(photos);

  useEffect(() => {
    if (photos?.length) {
      setIsLoading(false);
    }
  }, [photos]);

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <p className="font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="h-auto w-full my-10 px-5">
          <div className="h-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
            {photos &&
              photos?.map((item) => (
                <Link
                  href={`/PhotoDetails/${item.id}`}
                  key={item.id}
                  className="h-full w-full border border-gray-200"
                >
                  <div className="relative h-96 w-full overflow-hidden rounded-sm">
                    {item.urls.regular ? (
                      <Image
                        src={item.urls.regular}
                        alt={item.alt_description || "gallery"}
                        layout="fill"
                        className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
                      />
                    ) : (
                      <Skeleton
                        height="100%" // Updated
                        width="100%" // Updated
                        baseColor="#202020"
                        highlightColor="#444"
                      />
                    )}
                  </div>
                  <div className="w-full h-auto flex justify-center items-start mt-2 2xl:justify-start">
                    <div className="w-auto h-auto">
                      <Image
                        width={35}
                        height={35}
                        src={item.user.profile_image.large}
                        alt={item.user.name}
                        className="rounded-3xl mx-2"
                      />
                    </div>
                    <div>
                      <p className="text-xs">@{item.user.username}</p>
                      <h2 className="font-semibold">{item.user.name}</h2>
                    </div>
                  </div>
                  <p className="mt-3 mb-4 w-full h-auto text-center text-sm px-5">
                    {item.alt_description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
