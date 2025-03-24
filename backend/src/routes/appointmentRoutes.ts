import express from "express";
import {
  creatAppointment,
  getDoctorAvailability,
  getAllDoctors,
} from "../controllers/appointmentcontrollers";
import { isAuthenticatedUser } from "../middleware/authMiddleware";

const appointmentRouter = express.Router();

// Apply auth middleware to protected routes
appointmentRouter.post("/create", isAuthenticatedUser, creatAppointment);
appointmentRouter.get("/availability", getDoctorAvailability);
appointmentRouter.get("/doctors", getAllDoctors);

export default appointmentRouter;
