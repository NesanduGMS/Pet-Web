import React from "react";
import { Link } from "react-router-dom";
import {
  PawPrint,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Heart
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-rose-800 pt-10 pb-6 w-screen">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center">
                <PawPrint className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-2xl font-bold text-white">
                Petopia
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Providing loving care and homes for pets since 2022. Your trusted
              partner in pet health, adoption, and happiness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-700 hover:text-pink-500 transition duration-300 flex items-center">
                  <span className="h-1 w-1 bg-pink-400 rounded-full mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-700 hover:text-pink-500 transition duration-300 flex items-center">
                  <span className="h-1 w-1 bg-pink-400 rounded-full mr-2"></span>
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/adoption" className="text-gray-700 hover:text-pink-500 transition duration-300 flex items-center">
                  <span className="h-1 w-1 bg-pink-400 rounded-full mr-2"></span>
                  Adoption Process
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-700 hover:text-pink-500 transition duration-300 flex items-center">
                  <span className="h-1 w-1 bg-pink-400 rounded-full mr-2"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 hover:text-pink-500 transition duration-300 flex items-center">
                  <span className="h-1 w-1 bg-pink-400 rounded-full mr-2"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-rose-800 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700 group">
                <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3 group-hover:bg-pink-200 transition duration-300">
                  <Phone className="h-4 w-4 text-pink-500" />
                </div>
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center text-gray-700 group">
                <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3 group-hover:bg-pink-200 transition duration-300">
                  <Mail className="h-4 w-4 text-pink-500" />
                </div>
                <span>info@petopia.com</span>
              </li>
              <li className="flex items-start text-gray-700 group">
                <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3 mt-1 group-hover:bg-pink-200 transition duration-300">
                  <MapPin className="h-4 w-4 text-pink-500" />
                </div>
                <span>123 Pet Care Lane, Animal City, PC 12345</span>
              </li>
            </ul>
          </div>

          {/* Social Links & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-rose-800 mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-3 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-pink-100 transition duration-300 group"
              >
                <Instagram className="h-5 w-5 text-pink-500 group-hover:text-pink-600" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-pink-100 transition duration-300 group"
              >
                <Facebook className="h-5 w-5 text-pink-500 group-hover:text-pink-600" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-pink-100 transition duration-300 group"
              >
                <Twitter className="h-5 w-5 text-pink-500 group-hover:text-pink-600" />
              </a>
            </div>
            <h3 className="text-lg font-semibold text-rose-800 mb-3">
              Newsletter
            </h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 border border-pink-600 rounded-l-full focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 w-full"
              />
              <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-r-full hover:from-pink-600 hover:to-pink-700 transition duration-300 flex items-center shadow-md">
                <Heart className="h-4 w-4 mr-1" />
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Petopia. All rights reserved.
            </p>
            <div className="flex space-x-4 text-gray-300 text-sm">
              <Link to="/privacy" className="hover:text-pink-500 transition duration-300">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-pink-500 transition duration-300">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-pink-500 transition duration-300">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;