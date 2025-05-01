import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPetsByOwner, deletePet } from "../services/petService";
import LoadingPage from "./LoadingPage";

const UserPetsContainer = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPets = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        const petsData = await getPetsByOwner(user._id);
        setPets(petsData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch pets");
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleDelete = async (petId) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        await deletePet(petId);
        setPets(pets.filter((pet) => pet._id !== petId)); // Remove the deleted pet from the list
        alert("Pet deleted successfully!");
      } catch (err) {
        console.error(err);
        setError("Failed to delete pet");
      }
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <section className="w-screen h-screen flex flex-col p-8 bg-gradient-to-r from-yellow-50 to-yellow-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Pets</h1>
        <Link
          to="/create-pet"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create Pet
        </Link>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {pet.image && (
              <img
                src={`http://localhost:5001${pet.image}`}
                alt={pet.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">DOB:</span>{" "}
              {new Date(pet.dob).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Gender:</span> {pet.gender}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Adopted:</span>{" "}
              {pet.isAdopted ? "Yes" : "No"}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Next Vaccination:</span>{" "}
              {pet.nextVaccinateDate
                ? new Date(pet.nextVaccinateDate).toLocaleDateString()
                : "Not scheduled"}
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => navigate(`/edit-pet/${pet._id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pet._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserPetsContainer;
