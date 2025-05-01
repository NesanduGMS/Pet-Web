import React, { useState } from "react";
import { motion } from "framer-motion";
import { registerUser } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import CatAnimation from "../components/common/CatAnimation";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Validate mobile number (supports various international formats)
  const validatePhoneNumber = (phoneNumber) => {
    // Regex that allows:
    // - Optional '+' at the start
    // - 9-15 digits
    // - Can include spaces, dashes, and parentheses
    const phoneRegex = /^(\+?\d{9,15})$/;
    return phoneRegex.test(phoneNumber.replace(/[\s-()]/g, ""));
  };

  // Validate password
  const validatePassword = (pwd) => {
    return pwd.length >= 8;
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);

    // Validate phone number
    if (!validatePhoneNumber(phoneValue)) {
      setValidationErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid phone number (9-15 digits)",
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    // Validate password
    if (!validatePassword(passwordValue)) {
      setValidationErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long",
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Perform final validation before submission
    const phoneValid = validatePhoneNumber(phone);
    const passwordValid = validatePassword(password);

    if (!phoneValid || !passwordValid) {
      setValidationErrors({
        phone: phoneValid ? "" : "Please enter a valid phone number",
        password: passwordValid
          ? ""
          : "Password must be at least 8 characters long",
      });
      return;
    }

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    if (image) {
      formData.append("image", image);
    }

    try {
      const user = await registerUser(formData);
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "user") {
        navigate("/");
      } else if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/doctor-dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen w-screen flex items-center justify-between"
    >
      <div className="flex-1">
        <LoadingPage />
      </div>
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100  p-8 rounded-lg shadow-lg flex-2">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                  ${
                    validationErrors.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-600"
                  }`}
                required
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.phone}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                  ${
                    validationErrors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-blue-600"
                  }`}
                required
              />
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.password}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Profile Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={
              isLoading ||
              !!validationErrors.phone ||
              !!validationErrors.password
            }
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-4"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="flex items-center justify-center mt-12">
          Already have an account?{" "}
          <Link className="text-blue-600 ml-1" to="/login">
            Login Now
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <CatAnimation />
      </div>
    </motion.div>
  );
};

export default RegisterPage;
