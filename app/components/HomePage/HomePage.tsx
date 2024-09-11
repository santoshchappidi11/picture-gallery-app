import Image from "next/image";
import React from "react";

type Photo = {
  id: string;
  title: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
};

type Props = {
  photos: Photo[];
};

const HomePage = ({ photos }: Props) => {
  return (
    <div className="h-auto w-full border border-red-700 2xl:my-5 2xl:px-5 ">
      <div className="h-auto w-full border border-green-600 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 place-items-center">
        {photos?.map((item) => (
          <div key={item.id}>
            <div className="h-auto w-full overflow-hidden rounded-sm">
              <Image
                src={item.urls.small}
                alt={item.alt_description || "gallery"}
                className="object-contain hover:scale-125 transition-all"
                width={500}
                height={100}
              />
            </div>
            <h2>{item.title}</h2>
            <p>{item.alt_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
