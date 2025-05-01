import axios from "axios";

const API_URL = "http://localhost:5001/api/adoptions";

// Create new adoption
const createAdoption = async (adoptionData) => {
  const response = await axios.post(API_URL, adoptionData);
  return response.data;
};

// Get all adoptions
const getAdoptions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single adoption
const getAdoptionById = async (adoptionId) => {
  const response = await axios.get(`${API_URL}/${adoptionId}`);
  return response.data;
};

// Update adoption
const updateAdoption = async (adoptionId, adoptionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/${adoptionId}`,
    adoptionData,
    config
  );
  return response.data;
};

// Delete adoption
const deleteAdoption = async (adoptionId) => {
  const response = await axios.delete(`${API_URL}/${adoptionId}`);
  return response.data;
};

// Get adoptions by user
const getAdoptionsByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

// Get adoptions by pet
const getAdoptionsByPet = async (petId) => {
  const response = await axios.get(`${API_URL}/pet/${petId}`);
  return response.data;
};

const adoptionService = {
  createAdoption,
  getAdoptions,
  getAdoptionById,
  updateAdoption,
  deleteAdoption,
  getAdoptionsByUser,
  getAdoptionsByPet,
};

export default adoptionService;
