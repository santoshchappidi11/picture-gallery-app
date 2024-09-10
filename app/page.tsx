import api from "@/app/ApiConfig";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";

type Photo = {
  id: string;
  title: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
};

const Home = async () => {
  let photos: Photo[] = [];

  try {
    const response = await api.get("/photos/random", {
      params: { count: 12 },
    });
    photos = response.data;
  } catch (error) {
    console.log("Error fetching photos", error);
  }

  return (
    <div>
      <Navbar />
      <HomePage photos={photos} />
    </div>
  );
};

export default Home;
