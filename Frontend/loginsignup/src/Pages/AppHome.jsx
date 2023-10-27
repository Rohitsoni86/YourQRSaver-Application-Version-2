import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import { useUserContext } from "../context/index";

export default function AppHome() {
  const { isUserLoggedIn, userLocalToken, toggleUserLog } = useUserContext();

  return (
    <div className="headerContainer">
      <Navbar />
      <div className="headingContainer h-full pt-20 w-full flex flex-col justify-center items-center">
        <h2 className="text-xl md:text-3xl font-bold text-black">
          {isUserLoggedIn ? "" : "Welcome To YourQRSaver Application !!"}
        </h2>
        <Outlet />
      </div>
    </div>
  );
}
