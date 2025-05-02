import React, { useState, useEffect } from "react";
import { getAllPets } from "../services/petService";
import { sendAdoptionRequestEmail } from "../services/emailService";
import LoadingPage from "./LoadingPage";
import { 
  Search, 
  Heart, 
  PawPrint, 
  Calendar, 
  CheckCircle,
  Venus,
  Mars,
  Loader2
} from "lucide-react";
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

    try {
      await sendAdoptionRequestEmail(
        {
          ...selectedPet,
          ownerEmail: userDetails.email || "shelter@example.com",
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
    <section className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-950 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Find Your Perfect Pet Companion
          </h1>
          <p className="text-center text-pink-100 max-w-2xl mx-auto">
            Browse our adorable pets waiting for their forever homes
          </p>
        </div>

        {error && (
          <div className="bg-rose-100 border-l-4 border-rose-500 text-rose-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* Modern Search Section */}
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg backdrop-blur-sm bg-opacity-70">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-pink-400" />
              </div>
              <input
                type="text"
                placeholder="Search for pets..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div className="w-full md:w-auto">
              <div className="relative">
                <select
                  value={searchCategory}
                  onChange={handleCategoryChange}
                  className="appearance-none w-full md:w-auto px-4 py-3 pr-8 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white text-pink-800"
                >
                  <option value="name">Name</option>
                  <option value="gender">Gender</option>
                  <option value="adoptionStatus">Adoption Status</option>
                  <option value="all">All Fields</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-pink-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center text-sm text-pink-600">
            <PawPrint className="h-4 w-4 mr-1" />
            Found {filteredPets.length} {filteredPets.length === 1 ? "pet" : "pets"}
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
        </div>

        {/* Pet Cards Grid */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <div
                key={pet._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative">
                  {pet.image && (
                    <img
                      src={`http://localhost:5001${pet.image}`}
                      alt={pet.name}
                      className="w-full h-60 object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${pet.isAdopted ? 'bg-rose-600 text-white' : 'bg-pink-500 text-white'}`}>
                      {pet.isAdopted ? 'Adopted' : 'Available'}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                      {pet.name}
                    </h2>
                    {pet.gender === 'male' ? (
                      <Mars className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Venus className="h-5 w-5 text-pink-500" />
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-pink-400" />
                      <span>DOB: {new Date(pet.dob).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-pink-400" />
                      <span>Breed: {pet.breed || 'Unknown'}</span>
                    </div>
                  </div>
                  
                  {!pet.isAdopted && (
                    <button
                      onClick={() => {
                        navigate("/adopt-form/" + pet._id);
                      }}
                      className="mt-4 w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-2 rounded-xl hover:from-pink-600 hover:to-rose-700 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <PawPrint className="h-4 w-4" />
                      Adopt Me
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-md">
            <div className="max-w-md mx-auto">
              <PawPrint className="h-12 w-12 mx-auto text-pink-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No pets found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `No pets match "${searchQuery}"`
                  : "Currently no pets available for adoption"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition duration-300 shadow-md"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modern Adoption Modal */}
      {adoptionModalOpen && selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-md w-full animate-fade-in">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-4 text-white">
              <h2 className="text-2xl font-bold">
                Adopt {selectedPet.name}
              </h2>
            </div>

            <div className="p-6">
              {emailSuccess ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Request Sent!</h3>
                  <p className="text-gray-600">
                    We've sent your adoption request for {selectedPet.name}.
                  </p>
                  <p className="text-gray-600 mt-2">
                    The shelter will contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitAdoptionRequest}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={userDetails.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>

                    {emailError && (
                      <div className="bg-rose-50 border-l-4 border-rose-500 p-3 text-rose-700 text-sm">
                        {emailError}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setAdoptionModalOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={emailSending}
                      className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:from-pink-600 hover:to-rose-700 transition-all duration-300 disabled:opacity-70 flex items-center gap-2"
                    >
                      {emailSending ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                          Sending...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomePage;