import React, { useState } from "react";
import { motion } from "framer-motion";
import { loginUser } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginUser({ email, password });
      localStorage.setItem("user", JSON.stringify(user.user));
      if (user.user.role === "user") {
        navigate("/");
      } else if (user.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/doctor-dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[120vh]  w-screen flex flex-col items-center justify-between bg-white"
    >
      <div className="flex-1 mt-15">
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-lg  w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="flex items-center justify-center mt-12">
            Don't have an account?{" "}
            <Link className="text-blue-600" to="/register">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
