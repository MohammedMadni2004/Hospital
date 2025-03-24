import { CustomRequest } from "../types";
import { Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all appointments for the logged-in doctor
async function getDoctorAppointments(req: CustomRequest, res: Response) {
  try {
    // Check if user is authenticated and is a doctor
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "DOCTOR") {
      return res
        .status(403)
        .json({
          message: "Access denied. Only doctors can access this resource.",
        });
    }

    // Find the doctor profile associated with the user
    const doctor = await prisma.doctor.findFirst({
      where: {
        email: req.user.email,
      },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    // Get all appointments for this doctor
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctor.id,
      },
      include: {
        patient: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Update appointment status (accept/reject)
async function updateAppointmentStatus(req: CustomRequest, res: Response) {
  try {
    // Check if user is authenticated and is a doctor
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "DOCTOR") {
      return res
        .status(403)
        .json({
          message: "Access denied. Only doctors can access this resource.",
        });
    }

    const { appointmentId, status } = req.body;

    if (!appointmentId || !status) {
      return res
        .status(400)
        .json({ message: "Appointment ID and status are required" });
    }

    // Valid status values
    const validStatuses = ["CONFIRMED", "CANCELED"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status. Must be CONFIRMED or CANCELED" });
    }

    // Find the doctor profile associated with the user
    const doctor = await prisma.doctor.findFirst({
      where: {
        email: req.user.email,
      },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    // Check if the appointment belongs to the doctor
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.doctorId !== doctor.id) {
      return res
        .status(403)
        .json({ message: "You can only update your own appointments" });
    }

    // Update the appointment status
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status,
      },
    });

    res.status(200).json({
      message: `Appointment ${
        status === "CONFIRMED" ? "confirmed" : "canceled"
      } successfully`,
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { getDoctorAppointments, updateAppointmentStatus };
