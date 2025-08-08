import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="w-[80%] m-auto mb-16 flex flex-col justify-center">
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div className="p-6 w-full m-auto  text-center flex justify-center">
        <div className="bg-[#FFFFFF] p-10 rounded-xl">
          <img src="https://i.ibb.co.com/HDyFLrWY/images.png" alt="" />
        </div>
      </div>
      <h1 className="text-center text-[54px] text-red-400 font-medium">
        404 - Page Not Found
      </h1>
      <h1 className="text-center text-2xl">
        Oops! this page you are looking for doesn't exist
      </h1>
      <button className="mt-8">
        {" "}
        <Link
          className="bg-blue-500 font-bold text-[#FFFFFF] px-4 rounded-md py-2"
          to={"/"}
        >
          Go Back Home
        </Link>
      </button>
    </div>
  );
};

export default ErrorPage;
