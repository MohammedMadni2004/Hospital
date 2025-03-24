import { CustomRequest } from "../types";
import { Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all hospitals with bed availability and detailed information
async function getHospitals(req: CustomRequest, res: Response) {
  try {
    const hospitals = await prisma.hospital.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        bed_availability: true,
        rating: true,
        image_url: true,
        location_distance: true,
        price_general: true,
        price_icu: true,
        price_emergency: true,
        price_pediatric: true,
      },
    });

    // Format the response for frontend consumption
    const formattedHospitals = hospitals.map((hospital) => ({
      id: hospital.id,
      name: hospital.name,
      address: hospital.address,
      bed_availability: hospital.bed_availability,
      distance: hospital.location_distance
        ? `${hospital.location_distance} km`
        : "N/A",
      rating: hospital.rating || 4.5,
      image:
        hospital.image_url ||
        "https://images.unsplash.com/photo-1587351021759-3e566b3db4f1?auto=format&fit=crop&w=1350&q=80",
      price_per_day: hospital.price_general || 2500,
      price: {
        general: hospital.price_general || 2500,
        icu: hospital.price_icu || 8500,
        emergency: hospital.price_emergency || 5000,
        pediatric: hospital.price_pediatric || 3500,
      },
      beds: {
        general: {
          available: Math.floor(hospital.bed_availability / 4),
          total: Math.floor(hospital.bed_availability / 4) + 10,
        },
        icu: {
          available: Math.floor(hospital.bed_availability / 4),
          total: Math.floor(hospital.bed_availability / 4) + 5,
        },
        emergency: {
          available: Math.floor(hospital.bed_availability / 4),
          total: Math.floor(hospital.bed_availability / 4) + 3,
        },
        pediatric: {
          available: Math.floor(hospital.bed_availability / 4),
          total: Math.floor(hospital.bed_availability / 4) + 7,
        },
      },
    }));

    res.status(200).json(formattedHospitals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Book a hospital bed
async function bookBed(req: CustomRequest, res: Response) {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { hospitalId, bedType, admissionDate, reason, notes } = req.body;

    if (!hospitalId || !bedType || !admissionDate || !reason) {
      return res.status(400).json({
        message:
          "Hospital ID, bed type, admission date, and reason are required",
      });
    }

    // Find the hospital to check if it exists
    const hospital = await prisma.hospital.findUnique({
      where: { id: hospitalId },
    });

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Check if bed is available
    if (hospital.bed_availability <= 0) {
      return res
        .status(400)
        .json({ message: "No beds available at this hospital" });
    }

    // Create bed booking
    const booking = await prisma.$transaction(async (tx) => {
      // Decrease available beds
      await tx.hospital.update({
        where: { id: hospitalId },
        data: { bed_availability: { decrement: 1 } },
      });

      // Create the booking
      return tx.bedBooking.create({
        data: {
          userId: req.user.id,
          hospitalId,
          bedType,
          admissionDate: new Date(admissionDate),
          reason,
          notes: notes || "",
          status: "PENDING",
        },
      });
    });

    res.status(201).json({
      message: "Bed booked successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get user's bed bookings
async function getUserBookings(req: CustomRequest, res: Response) {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bookings = await prisma.bedBooking.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        hospital: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Cancel a bed booking
async function cancelBooking(req: CustomRequest, res: Response) {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID is required" });
    }

    // Check if booking exists and belongs to user
    const booking = await prisma.bedBooking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only cancel your own bookings" });
    }

    // Cancel booking and increase available beds
    const updatedBooking = await prisma.$transaction(async (tx) => {
      // Increase available beds
      await tx.hospital.update({
        where: { id: booking.hospitalId },
        data: { bed_availability: { increment: 1 } },
      });

      // Update booking status
      return tx.bedBooking.update({
        where: { id: bookingId },
        data: { status: "CANCELED" },
      });
    });

    res.status(200).json({
      message: "Booking canceled successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get all bed types with descriptions
async function getBedTypes(req: CustomRequest, res: Response) {
  try {
    // Since bed types are configuration data that rarely changes,
    // we can define them here instead of storing in the database
    const bedTypes = [
      {
        id: "general",
        name: "General Ward",
        description: "Shared room with basic amenities and nursing care",
        icon: "Bed", // Frontend will map these to actual icon components
      },
      {
        id: "icu",
        name: "ICU",
        description:
          "Intensive care unit with 24/7 monitoring and specialized equipment",
        icon: "AlertCircle",
      },
      {
        id: "emergency",
        name: "Emergency",
        description: "Immediate care for critical conditions",
        icon: "Phone",
      },
      {
        id: "pediatric",
        name: "Pediatric",
        description: "Specialized care for children and infants",
        icon: "Star",
      },
    ];

    res.status(200).json(bedTypes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { getHospitals, bookBed, getUserBookings, cancelBooking, getBedTypes };
