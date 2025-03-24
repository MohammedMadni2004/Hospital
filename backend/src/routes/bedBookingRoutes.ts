import express from "express";
import {
  getHospitals,
  bookBed,
  getUserBookings,
  cancelBooking,
} from "../controllers/bedBookingController";
import { isAuthenticatedUser } from "../middleware/authMiddleware";

const bedBookingRouter = express.Router();

// Public route to get all hospitals
bedBookingRouter.get("/hospitals", getHospitals);

// Protected routes require authentication
bedBookingRouter.post("/book", isAuthenticatedUser, bookBed);
bedBookingRouter.get("/user-bookings", isAuthenticatedUser, getUserBookings);
bedBookingRouter.put("/cancel/:bookingId", isAuthenticatedUser, cancelBooking);

export default bedBookingRouter;
