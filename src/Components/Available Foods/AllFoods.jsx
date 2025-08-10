import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import FoodCard from "../Homepage/Available Foods/FoodCard";
import { Helmet } from "react-helmet-async";
import Loader from "../../Loader/Loader";

const AllFoods = () => {
  const { foods } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  if (!foods || foods.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader />
      </div>
    );
  }

  let availableFoods = foods
    .filter(
      (food) =>
        food.status === "available" &&
        food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
    );

 
  availableFoods = availableFoods.sort((a, b) => {
    const qtyA = Number(a.quantity);
    const qtyB = Number(b.quantity);

    if (sortOrder === "asc") {
      return qtyA - qtyB;
    } else {
      return qtyB - qtyA;
    }
  });

  return (
    <div className="w-[96%] mx-auto lg:w-[80%] md:w-[90%] mt-24">
      <Helmet>
        <title>Available Foods</title>
      </Helmet>
      <h1 className="text-center text-[48px] font-medium mb-5">Available Foods</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search food by name..."
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-[60%]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-[36%]"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Quantity: High to Low</option>
          <option value="asc">Quantity: Low to High</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
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
