import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../AuthProvider/AuthContext";
import Loader from "../../Loader/Loader";

const MyFoodRequests = () => {
  const { email } = useParams();
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user?.email !== email) return;

    fetch(`https://shareplate-server.onrender.com/requests/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setLoading(false);
      });
  }, [email, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>My Food Requests</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center">My Food Requests</h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="text-[20px] font-bold">
              <tr>
                <th>Donor Name</th>
                <th>Pickup Location</th>
                <th>Expire Date</th>
                <th>Request Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-[18px] font-medium">
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.donatorName}</td>
                  <td>{req.pickupLocation}</td>
                  <td>{req.expiryDate}</td>
                  <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                  <td>{req.status || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoodRequests;
