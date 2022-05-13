import { TicketDatabase } from "../data/TicketDatabase";
import { Ticket, TicketInputDTO } from "../model/Ticket";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class TicketBusiness {
  async createTicket(ticket: TicketInputDTO, token: string): Promise<void> {
    try {
      const ticketDatabase = new TicketDatabase();
      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();
      const authenticator = new Authenticator();
      const verifyToken = authenticator.getData(token);
      const isAdmin = verifyToken.role;

      let tickets_amount: number = 0;

      let sold_tickets = Ticket.calculateSoldTickets(
        ticket.tickets_total,
        tickets_amount
      );
      //validations
      if (isAdmin === UserRole.NORMAL) {
        throw new Error("Only admin users are able to create tickets");
      }
      if (
        !ticket.name ||
        !ticket.price ||
        !ticket.show_id ||
        !ticket.tickets_total
      ) {
        throw new Error("Invalid fields");
      }
      if (!verifyToken) {
        throw new Error("Invalid token");
      }

      //creating band
      await ticketDatabase.createTicket(
        id,
        ticket.name,
        ticket.price,
        tickets_amount,
        ticket.tickets_total,
        sold_tickets,
        ticket.show_id
      );
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
