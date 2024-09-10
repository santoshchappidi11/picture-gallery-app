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
    <div className="h-auto w-full border border-red-700 ">
      <div className="h-auto w-full border border-green-600 grid grid-cols-3 gap-2 place-items-center">
        {photos?.map((item) => (
          <div className="h-auto w-1/5 border border-black" key={item.id}>
            <Image
              src={item.urls.small}
              alt={item.alt_description || "gallery"}
              width={400}
              height={300}
            />
            <h2>{item.title}</h2>
            <p>{item.alt_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
