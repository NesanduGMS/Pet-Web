import React, { useState } from "react";
import AdminPets from "../components/admin/AdminPets";
import AdminUsers from "../components/admin/AdminUsers";
import AdminAdoptions from "../components/admin/AdminAdoptions";
import { Users, Cat, Heart, LayoutDashboard, Settings, Bell, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("userManagement");

  return (
    <div className="flex h-screen bg-rose-50 overflow-hidden">
      {/* Advanced Sidebar - fixed with no scroll */}
      <div className="w-72 bg-pink-500 shadow-xl h-screen flex flex-col justify-between">
        {/* Top section with logo */}
        <div>
          <div className="p-6 bg-pink-600 border-b border-pink-400">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-6 w-6 text-pink-600" />
              </div>
              <h1 className="text-xl font-bold text-white">PetAdmin</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <div className="mb-4">
              <p className="text-pink-200 uppercase text-xs font-semibold tracking-wider px-2">
                Management
              </p>
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  className={`w-full text-left px-4 py-3 flex items-center space-x-3 rounded-lg transition-all duration-200 ${
                    activeSection === "userManagement"
                      ? "bg-pink-400 text-white font-medium shadow-md"
                      : "text-white hover:bg-pink-400"
                  }`}
                  onClick={() => setActiveSection("userManagement")}
                >
                  <Users size={18} />
                  <span>User Management</span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-3 flex items-center space-x-3 rounded-lg transition-all duration-200 ${
                    activeSection === "petManagement"
                      ? "bg-pink-400 text-white font-medium shadow-md"
                      : "text-white hover:bg-pink-400"
                  }`}
                  onClick={() => setActiveSection("petManagement")}
                >
                  <Cat size={18} />
                  <span>Pet Management</span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-3 flex items-center space-x-3 rounded-lg transition-all duration-200 ${
                    activeSection === "adoptionManagement"
                      ? "bg-pink-400 text-white font-medium shadow-md"
                      : "text-white hover:bg-pink-400"
                  }`}
                  onClick={() => setActiveSection("adoptionManagement")}
                >
                  <Heart size={18} />
                  <span>Adoption Management</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom section */}
        <div className="p-4 border-t border-pink-400">
          <button className="w-full text-left px-4 py-3 flex items-center space-x-3 rounded-lg transition-all duration-200 text-white hover:bg-pink-400">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-rose-950">
            {activeSection === "userManagement" && "User Management"}
            {activeSection === "petManagement" && "Pet Management"}
            {activeSection === "adoptionManagement" && "Adoption Management"}
          </h2>
          <p className="text-gray-500">
            {activeSection === "userManagement" && "Manage user accounts and permissions"}
            {activeSection === "petManagement" && "Manage pet listings and information"}
            {activeSection === "adoptionManagement" && "Manage adoption applications and status"}
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border border-rose-100">
          {activeSection === "userManagement" && (
            <div className="w-full">
              <AdminUsers />
            </div>
          )}

          {activeSection === "petManagement" && (
            <div className="w-full">
              <AdminPets />
            </div>
          )}
          
          {activeSection === "adoptionManagement" && (
            <div className="w-full">
              <AdminAdoptions />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;