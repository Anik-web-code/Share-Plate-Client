import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthContext";
import FoodCard from "./FoodCard";
import { Link } from "react-router";
import Loader from "../../../Loader/Loader";

const AvailableFoods = () => {
  const { foods } = useContext(AuthContext);

  // Filter and prepare featured foods only if foods is loaded
  const featuredFoods =
    foods && foods.length > 0
      ? foods
          .filter((food) => Number(food.quantity) !== 649)
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 6)
      : [];

  return (
    <div className="w-[96%] mx-auto lg:w-[80%] md:w-[90%] mt-24">
      <h1 className="text-center text-[48px] font-medium mb-5">
        Featured Foods
      </h1>

      {/* Show loader OR grid depending on foods state */}
      {!foods || foods.length === 0 ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {featuredFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}

      <h1 className="text-center mb-10">
        <Link to="/available-foods">
          <button className="text-[#FFFFFF] bg-[#FF6B6B] py-2 px-4 rounded-[4px] text-[18px]">
            All Available Foods
          </button>
        </Link>
      </h1>
    </div>
  );
};

export default AvailableFoods;
