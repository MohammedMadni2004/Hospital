import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { login, register } from "../controllers/usercontroller";


const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);

export default userRoutes;

