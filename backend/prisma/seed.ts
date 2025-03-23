import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // Hash passwords for users
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Seed Users (Patients)
    const user1 = await prisma.user.create({
        data: {
            email: "johndoe@example.com",
            password: hashedPassword,
            role: "PATIENT",
            Blood: "O_POS",
            Height: "175cm",
            Weight: "70kg",
            Heart: "72 bpm",
            Oxygen: "98%",
            Temperature: "98.6F"
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: "janesmith@example.com",
            password: hashedPassword,
            role: "PATIENT",
            Blood: "A_POS",
            Height: "160cm",
            Weight: "55kg",
            Heart: "75 bpm",
            Oxygen: "97%",
            Temperature: "98.4F"
        },
    });

    // Seed Hospitals
    const hospital1 = await prisma.hospital.create({
        data: {
            name: "City Hospital",
            address: "123 Main St, NY",
            contact: 1234567890,
            bed_availability: 10,
        },
    });

    // Seed Doctors
    const doctor1 = await prisma.doctor.create({
        data: {
            name: "Dr. Alice Brown",
            specialty: "Cardiology",
            email: "alicebrown@example.com",
            phone: "123-456-7890",
            hospitalId: hospital1.id,
        },
    });

    const doctor2 = await prisma.doctor.create({
        data: {
            name: "Dr. Bob Wilson",
            specialty: "Neurology",
            email: "bobwilson@example.com",
            phone: "987-654-3210",
            hospitalId: hospital1.id,
        },
    });

    // Seed Patients
    const patient1 = await prisma.patient.create({
        data: {
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "123-456-7890",
        },
    });

    const patient2 = await prisma.patient.create({
        data: {
            name: "Jane Smith",
            email: "janesmith@example.com",
            phone: "987-654-3210",
        },
    });

    // Seed Appointments
    await prisma.appointment.createMany({
        data: [
            {
                patientId: patient1.id,
                doctorId: doctor1.id,
                date: new Date("2025-04-10T10:00:00.000Z"),
                status: "PENDING",
            },
            {
                patientId: patient2.id,
                doctorId: doctor2.id,
                date: new Date("2025-04-11T14:30:00.000Z"),
                status: "CONFIRMED",
            },
        ],
    });

    // Seed Medical Histories
    await prisma.medicalHistory.createMany({
        data: [
            {
                userId: user1.id,
                pastDiagnoses: "Hypertension",
                medications: "Atenolol",
                allergies: "None",
                surgeries: "Appendectomy",
                chronicDiseases: "Diabetes",
            },
            {
                userId: user2.id,
                pastDiagnoses: "Asthma",
                medications: "Inhaler",
                allergies: "Peanuts",
                surgeries: "None",
                chronicDiseases: "None",
            },
        ],
    });

    console.log("Dummy data seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });