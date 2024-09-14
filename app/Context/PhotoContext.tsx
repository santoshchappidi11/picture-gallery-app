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
  totalPages: number; // expose total pages
  goToPage: (pageNumber: number) => void; // expose page navigation function
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

  const fetchPhotos = async (query: string) => {
    try {
      const response = await api.get("/search/photos", {
        params: { query, per_page: 30 },
      });
      const data = response.data;
      if (data) {
        setPhotos(data.results);
        setInitialLoading(false);
      } else {
        setInitialLoading(true);
      }
    } catch (error) {
      setInitialLoading(false);
      setServerError(true);
      console.error("Error fetching photos", error);
    }
  };

  useEffect(() => {
    const fetchInitialPhotos = async () => {
      try {
        const response = await api.get("/photos/random", {
          params: { count: 30 },
        });
        const data = response.data;
        if (data) {
          setPhotos(data);
          setInitialLoading(false);
        } else {
          setInitialLoading(true);
        }
      } catch (error) {
        setInitialLoading(false);
        setServerError(true);
        console.error("Error fetching photos", error);
      }
    };
    fetchInitialPhotos();
  }, []);

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
        totalPages, // expose total pages
        fetchPhotos,
        initialLoading,
        serverError,
        nextPage,
        prevPage,
        goToPage, // expose goToPage function
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
