import { Toaster } from "react-hot-toast";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          duration: 2000,
          style: {
            background: "black",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 2000,
            style: {
              background: "black",
              color: "white",
            },
          },
          error: {
            duration: 2000,
            style: {
              background: "black",
              color: "white",
            },
          },
        }}
      />
      <Navbar />
      <HomePage />
    </div>
  );
};

export default Home;
