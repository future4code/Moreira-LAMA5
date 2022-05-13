import { Ticket } from "../model/Ticket";
import { BaseDatabase } from "./BaseDatabase";

export class TicketDatabase extends BaseDatabase {
  private static TABLE_NAME = "TICKETS";

  public async createTicket(
    id: string,
    name: string,
    price: number,
    tickets_amount: number,
    tickets_total: number,
    sold_tickets: number,
    show_id: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: id,
          name: name,
          price: price,
          tickets_amount: tickets_amount,
          tickets_total: tickets_total,
          sold_tickets: sold_tickets,
          show_id: show_id,
        })
        .into(TicketDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getTicketById(id: string): Promise<Ticket> | undefined {
    try {
      const result = await this.getConnection()
        .select("id")
        .from(TicketDatabase.TABLE_NAME)
        .where({ id });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
