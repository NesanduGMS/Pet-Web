import * as adoptionService from "./service.js";

export const createAdoption = async (req, res) => {
  try {
    const adoption = await adoptionService.createAdoption(req.body);
    res.status(201).json({
      success: true,
      data: adoption,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await adoptionService.getAllAdoptions();
    res.status(200).json(adoptions);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdoptionById = async (req, res) => {
  try {
    const adoption = await adoptionService.getAdoptionById(req.params.id);
    if (!adoption) {
      return res.status(404).json({
        success: false,
        message: "Adoption application not found",
      });
    }
    res.status(200).json(adoption);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAdoption = async (req, res) => {
  try {
    const adoption = await adoptionService.updateAdoption(
      req.params.id,
      req.body
    );
    if (!adoption) {
      return res.status(404).json({
        success: false,
        message: "Adoption application not found",
      });
    }
    res.status(200).json(adoption);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAdoption = async (req, res) => {
  try {
    const adoption = await adoptionService.deleteAdoption(req.params.id);
    if (!adoption) {
      return res.status(404).json({
        success: false,
        message: "Adoption application not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
