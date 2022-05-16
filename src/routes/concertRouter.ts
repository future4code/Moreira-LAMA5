import express from "express";
import { ShowsController } from "../controller/ShowController";

export const concertRouter = express.Router();
const showController = new ShowsController()

concertRouter.post("/add/concert", showController.addNewShow)