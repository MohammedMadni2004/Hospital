import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // Changed from bcryptjs to match your dependencies

const prisma = new PrismaClient();

async function main() {
  // Hash passwords for users
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Seed Users (Patients)
  const user1 = await prisma.user.create({
    data: {
      email: "jotestlife@example.com",
      password: hashedPassword,
      role: "PATIENT",
      Blood: "O_POS",
      Height: "175cm",
      Weight: "70kg",
      Heart: "72 bpm",
      Oxygen: "98%",
      Temperature: "98.6F",
      name: "John Doe",

      // Add patient profile information with relation
      
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "janesmithslifezer@example.com",
      password: hashedPassword,
      role: "PATIENT",
      Blood: "A_POS",
      Height: "160cm",
      Weight: "55kg",
      Heart: "75 bpm",
      Oxygen: "97%",
      Temperature: "98.4F",
        name: "Jane Smith",
    },
  });

  // Seed Hospitals
  const hospital1 = await prisma.hospital.create({
    data: {
      name: "City Hospital",
      address: "123 Main St, NY",
      bed_availability: 10,
    },
  });

  // Seed Doctors with proper relations
  const doctor1 = await prisma.doctor.create({
    data: {
      name: "Dr. Alice Brown",
      specialty: "Cardiology",
      email: "sheebabrown@example.com",
      phone: "123-456-7890",
      hospital: {
        connect: { id: hospital1.id },
      },
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: "Dr. Bob Wilson",
      specialty: "Neurology",
      email: "wilson@example.com",
      phone: "987-654-3210",
      hospital: {
        connect: { id: hospital1.id },
      },
    },
  });

  // Seed Appointments with proper relations
  await prisma.appointment.create({
    data: {
      patient: { connect: { id: user1.id } }, // Correct relation
      doctor: { connect: { id: doctor1.id } },
      date: new Date("2025-04-10T10:00:00.000Z"),
      status: "PENDING",
    },
  });
  
  await prisma.appointment.create({
    data: {
      patient: { connect: { id: user2.id } },
      doctor: { connect: { id: doctor2.id } },
      date: new Date("2025-04-11T14:30:00.000Z"),
      status: "CONFIRMED",
    },
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
