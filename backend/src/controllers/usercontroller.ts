import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET!;


async function register   (req:Request, res:Response)  {
  try {
    const { email, password, name, bloodType, height, weight, heartRate, oxygenLevel, temperature } = req.body;

    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "User already exists!" });

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        bloodType,
        height: parseFloat(height),
        weight: parseFloat(weight),
        heartRate: parseInt(heartRate),
        oxygenLevel: parseFloat(oxygenLevel),
        temperature: parseFloat(temperature),
      },
    });

    res.status(201).json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

