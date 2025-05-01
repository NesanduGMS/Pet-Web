import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPet } from "../services/petService";
import LoadingPage from "./LoadingPage";

const CreatePet = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [isAdopted, setIsAdopted] = useState(false);
  const [nextVaccinateDate, setNextVaccinateDate] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    dob: "",
    nextVaccinateDate: "",
  });
  const navigate = useNavigate();

  // Get today's date formatted as YYYY-MM-DD for max attribute on date inputs
  const today = new Date().toISOString().split("T")[0];

  // Validate dates whenever they change
  useEffect(() => {
    validateDates();
  }, [dob, nextVaccinateDate]);

  const validateDates = () => {
    const errors = {
      dob: "",
      nextVaccinateDate: "",
    };

    // Validate Date of Birth
    if (dob) {
      const dobDate = new Date(dob);
      const currentDate = new Date();
      
      if (dobDate > currentDate) {
        errors.dob = "Date of birth cannot be in the future";
      }
    }

    // Validate Next Vaccination Date
    if (nextVaccinateDate) {
      const vaccDate = new Date(nextVaccinateDate);
      const currentDate = new Date();
      
      if (vaccDate > currentDate) {
        // This is actually valid - next vaccination date can be in the future
        errors.nextVaccinateDate = "";
      }
    }

    setValidationErrors(errors);
  };

  const handleDobChange = (e) => {
    const selectedDate = e.target.value;
    setDob(selectedDate);
  };

  const handleVaccinationDateChange = (e) => {
    const selectedDate = e.target.value;
    setNextVaccinateDate(selectedDate);
  };

  const isFormValid = () => {
    return (
      name.trim() !== "" && 
      dob !== "" && 
      !validationErrors.dob
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Additional validation before submission
    if (!isFormValid()) {
      setError("Please correct the validation errors before submitting");
      return;
    }
    
    setLoading(true);
    setError("");

    const owner = JSON.parse(localStorage.getItem("user"));
    if (!owner) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("owner", owner._id);
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("isAdopted", isAdopted);
    formData.append("nextVaccinateDate", nextVaccinateDate);
    if (image) {
      formData.append("image", image);
    }

    try {
      await createPet(formData);
      alert("Pet created successfully!");
      navigate("/pets"); // Redirect to pets list page
    } catch (err) {
      console.error(err);
      setError("Failed to create pet");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 to-yellow-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Pet
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={handleDobChange}
              max={today}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                validationErrors.dob ? "border-red-500" : ""
              }`}
              required
            />
            {validationErrors.dob && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.dob}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Is Adopted?
            </label>
            <input
              type="checkbox"
              checked={isAdopted}
              onChange={(e) => setIsAdopted(e.target.checked)}
              className="w-4 h-4 text-blue-600 border rounded focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Next Vaccination Date
            </label>
            <input
              type="date"
              value={nextVaccinateDate}
              onChange={handleVaccinationDateChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {validationErrors.nextVaccinateDate && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.nextVaccinateDate}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full text-white py-2 rounded-lg transition duration-300 ${
              isFormValid()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Create Pet
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePet;