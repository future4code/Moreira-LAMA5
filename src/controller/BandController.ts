import {Request, Response} from "express"
import { BandBusiness } from "../business/BandBussiness"

export class BandController {
    async infoBand(
        req:Request,
        res:Response
    ) {
        try {
            const id:string = req.body.id
            const name:string = req.body.name
            
            const bandBusiness = new BandBusiness()
            const dataBand = await bandBusiness.infoBand(id, name) 

            res.status(200).send(dataBand)
        } catch (error) {
            res.status(400).send({error:error.message})
        }
    }
}