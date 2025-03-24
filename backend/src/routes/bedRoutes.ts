import express from "express";
import {
  getHospitals,
  bookBed,
  getUserBookings,
  cancelBooking,
  getBedTypes,
} from "../controllers/bedBookingController";
import { isAuthenticatedUser } from "../middleware/authMiddleware";

const bedRouter = express.Router();

// Apply auth middleware to protected routes
bedRouter.get("/hospitals", getHospitals);
bedRouter.post("/book", isAuthenticatedUser, bookBed);
bedRouter.get("/bookings", isAuthenticatedUser, getUserBookings);
bedRouter.put("/cancel/:bookingId", isAuthenticatedUser, cancelBooking);

// New route for bed types
bedRouter.get("/types", getBedTypes);

export default bedRouter;
