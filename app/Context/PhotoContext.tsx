"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import api from "@/app/ApiConfig";

type Photo = {
  id: string;
  title: string;
  urls: {
    small: string;
    full: string;
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
};

type PhotoContextType = {
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  fetchPhotos: (query: string) => void;
};

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async (query: string) => {
    // console.log(query, "context query");

    try {
      const response = await api.get("/search/photos", {
        params: { query, per_page: 12 },
      });
      const data = response.data;
      setPhotos(data.results);
      console.log(data, "query");
    } catch (error) {
      console.error("Error fetching photos", error);
    }
  };

  useEffect(() => {
    const fetchInitialPhotos = async () => {
      try {
        const response = await api.get("/photos/random", {
          params: { count: 12 },
        });
        const data = response.data;
        setPhotos(data);
        console.log(data, "initial");
      } catch (error) {
        console.error("Error fetching photos", error);
      }
    };
    fetchInitialPhotos();
  }, []);

  return (
    <PhotoContext.Provider value={{ photos, setPhotos, fetchPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => {
  const context = useContext(PhotoContext);
  if (context === undefined) {
    throw new Error("usePhotoContext must be used within a PhotoProvider");
  }
  return context;
};
