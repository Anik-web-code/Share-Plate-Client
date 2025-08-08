import React from "react";
import Slider from "./Slider";
import AvailableFoods from "./Available Foods/AvailableFoods";
import Volunteer from "./Top Volunteers/Volunteer";
import Stats from "./Counter/Stats";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
      <div>
          <Helmet><title>Home</title></Helmet>
      <Slider></Slider>
      <AvailableFoods></AvailableFoods>
          <Volunteer></Volunteer>
          <Stats></Stats>
    </div>
  );
};

export default HomePage;
