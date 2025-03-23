import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { login, register,getProfile } from "../controllers/usercontroller";


const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get('/getProfile', getProfile);

export default userRoutes;

