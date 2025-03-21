import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/** 
 *  📌 Route 1: Patients send an appointment request
 *  METHOD: POST /appointments/request
 */
router.post("/request", async (req: Request, res: Response) => {
    try {
        const { patientName, patientEmail, doctorId, date, time } = req.body;

        // Validate input
        if (!patientName || !patientEmail || !doctorId || !date || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if doctor exists
        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId }
        });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Create an appointment request
        const appointment = await prisma.appointment.create({
            data: { patientName, patientEmail, doctorId, date: new Date(date), time }
        });

        res.status(201).json({ message: "Appointment request sent", appointment });
    } catch (error) {
        res.status(500).json({ message: "Error sending request", error: error message });
    }
});

/** 
 *  📌 Route 2: Doctors approve/reject an appointment
 *  METHOD: PUT /appointments/:id/status
 */
router.put("/:id/status", async (req: Request, res: Response) => {
    try {
        const { status } = req.body;

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const appointment = await prisma.appointment.update({
            where: { id: req.params.id },
            data: { status }
        });

        res.json({ message: `Appointment ${status}`, appointment });
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
});

/** 
 *  📌 Route 3: Doctors view their pending appointments
 *  METHOD: GET /appointments/doctor/:doctorId
 */
router.get("/doctor/:doctorId", async (req: Request, res: Response) => {
    try {
        const appointments = await prisma.appointment.findMany({
            where: { doctorId: req.params.doctorId, status: "pending" }
        });

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error: error.message });
    }
});

export default router;
