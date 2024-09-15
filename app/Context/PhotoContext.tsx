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
  serverError: boolean;
  initialLoading: boolean;
  photos: Photo[];
  fetchPhotos: (query: string) => void;
  currentPagePhotos: Photo[];
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  totalPages: number;
  goToPage: (pageNumber: number) => void;
};

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const photosPerPage = 12;

  // Calculate total pages based on total photos and photos per page
  const totalPages = Math.ceil(photos.length / photosPerPage);

  // Fetch photos on search
  const fetchPhotos = async (query: string) => {
    setInitialLoading(true); // Ensure loading is true at the start of the fetch
    try {
      const response = await api.get("/search/photos", {
        params: { query, per_page: 30 },
      });
      const data = response.data;
      if (data) {
        setPhotos(data.results);
        setInitialLoading(false);
      } else {
        setServerError(true);
        setInitialLoading(false);
      }
    } catch (error) {
      setServerError(true);
      setInitialLoading(false);
      console.error("Error fetching photos", error);
    }
  };

  // Fetch random photos on initial load of the page
  const fetchInitialPhotos = async () => {
    setInitialLoading(true); // Ensure loading is true at the start of the fetch
    try {
      const response = await api.get("/photos/random", {
        params: { count: 30 },
      });
      const data = response.data;
      if (data) {
        setPhotos(data);
        setInitialLoading(false);
      } else {
        setServerError(true);
        setInitialLoading(false);
      }
    } catch (error) {
      setServerError(true);
      setInitialLoading(false);
      console.error("Error fetching photos", error);
    }
  };

  useEffect(() => {
    fetchInitialPhotos();
  }, []);

  // Get current page photos
  const currentPagePhotos = photos.slice(
    (currentPage - 1) * photosPerPage,
    currentPage * photosPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <PhotoContext.Provider
      value={{
        photos,
        currentPagePhotos,
        currentPage,
        totalPages,
        fetchPhotos,
        initialLoading,
        serverError,
        nextPage,
        prevPage,
        goToPage,
      }}
    >
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
