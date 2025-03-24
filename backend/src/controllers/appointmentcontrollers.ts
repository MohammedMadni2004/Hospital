import { CustomRequest } from "../types";
import { Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function creatAppointment(req: CustomRequest, res: Response) {
  try {
    const { doctorId, date, timeSlot } = req.body;

    // Verify the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Parse the appointment date and time
    const appointmentDate = new Date(date);
    const [hours, minutes] = timeSlot
      .replace(" AM", "")
      .replace(" PM", "")
      .split(":")
      .map(Number);

    // Adjust hours for PM time
    const isPM = timeSlot.includes("PM") && hours !== 12;
    const startHour = isPM ? hours + 12 : hours;

    // Create start time and end time (appointments are 30 mins)
    const startTime = new Date(appointmentDate);
    startTime.setHours(startHour, minutes, 0, 0);

    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);

    // Check if doctor has availability for this time slot
    const availability = await prisma.appointmentAvailability.findFirst({
      where: {
        doctorId,
        date: {
          equals: appointmentDate,
        },
        startTime: {
          lte: startTime,
        },
        endTime: {
          gte: endTime,
        },
        isBooked: false,
      },
    });

    if (!availability) {
      return res.status(400).json({
        message: "Doctor is not available at the selected time",
      });
    }

    // Get patient info
    const patient = await prisma.patient.findFirst({
      where: {
        id: req.user.id,
      },
    });

    // If patient record doesn't exist, create one
    let patientId = req.user.id;
    if (!patient) {
      const newPatient = await prisma.patient.create({
        data: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          phone: req.body.phone || "Not provided",
        },
      });
      patientId = newPatient.id;
    }

    // Create the appointment in a transaction along with updating availability
    const appointment = await prisma.$transaction(async (tx) => {
      // Mark the availability as booked
      await tx.appointmentAvailability.update({
        where: { id: availability.id },
        data: { isBooked: true },
      });

      // Create the appointment
      return tx.appointment.create({
        data: {
          patientId,
          doctorId,
          date: startTime,
          status: "PENDING",
        },
      });
    });

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Add a function to get doctor availability
async function getDoctorAvailability(req: CustomRequest, res: Response) {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res
        .status(400)
        .json({ message: "Doctor ID and date are required" });
    }

    const selectedDate = new Date(date as string);

    const availabilities = await prisma.appointmentAvailability.findMany({
      where: {
        doctorId: doctorId as string,
        date: selectedDate,
        isBooked: false,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    // Format time slots for frontend
    const availableSlots = availabilities.map((slot) => {
      const startHour = slot.startTime.getHours();
      const startMinutes = slot.startTime.getMinutes();
      const isPM = startHour >= 12;
      const hour =
        startHour > 12 ? startHour - 12 : startHour === 0 ? 12 : startHour;
      const timeString = `${hour.toString().padStart(2, "0")}:${startMinutes
        .toString()
        .padStart(2, "0")} ${isPM ? "PM" : "AM"}`;

      return {
        id: slot.id,
        time: timeString,
        startTime: slot.startTime,
        endTime: slot.endTime,
      };
    });

    res.status(200).json(availableSlots);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Add function to get all doctors
async function getAllDoctors(req: Request, res: Response) {
  try {
    const doctors = await prisma.doctor.findMany({
      select: {
        id: true,
        name: true,
        specialty: true,
        email: true,
        phone: true,
        hospital: {
          select: {
            name: true,
            address: true,
          },
        },
      },
    });

    // Format the response for the frontend
    const formattedDoctors = doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty,
      email: doctor.email,
      phone: doctor.phone,
      hospital: doctor.hospital.name,
      // Using a placeholder avatar - in a real app you might store this in the database
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        doctor.name
      )}&background=random`,
    }));

    res.status(200).json(formattedDoctors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { creatAppointment, getDoctorAvailability, getAllDoctors };
