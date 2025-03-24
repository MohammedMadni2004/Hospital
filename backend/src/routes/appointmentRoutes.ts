import express from "express";

const appointMentRouter = express.Router();

appointMentRouter.post("/create", creatAppointment)