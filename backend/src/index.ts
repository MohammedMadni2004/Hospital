import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute";
import { BodyParser } from "body-parser";
import { Request, Response } from "express";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "35mb" }));
app.use("/api/user", userRoutes);


const PORT = process.env.PORT || 5000;
app.get('/',(req:Request,res:Response)=>{
  res.send('Hello World')
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
