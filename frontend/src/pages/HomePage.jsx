import React, { useState, useEffect } from "react";
import { getAllPets } from "../services/petService";
import { sendAdoptionRequestEmail } from "../services/emailService";
import LoadingPage from "./LoadingPage";
import { Search } from "lucide-react";
import { nextVaccination } from "../services/checkVaccination";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const [adoptionModalOpen, setAdoptionModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [emailSending, setEmailSending] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const petsData = await getAllPets();

        setPets(petsData);
        nextVaccination(petsData);
        setFilteredPets(petsData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch pets");
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  useEffect(() => {
    // Filter pets whenever search query or category changes
    if (searchQuery.trim() === "") {
      setFilteredPets(pets);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = pets.filter((pet) => {
        if (searchCategory === "name") {
          return pet.name.toLowerCase().includes(query);
        } else if (searchCategory === "gender") {
          return pet.gender.toLowerCase().includes(query);
        } else if (searchCategory === "adoptionStatus") {
          const status = pet.isAdopted ? "adopted" : "available";
          return status.includes(query);
        } else {
          // Search in all fields
          return (
            pet.name.toLowerCase().includes(query) ||
            pet.gender.toLowerCase().includes(query) ||
            (pet.isAdopted ? "adopted" : "available").includes(query)
          );
        }
      });
      setFilteredPets(filtered);
    }
  }, [searchQuery, searchCategory, pets]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitAdoptionRequest = async (e) => {
    e.preventDefault();

    if (!userDetails.name || !userDetails.email) {
      setEmailError("Please provide your name and email");
      return;
    }

    setEmailSending(true);
    setEmailError("");
    console.log(userDetails);

    try {
      await sendAdoptionRequestEmail(
        {
          ...selectedPet,
          ownerEmail: userDetails.email || "shelter@example.com", // Fallback email if not present
        },
        userDetails
      );

      setEmailSuccess(true);
      setTimeout(() => {
        setAdoptionModalOpen(false);
        setSelectedPet(null);
        setUserDetails({ name: "", email: "", phone: "" });
        setEmailSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setEmailError("Failed to send adoption request. Please try again later.");
    } finally {
      setEmailSending(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  if (loading) return <LoadingPage />;

  return (
    <section className="min-h-screen p-8 bg-gradient-to-r from-yellow-50 to-yellow-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-800 mb-6 text-center">
          Find Your Perfect Pet Companion
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Search Section */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for pets..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="w-full md:w-auto">
              <select
                value={searchCategory}
                onChange={handleCategoryChange}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="name">Name</option>
                <option value="gender">Gender</option>
                <option value="adoptionStatus">Adoption Status</option>
                <option value="all">All Fields</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Found {filteredPets.length}{" "}
            {filteredPets.length === 1 ? "pet" : "pets"}
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
        </div>

        {/* Pet Cards */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
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
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {pet.name}
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">DOB:</span>{" "}
                  {new Date(pet.dob).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Gender:</span> {pet.gender}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={
                      pet.isAdopted ? "text-red-500" : "text-green-500"
                    }
                  >
                    {pet.isAdopted ? "Adopted" : "Available"}
                  </span>
                </p>
                {!pet.isAdopted && (
                  <button
                    onClick={() => {
                      navigate("/adopt-form/" + pet._id);
                    }}
                    className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                  >
                    Adopt
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No pets found matching your search criteria.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Adoption Request Modal */}
      {adoptionModalOpen && selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Adopt {selectedPet.name}
            </h2>

            {emailSuccess ? (
              <div className="text-center py-8">
                <svg
                  className="w-16 h-16 text-green-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <p className="text-lg font-medium text-gray-800">
                  Adoption request sent successfully!
                </p>
                <p className="text-gray-600 mt-2">
                  The pet owner will contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitAdoptionRequest}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userDetails.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Your Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                {emailError && (
                  <p className="text-red-500 text-sm mb-4">{emailError}</p>
                )}

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setAdoptionModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={emailSending}
                    className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 disabled:bg-gray-400"
                  >
                    {emailSending ? "Sending..." : "Submit Request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HomePage;
