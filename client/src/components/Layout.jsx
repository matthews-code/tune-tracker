import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./subcomponents/Header";
import HeaderSmall from "./subcomponents/HeaderSmall";

const Layout = () => {
  return (
    <div className="flex">
      <Header />
      <HeaderSmall />
      <div className="min-h-screen w-full pb-24 md:pb-16 pt-14 md:pl-[108px]">
        <Outlet />
      </div>
      {/* <div className="mb-26" /> */}
    </div>
  );
};

export default Layout;
