import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex">
      <Header />
      <Outlet />
      <div className="mb-24" />
    </div>
  );
};

export default Layout;
