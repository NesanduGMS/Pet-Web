import express from "express";
import mongoose from "mongoose";
import userRoutes from "./modules/user/route.js";
import petRoutes from "./modules/pet/route.js";
import emailRoutes from "./modules/emails/routes.js";
import adoptionRoutes from "./modules/adoption/route.js";
import path from "path";
import cors from "cors";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use("/public", express.static(path.join(process.cwd(), "public")));
// Connect to MongoDB
mongoose
  .connect(
"mongodb+srv://sally07152002:sally715202@cluster0.rnnza.mongodb.net/Petopia?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Use user routes
app.use("/api", userRoutes);
app.use("/api", petRoutes);
app.use("/api", adoptionRoutes);
app.use("/api/email", emailRoutes);
// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
