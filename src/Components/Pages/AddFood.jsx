import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddFood = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    foodName: "",
    imageUrl: "",
    quantity: "",
    pickupLocation: "",
    expiryDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFood = {
      ...formData,
      donatorName: user.displayName,
      donatorEmail: user.email,
      donatorImage: user.photoURL,
      status: "available",
    };

    try {
      const res = await fetch("https://shareplate-server.onrender.com/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFood),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Food added successfully!",
          confirmButtonColor: "#FF6B6B",
        });

        setFormData({
          foodName: "",
          imageUrl: "",
          quantity: "",
          pickupLocation: "",
          expiryDate: "",
          notes: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add food.",
        });
      }
    } catch (error) {
      console.error("Error adding food:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while adding the food.",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow">
      <Helmet>
        <title>Add Food</title>{" "}
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Add Food</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="foodName"
          placeholder="Food Name"
          value={formData.foodName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="imageUrl"
          placeholder="Food Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="quantity"
          placeholder="Food Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="pickupLocation"
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-[#FF6B6B] text-white py-2 rounded hover:bg-[#e35d5d]"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddFood;
