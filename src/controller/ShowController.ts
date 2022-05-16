import {Response, Request} from 'express'
import { ShowBusiness } from '../business/ShowBussiness'
import {ConcertDTO} from "../model/Concert" 

export class ShowsController {
    async addNewShow(
        req:Request,
        res:Response
    ) {
        try {
            const concert:ConcertDTO = {
                week_day: req.body.week_day,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                band_id: req.body.band_id
            }
            const showBusiness = new ShowBusiness()
            const result = await showBusiness.addNewShow(concert)

            res.status(201).send(result)
        } catch (error) {
            throw new Error(error.message);
        }
    }
}