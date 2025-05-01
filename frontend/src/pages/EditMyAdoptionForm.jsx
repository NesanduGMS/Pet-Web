import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adoptionService from "../services/adoptionService";

const EditMyAdoptionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    livingSituation: "",
    previousPetExperience: "",
    otherPets: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Validation Functions (same as create form)
  const validateName = (name) => {
    return /^[a-zA-Z]+\s[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePhone = (phoneNumber) => {
    return /^(\+?\d{9,15})$/.test(phoneNumber.replace(/[\s-()]/g, ""));
  };

  // Fetch existing adoption data
  useEffect(() => {
    const fetchAdoptionData = async () => {
      try {
        const adoption = await adoptionService.getAdoptionById(id);
        setFormData({
          name: adoption.name,
          email: adoption.email,
          phoneNumber: adoption.phoneNumber,
          livingSituation: adoption.livingSituation,
          previousPetExperience: adoption.previousPetExperience,
          otherPets: adoption.otherPets,
        });
        setInitialLoad(false);
      } catch (error) {
        console.error("Failed to fetch adoption data:", error);
        alert("Failed to load adoption data");
        navigate("/my-adoptions");
      }
    };

    fetchAdoptionData();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate individual fields
    switch (name) {
      case "name":
        setValidationErrors((prev) => ({
          ...prev,
          name: validateName(value)
            ? ""
            : "Please enter full name (First Last)",
        }));
        break;
      case "email":
        setValidationErrors((prev) => ({
          ...prev,
          email: validateEmail(value) ? "" : "Please enter a valid email",
        }));
        break;
      case "phoneNumber":
        setValidationErrors((prev) => ({
          ...prev,
          phoneNumber: validatePhone(value)
            ? ""
            : "Please enter a valid phone number",
        }));
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const errors = {
      name: validateName(formData.name)
        ? ""
        : "Please enter full name (First Last)",
      email: validateEmail(formData.email) ? "" : "Please enter a valid email",
      phoneNumber: validatePhone(formData.phoneNumber)
        ? ""
        : "Please enter a valid phone number",
      livingSituation: formData.livingSituation
        ? ""
        : "Please describe your living situation",
      previousPetExperience: formData.previousPetExperience
        ? ""
        : "Please share your pet experience",
    };

    setValidationErrors(errors);

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) return;

    // Submit form
    setIsLoading(true);
    try {
      await adoptionService.updateAdoption(id, formData);
      alert("Adoption request updated successfully");
      navigate("/my-adoptions");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update adoption request");
    } finally {
      setIsLoading(false);
    }
  };

  if (initialLoad) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading adoption data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Adoption Application
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="First Last"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                ${
                  validationErrors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-300"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-300"
                }`}
            />
            {validationErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                ${
                  validationErrors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-300"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-300"
                }`}
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+1234567890"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                ${
                  validationErrors.phoneNumber
                    ? "border-red-500 focus:ring-2 focus:ring-red-300"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-300"
                }`}
            />
            {validationErrors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.phoneNumber}
              </p>
            )}
          </div>

          {/* Living Situation */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Living Situation
            </label>
            <select
              name="livingSituation"
              value={formData.livingSituation}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                ${
                  validationErrors.livingSituation
                    ? "border-red-500 focus:ring-2 focus:ring-red-300"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-300"
                }`}
            >
              <option value="">Select your living situation</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Other">Other</option>
            </select>
            {validationErrors.livingSituation && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.livingSituation}
              </p>
            )}
          </div>

          {/* Previous Pet Experience */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Previous Pet Experience
            </label>
            <textarea
              name="previousPetExperience"
              value={formData.previousPetExperience}
              onChange={handleInputChange}
              placeholder="Tell us about pets you've owned before"
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                ${
                  validationErrors.previousPetExperience
                    ? "border-red-500 focus:ring-2 focus:ring-red-300"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-300"
                }`}
            />
            {validationErrors.previousPetExperience && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.previousPetExperience}
              </p>
            )}
          </div>

          {/* Other Pets */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Other Pets in Household
            </label>
            <textarea
              name="otherPets"
              value={formData.otherPets}
              onChange={handleInputChange}
              placeholder="List other pets you currently own (if any)"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 
              ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </div>
            ) : (
              "Update Adoption Application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMyAdoptionForm;
