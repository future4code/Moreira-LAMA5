import express from "express";
import { BandController } from "../controller/BandController";
import { TicketController } from "../controller/TicketController";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

const bandController = new BandController();

const ticketController = new TicketController();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/band", bandController.createBand);
userRouter.post("/ticket", ticketController.createTicket);
