import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Calendar, PawPrint, LogIn, Dog } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-yellow-50 to-yellow-100 shadow-md py-4 px-6 sticky top-0 z-50 w-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <PawPrint className="h-8 w-8 text-yellow-600" />
            <span className="ml-2 text-2xl font-bold text-yellow-800">
              Petopia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/pets"
                  className="flex items-center text-yellow-800 hover:text-yellow-600 font-medium"
                >
                  <Dog className="h-5 w-5 mr-1" />
                  Pets
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center text-yellow-800 hover:text-yellow-600 font-medium"
                >
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </Link>
                <Link
                  to="/appointments"
                  className="flex items-center text-yellow-800 hover:text-yellow-600 font-medium"
                >
                  <Calendar className="h-5 w-5 mr-1" />
                  My Appointments
                </Link>
                <Link
                  to="/my-adoptions"
                  className="flex items-center text-yellow-800 hover:text-yellow-600 font-medium"
                >
                  <Calendar className="h-5 w-5 mr-1" />
                  My Adoptions
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                <LogIn className="h-5 w-5 mr-1" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-yellow-800">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-yellow-50 rounded-lg p-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-yellow-800 hover:text-yellow-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-yellow-800 hover:text-yellow-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/pets"
                className="text-yellow-800 hover:text-yellow-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Adopt
              </Link>
              <Link
                to="/about"
                className="text-yellow-800 hover:text-yellow-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-yellow-800 hover:text-yellow-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center text-yellow-800 hover:text-yellow-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-1" />
                    Profile
                  </Link>
                  <Link
                    to="/appointments"
                    className="flex items-center text-yellow-800 hover:text-yellow-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calendar className="h-5 w-5 mr-1" />
                    My Appointments
                  </Link>
                  <Link
                    to="/adoptions"
                    className="flex items-center text-yellow-800 hover:text-yellow-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PawPrint className="h-5 w-5 mr-1" />
                    My Adoptions
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5 mr-1" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
