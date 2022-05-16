import { Request, Response } from "express";
import { TicketBusiness } from "../business/TicketBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { TicketInputDTO } from "../model/Ticket";

export class TicketController {
  async createTicket(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      const input: TicketInputDTO = {
        name: req.body.name,
        price: req.body.price,
        tickets_total: req.body.tickets_total,
        show_id: req.body.show_id,
      };

      const ticketBusiness = new TicketBusiness();
      await ticketBusiness.createTicket(input, token);

      res.status(200).send("Ticket created!");
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
