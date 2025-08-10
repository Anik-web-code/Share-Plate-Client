import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router"; // make sure to use react-router-dom
import NavBar from "./NavBar";
import Footer from "./Footer";
import Loader from "../../Loader/Loader";

const Root = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
        setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 50); 
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      <NavBar />
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader />
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  );
};

export default Root;
