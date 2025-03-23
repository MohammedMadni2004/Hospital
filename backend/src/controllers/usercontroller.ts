import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createToken } from "../utils/createToken";
import { CustomRequest } from "../types";

const prisma = new PrismaClient();


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
        Blood: bloodType,
        Height: height,
        Weight: weight,
        Heart:heartRate,
        Oxygen: oxygenLevel,
        Temperature: temperature,
        name,
      },
    });

    res.status(201).json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function login(req:Request, res: Response){
  try{
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });  
    if(!user) return res.status(400).json({ error: "User not found!" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid Password!" });
    const token= await createToken(user.id);
    res.status(200).json({ message: "User logged in successfully", user:user, token:token });


  }catch(error){
    console.log(error);
    res.status(500).json({ error: "Something went wrong "});
  }

}

async function getProfile(req:CustomRequest, res:Response){
  try{
    const user = await prisma.user.findUnique({ 
      where: { 
        id: req.user?.id 
      },
      include: {
        medicalHistory: true,
      } 
     });
    res.status(200).json(user);
  }catch(error){
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
  
}
export { register, login, getProfile };
