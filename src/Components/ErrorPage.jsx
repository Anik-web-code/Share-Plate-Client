import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="w-[80%] m-auto mb-16 flex flex-col justify-center min-h-screen">
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>

      <div className="p-6 w-full mx-auto text-center flex justify-center">
        <div className="bg-white dark:bg-[#FFFFFF] p-10 rounded-xl shadow-lg">
          <img
            src="https://i.ibb.co/HDyFLrWY/images.png"
            alt="404 Illustration"
            className="max-w-[400px] mx-auto"
          />
        </div>
      </div>

      <h1 className="text-center text-[54px] text-red-400 dark:text-red-400 font-medium">
        404 - Page Not Found
      </h1>
      <h2 className="text-center text-2xl text-gray-800 dark:text-black mt-2">
        Oops! The page you are looking for doesn't exist.
      </h2>

      <div className="text-center mt-8">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 font-bold text-white px-6 py-2 rounded-md transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
