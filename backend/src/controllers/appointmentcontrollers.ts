import { CustomRequest } from "../types";
import { Response } from "express";

async function creatAppointment(req:CustomRequest,res:Response){
    try {
        const { patientId, doctorId, date, time } = req.body;
        // Create appointment
        // const appointment = await Appointment.create({
        //     patientId,
        //     doctorId,
        //     date,
        //     time,
        // });
        // res.status(201).json(appointment);
        res.status(201).json({ message: "Appointment created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}