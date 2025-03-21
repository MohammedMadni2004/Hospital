import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/auth";


dotenv.config();

const app = express();

app.use(cors()); 
app.use(bodyParser.json()); 

app.use("/api/auth",router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
