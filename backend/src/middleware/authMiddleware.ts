import { Request, Response, NextFunction } from "express";
import jwt,{ JwtPayload, JsonWebTokenError} from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../types";

const prisma = new PrismaClient();  
export async function isAuthenticatedUser(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: 'no beareer token' });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: 'token not found' });
      return;
    }

    const decoded_data = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as JwtPayload

    if (!decoded_data.userId) {
      res.status(404).json({
        message: 'user not found',
      });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decoded_data.userId,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'user not found' });
      return;
    }
    

    req.user = user;
    next();
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      res.status(404).json({
        message: 'SERVER_ERROR',
      });
    } else {
      console.log(e);
    }
  }
}
