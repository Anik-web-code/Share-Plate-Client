import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import FoodCard from "../Homepage/Available Foods/FoodCard";
import { Helmet } from "react-helmet-async";

const AllFoods = () => {
  const { foods } = useContext(AuthContext);
  const [isThreeCol, setIsThreeCol] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const availableFoods = foods
    .filter(
      (food) =>
        food.status === "available" &&
        food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

  return (
      <div className="w-[96%] mx-auto lg:w-[80%] md:w-[90%] mt-24">
          <Helmet><title>Available Foods</title></Helmet>
      <h1 className="text-center text-[48px] font-medium mb-5">
        Featured Foods
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search food by name..."
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-[60%]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setIsThreeCol((prev) => !prev)}
          className="bg-[#FF6B6B] text-white px-6 py-2 rounded hover:bg-[#e55a5a]"
        >
          {isThreeCol ? "Change to 2 Columns" : "Change to 3 Columns"}
        </button>
      </div>

      <div
        className={`grid grid-cols-1 ${
          isThreeCol ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
        } gap-6 place-items-center`}
      >
        {availableFoods.length > 0 ? (
          availableFoods.map((food) => <FoodCard key={food._id} food={food} />)
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No matching foods found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
