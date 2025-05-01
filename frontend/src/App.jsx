import React from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashbaord from "./pages/DoctorDashbaord";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProfilePage from "./pages/ProfilePage";
import UserPetsContainer from "./pages/UserPetsContainer";
import CreatePet from "./pages/CreatePet";
import EditPet from "./pages/EditPet";
import AdoptForm from "./pages/AdoptForm";
import MyAdoptionsPage from "./pages/MyAdoptionsPage";
import EditMyAdoptionForm from "./pages/EditMyAdoptionForm";

// Layout component with Navbar and Footer
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pets" element={<UserPetsContainer />} />
          <Route path="/create-pet" element={<CreatePet />} />
          <Route path="/edit-pet/:id" element={<EditPet />} />
          <Route path="/adopt-form/:id" element={<AdoptForm />} />
          <Route path="/my-adoptions" element={<MyAdoptionsPage />} />
          <Route path="/edit-adoption/:id" element={<EditMyAdoptionForm />} />
        </Route>

        {/* Dashboard routes without Navbar and Footer */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashbaord />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
