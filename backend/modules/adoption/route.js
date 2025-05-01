import express from "express";
import * as adoptionController from "./controller.js";

const router = express.Router();

router.post("/adoptions", adoptionController.createAdoption);
router.put("/adoptions/:id", adoptionController.updateAdoption);
router.get("/adoptions/:id", adoptionController.getAdoptionById);
router.delete("/adoptions/:id", adoptionController.deleteAdoption);
router.get("/adoptions", adoptionController.getAllAdoptions);

export default router;
