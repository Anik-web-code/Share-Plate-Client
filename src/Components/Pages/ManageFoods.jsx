import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ManageFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingFood, setEditingFood] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchFoods = async () => {
      try {
        const res = await fetch(
          `https://shareplate-server.onrender.com/foods/donator/${user.email}`
        );
        const data = await res.json();
        setFoods(data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This food will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6B6B",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await fetch(`https://shareplate-server.onrender.com/foods/${id}`, {
        method: "DELETE",
      });
      setFoods(foods.filter((food) => food._id !== id));
      toast.success("Food deleted successfully!");
    }
  };

  const handleEditOpen = (food) => {
    setEditingFood({ ...food });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingFood({
      ...editingFood,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const id = editingFood._id;

    await fetch(`https://shareplate-server.onrender.com/foods/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingFood),
    });

    setFoods(
      foods.map((food) =>
        food._id === id ? { ...food, ...editingFood } : food
      )
    );
    setEditingFood(null);
    toast.success("Food updated successfully!");
  };

  if (loading) return <h1 className="text-[24px] text-center">Loading...</h1>;

  return (
      <div className="p-6">
          <Helmet><title>Manage Foods</title></Helmet>
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4 text-center text-[32px]">
        Manage My Foods
      </h2>

      {foods.length === 0 ? (
        <div>
          <h1 className="text-center text-[24px] mb-4">No foods found.</h1>
          <h1 className="text-center">
            <button className="text-white bg-[#FF6B6B] py-2 px-4 rounded text-[18px]">
              <Link to="/addfood">Add Food</Link>
            </button>
          </h1>
        </div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border text-[20px] font-medium">Image</th>
              <th className="p-2 border text-[20px] font-medium">Name</th>
              <th className="p-2 border text-[20px] font-medium">Quantity</th>
              <th className="p-2 border text-[20px] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id}>
                <td className="p-2 border text-[18px] font-medium">
                  <img
                    src={food.imageUrl}
                    alt={food.foodName}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="p-2 border text-[18px] font-medium">
                  {food.foodName}
                </td>
                <td className="p-2 border text-[18px] font-medium">
                  {food.quantity}
                </td>
                <td className="p-2 border text-[18px] font-medium space-x-2">
                  <button
                    onClick={() => handleEditOpen(food)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingFood && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4">Edit Food</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                name="foodName"
                value={editingFood.foodName}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="imageUrl"
                value={editingFood.imageUrl}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="quantity"
                value={editingFood.quantity}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                name="pickupLocation"
                value={editingFood.pickupLocation}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="date"
                name="expiryDate"
                value={editingFood.expiryDate?.split("T")[0] || ""}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
                required
              />

              <textarea
                name="notes"
                value={editingFood.notes}
                onChange={handleEditChange}
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingFood(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFoods;
