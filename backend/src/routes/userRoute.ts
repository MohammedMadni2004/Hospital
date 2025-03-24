import express from "express";
import bcrypt from "bcrypt";
import { login, register,getProfile } from "../controllers/usercontroller";
import { isAuthenticatedUser } from "../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get('/getProfile', isAuthenticatedUser,getProfile);

export default userRoutes;

