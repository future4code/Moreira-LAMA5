import express from "express";
import { BandController } from "../controller/BandController";


export const bandRouter = express.Router()

const bandController = new BandController();

bandRouter.get("/info", bandController.infoBand)


/*
import express from "express";
import { ShowsController } from "../controller/ShowController";

export const concertRouter = express.Router();
const showController = new ShowsController()

concertRouter.post("/add/concert", showController.addNewShow)
*/