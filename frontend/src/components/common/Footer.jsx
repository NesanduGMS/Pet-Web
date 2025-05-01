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
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-100 to-yellow-200 pt-10 pb-6 w-screen">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <PawPrint className="h-8 w-8 text-yellow-600" />
              <span className="ml-2 text-2xl font-bold text-yellow-800">
                Petopia
              </span>
            </div>
            <p className="text-yellow-800 mb-4">
              Providing loving care and homes for pets since 2022. Your trusted
              partner in pet health, adoption, and happiness.
            </p>
          </div>

          {/* Quick Links */}
          <div></div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-yellow-700">
                <Phone className="h-5 w-5 mr-2" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center text-yellow-700">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@petopia.com</span>
              </li>
              <li className="flex items-start text-yellow-700">
                <MapPin className="h-5 w-5 mr-2 mt-1" />
                <span>123 Pet Care Lane, Animal City, PC 12345</span>
              </li>
            </ul>
          </div>

          {/* Social Links & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 hover:text-yellow-600"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 hover:text-yellow-600"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 hover:text-yellow-600"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Newsletter
            </h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 border border-yellow-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-300 mt-8 pt-6">
          <p className="text-center text-yellow-700">
            &copy; {new Date().getFullYear()} Petopia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
