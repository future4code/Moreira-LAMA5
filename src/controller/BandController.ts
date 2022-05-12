import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";
import { BandBusiness } from "../business/BandBusiness";

export class BandController {
  async createBand(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;

      const input: BandInputDTO = {
        name: req.body.name,
        music_genre: req.body.music_genre,
        responsible: req.body.responsible,
      };

      const bandBusiness = new BandBusiness();
      await bandBusiness.createBand(input, token);

      res.status(200).send("Band created!");
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
