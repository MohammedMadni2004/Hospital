import express from "express";
import {
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../controllers/doctorController";
import { isAuthenticatedUser } from "../middleware/authMiddleware";

const doctorRouter = express.Router();

// Apply auth middleware to all routes
doctorRouter.use(isAuthenticatedUser);

// Get all appointments for the logged-in doctor
doctorRouter.get("/appointments", getDoctorAppointments);

// Update appointment status
doctorRouter.put("/appointments/status", updateAppointmentStatus);

export default doctorRouter;
