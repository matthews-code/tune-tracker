import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./subcomponents/Header";
import HeaderSmall from "./subcomponents/HeaderSmall";

const Layout = () => {
  return (
    <div className="flex">
      <Header />
      <HeaderSmall />
      <div className="md:pb-16 md:pl-[108px] min-h-screen w-full pb-24 pt-8 xs:pt-14">
        <Outlet />
      </div>
      {/* <div className="mb-26" /> */}
    </div>
  );
};

export default Layout;
