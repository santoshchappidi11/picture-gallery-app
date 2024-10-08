import type { Metadata } from "next";
import "./globals.css";
import { PhotoProvider } from "./Context/PhotoContext";
import { Poppins } from "next/font/google";
// import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"], // weights
  subsets: ["latin"],
  fallback: ["sans-serif"], // fallback font
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PhotoProvider>
        <body className={`${poppins.className} dark:bg-gray-950`}>
          {children}
        </body>
      </PhotoProvider>
    </html>
  );
}
