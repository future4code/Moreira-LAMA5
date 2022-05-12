import express from "express";
import { BandController } from "../controller/BandController";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

const bandController = new BandController();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/band", bandController.createBand);
