import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "PropertyPulse | Find the perfect rental",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>;
      </body>
    </html>
  );
};

export default MainLayout;
