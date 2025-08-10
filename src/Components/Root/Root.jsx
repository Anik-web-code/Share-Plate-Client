import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
