import { useParams } from "react-router";
import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { Helmet } from "react-helmet-async";
import Loader from "../../Loader/Loader";

const fetchFoodById = async (id) => {
  const res = await fetch(`https://shareplate-server.onrender.com/foods/${id}`);
  if (!res.ok) throw new Error("Failed to fetch food");
  return res.json();
};

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState("");

  const {
    data: food,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["food", id],
    queryFn: () => fetchFoodById(id),
  });

  const requestMutation = useMutation({
    mutationFn: async (requestData) => {
      const res = await fetch(
        "https://shareplate-server.onrender.com/requests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (!res.ok) throw new Error("Failed to send request");

      await fetch(
        `https://shareplate-server.onrender.com/foods/${requestData.foodId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "requested" }),
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["food", id]);
      setShowModal(false);
      setNotes("");
      alert("Request sent successfully!");
    },
    onError: () => {
      alert("Failed to send request");
    },
  });

  const handleRequest = () => {
    const requestData = {
      foodId: food._id,
      foodName: food.foodName,
      imageUrl: food.imageUrl,
      donatorEmail: food.donatorEmail,
      donatorName: food.donatorName,
      userEmail,
      requestDate: new Date().toISOString(),
      pickupLocation: food.pickupLocation,
      expiryDate: food.expiryDate,
      notes,
    };

    requestMutation.mutate(requestData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader />
      </div>
    );
  }

  if (isError || !food) return <p className="text-center">Food not found</p>;

  return (
    <div className="p-8 w-[95%] mx-auto md:w-[60%] lg:w-[33%] border-2 border-[#FF6B6B] rounded-2xl">
      <Helmet>
        <title>Food Details</title>
      </Helmet>
      <h1 className="text-3xl font-bold">{food.foodName}</h1>
      <img
        src={food.imageUrl}
        alt={food.foodName}
        className="w-[100%] object-cover mt-4"
      />
      <p className="mt-2 text-[24px] font-medium">Category: {food.category}</p>
      <p className="mt-2 text-[24px] font-medium">Quantity: {food.quantity}</p>
      <p className="mt-2 text-[24px] font-medium">
        Pickup Location: {food.pickupLocation}
      </p>
      <p className="mt-2 text-[24px] font-medium">
        Expiry Date: {food.expiryDate}
      </p>
      <p className="mt-2 text-[24px] font-medium">
        Donator: {food.donatorName} ({food.donatorEmail})
      </p>

      <button
        onClick={() => setShowModal(true)}
        className="border border-[#FF6B6B] w-full py-2 text-[24px] font-medium hover:bg-[#FF6B6B] hover:text-[#FFFFFF] mt-6 rounded-2xl"
      >
        Request
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-2xl w-[90%] md:w-[500px]">
            <h2 className="text-2xl font-bold mb-4">Request Food</h2>
            <div className="space-y-2">
              <p className="mb-2 text-[20px] font-medium">
                Food Name: {food.foodName}
              </p>
              <p className="mb-2 text-[18px] font-medium">
                Food ID: {food._id}
              </p>
              <p className="mb-2 text-[18px] font-medium">
                Donator: {food.donatorName} ({food.donatorEmail})
              </p>
              <p className="mb-2 text-[18px] font-medium">
                User Email: {userEmail}
              </p>
              <p className="mb-2 text-[18px] font-medium">
                Pickup Location: {food.pickupLocation}
              </p>
              <p className="mb-2 text-[18px] font-medium">
                Expiry Date: {food.expiryDate}
              </p>
              <textarea
                className="w-full border p-2 rounded mt-2"
                placeholder="Additional Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-[18px] rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleRequest}
                className="px-4 py-2 text-[18px] bg-[#FF6B6B] text-white rounded hover:bg-[#e35d5d]"
                disabled={requestMutation.isLoading}
              >
                {requestMutation.isLoading ? "Requesting..." : "Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
