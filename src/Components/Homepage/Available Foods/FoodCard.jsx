import React from "react";
import { NavLink } from "react-router";
import Loader from "../../../Loader/Loader";

const FoodCard = ({ food }) => {

  return (
    <div className="mb-6 dark:text-[#FFFFFF]">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={food.imageUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[1.6rem]">{food.foodName}</h2>
          <p className="text-[22px] font-medium h-[64px]">
            Pickup Location: {food.pickupLocation}
          </p>
          <h1 className="text-[22px] font-medium">Status: {food.status}</h1>
          <h1 className="text-[22px] font-medium">Quantity: {food.quantity}</h1>
          <div className="card-actions flex justify-between">
            <h1 className="text-[22px] font-medium">
              Expiary Date: {food.expiryDate}
            </h1>
            <NavLink to={`/foods/${food._id}`}>
              <button className="px-4 py-2 text-[18px] text-[#FFFFFF] rounded-[6px] bg-[#FF6B6B] hover:bg-[#FF6B6B95]">
                {" "}
                Details
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
