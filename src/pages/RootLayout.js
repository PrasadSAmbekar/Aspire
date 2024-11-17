import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="w-[100%] h-auto min-h-[100vh] font-sans flex flex-col items-center">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
