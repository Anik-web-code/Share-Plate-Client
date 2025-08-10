import React from "react";
import Slider from "./Slider";
import AvailableFoods from "./Available Foods/AvailableFoods";
import Volunteer from "./Top Volunteers/Volunteer";
import Stats from "./Counter/Stats";
import { Helmet } from "react-helmet-async";
import ContactUs from "./ContactUs";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Slider></Slider>
      <AvailableFoods></AvailableFoods>
      <Volunteer></Volunteer>
      <Stats></Stats>
      <ContactUs></ContactUs>
    </div>
  );
};

export default HomePage;
