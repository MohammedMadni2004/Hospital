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

  // Seed Hospitals with more detailed information
  const hospital1 = await prisma.hospital.create({
    data: {
      name: "City General Hospital",
      address: "123 Main St, Downtown, Bangalore",
      bed_availability: 50,
      rating: 4.7,
      image_url:
        "https://images.unsplash.com/photo-1587351021759-3e566b3db4f1?auto=format&fit=crop&w=1350&q=80",
      location_distance: 2.5,
      price_general: 2500,
      price_icu: 8500,
      price_emergency: 5000,
      price_pediatric: 3500,
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Apollo Medical Center",
      address: "456 Park Avenue, Koramangala, Bangalore",
      bed_availability: 42,
      rating: 4.9,
      image_url:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1350&q=80",
      location_distance: 4.8,
      price_general: 3500,
      price_icu: 12000,
      price_emergency: 7500,
      price_pediatric: 4500,
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Fortis Healthcare",
      address: "789 Lake View Rd, Whitefield, Bangalore",
      bed_availability: 35,
      rating: 4.6,
      image_url:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1350&q=80",
      location_distance: 8.2,
      price_general: 3000,
      price_icu: 10000,
      price_emergency: 6000,
      price_pediatric: 4000,
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Manipal Hospital",
      address: "101 Health Blvd, Indiranagar, Bangalore",
      bed_availability: 28,
      rating: 4.8,
      image_url:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1350&q=80",
      location_distance: 5.5,
      price_general: 4000,
      price_icu: 15000,
      price_emergency: 8000,
      price_pediatric: 5000,
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
