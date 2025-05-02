import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Calendar, PawPrint, LogIn, Dog, Heart } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      className={`bg-rose-950 shadow-lg py-3 px-6 sticky top-0 z-50 w-screen transition-all duration-300 ${
        scrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center group-hover:shadow-md transition duration-300">
              <PawPrint className="h-6 w-6 text-white" />
            </div>
            <span className="ml-2 text-2xl font-bold text-white group-hover:text-pink-300 transition duration-300">
              Petopia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Desktop links are shown through the user-specific menu */}
            
            {user ? (
              <div className="flex items-center space-x-1 pl-4 border-l border-pink-900">
                <Link
                  to="/pets"
                  className="flex items-center text-gray-300 hover:text-pink-400 px-3 py-2 rounded-lg hover:bg-rose-900 transition duration-300"
                >
                  <Dog className="h-5 w-5 mr-1.5" />
                  <span>Pets</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center text-gray-300 hover:text-pink-400 px-3 py-2 rounded-lg hover:bg-rose-900 transition duration-300"
                >
                  <User className="h-5 w-5 mr-1.5" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/appointments"
                  className="flex items-center text-gray-300 hover:text-pink-400 px-3 py-2 rounded-lg hover:bg-rose-900 transition duration-300"
                >
                  <Calendar className="h-5 w-5 mr-1.5" />
                  <span>My Appointments</span>
                </Link>
                <Link
                  to="/my-adoptions"
                  className="flex items-center text-gray-300 hover:text-pink-400 px-3 py-2 rounded-lg hover:bg-rose-900 transition duration-300"
                >
                  <Heart className="h-5 w-5 mr-1.5" />
                  <span>My Adoptions</span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-pink-700 transition duration-300 shadow-md"
              >
                <LogIn className="h-5 w-5 mr-1.5" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-white hover:text-pink-400 transition duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
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
          <div className="md:hidden mt-4 bg-rose-900 rounded-xl p-4 shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-300 hover:text-pink-400 font-medium px-3 py-2 rounded-lg hover:bg-rose-800 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-gray-300 hover:text-pink-400 font-medium px-3 py-2 rounded-lg hover:bg-rose-800 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/pets"
                className="text-gray-300 hover:text-pink-400 font-medium px-3 py-2 rounded-lg hover:bg-rose-800 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Adopt
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-pink-400 font-medium px-3 py-2 rounded-lg hover:bg-rose-800 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-pink-400 font-medium px-3 py-2 rounded-lg hover:bg-rose-800 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="border-t border-rose-800 my-2 pt-2">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center text-gray-300 hover:text-pink-400 font-medium px-3 py-2 rounded-lg hover:bg-rose-800 transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/appointments"
                      className="flex items-center text-gray-300 hover:text-pink-400 font-medium px-3 py-2 rounded-lg hover:bg-rose-800 transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      My Appointments
                    </Link>
                    <Link
                      to="/my-adoptions"
                      className="flex items-center text-gray-300 hover:text-pink-400 font-medium px-3 py-2 rounded-lg hover:bg-rose-800 transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <PawPrint className="h-5 w-5 mr-2" />
                      My Adoptions
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-pink-700 transition duration-300 shadow-md mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;