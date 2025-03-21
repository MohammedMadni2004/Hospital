import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import appointmentRoutes from "./routes/appointmentRoutes";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

// Use Routes
app.use("/appointments", appointmentRoutes);

export default app;
