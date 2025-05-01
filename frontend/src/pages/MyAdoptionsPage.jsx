import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";
import adoptionService from "../services/adoptionService";

const MyAdoptionsPage = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        if (!userId) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const data = await adoptionService.getAdoptions();
        setAdoptions(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch your adoptions");
        setLoading(false);
        console.error(err);
      }
    };

    fetchAdoptions();
  }, [userId]);

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this adoption request?")
    ) {
      try {
        await adoptionService.deleteAdoption(id);
        setAdoptions(adoptions.filter((adoption) => adoption._id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete adoption request");
      }
    }
  };

  if (loading)
    return <div className="p-4 text-yellow-800">Loading your adoptions...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!userId)
    return (
      <div className="p-4 text-red-600">
        Please login to view your adoptions
      </div>
    );

  return (
    <div className="h-[90vh] bg-yellow-50 p-6 rounded-lg shadow-md overflow-y-auto">
      <h2 className="text-2xl font-bold text-yellow-800 mb-6">
        My Adoption Requests
      </h2>

      {adoptions.length === 0 ? (
        <div className="text-center py-8 text-yellow-700">
          You haven't made any adoption requests yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-yellow-200 rounded-lg overflow-hidden">
            <thead className="bg-yellow-300 text-yellow-900">
              <tr>
                <th className="py-3 px-4 text-left">Pet</th>
                <th className="py-3 px-4 text-left">Request Date</th>
                <th className="py-3 px-4 text-left">Living Situation</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adoptions.map((adoption) => (
                <tr
                  key={adoption._id}
                  className="border-b border-yellow-100 hover:bg-yellow-50"
                >
                  <td className="py-3 px-4 flex items-center">
                    {adoption.pet.image ? (
                      <img
                        src={`http://localhost:5001${adoption.pet.image}`}
                        alt={adoption.pet.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center mr-3">
                        <span className="text-yellow-700 font-medium">
                          {adoption.pet.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{adoption.pet.name}</div>
                      <div className="text-sm text-yellow-600">
                        {adoption.pet.gender}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {format(new Date(adoption.createdAt), "PPP")}
                  </td>
                  <td className="py-3 px-4 capitalize">
                    {adoption.livingSituation.toLowerCase()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        adoption.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : adoption.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {adoption.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {adoption.status !== "Completed" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/edit-adoption/${adoption._id}`)
                          }
                          className="text-yellow-700 hover:text-yellow-900 p-1"
                          title="Edit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(adoption._id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAdoptionsPage;
