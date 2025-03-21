import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute";


dotenv.config();

const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 

app.use("/api/user",userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
