export class Ticket {
  constructor(
    private id: string,
    private name: string,
    private price: number,
    private tickets_amount: number,
    private tickets_total: number,
    private sold_tickets: number,
    private show_id: string
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getTicketsAmount() {
    return this.tickets_amount;
  }

  getTicketsTotal() {
    return this.tickets_total;
  }
  getSoldTickets() {
    return this.sold_tickets;
  }
  getShowId() {
    return this.show_id;
  }

  setId(id: string) {
    this.id = id;
  }

  setName(name: string) {
    this.name = name;
  }

  setPrice(price: number) {
    this.price = price;
  }

  setTicketsAmount(tickets_amount: number) {
    this.tickets_amount = tickets_amount;
  }

  setTicketsTotal(tickets_total: number) {
    this.tickets_total = tickets_total;
  }
  setSoldTickets(sold_tickets: number) {
    this.sold_tickets = sold_tickets;
  }
  setShowId(show_id: string) {
    this.show_id = show_id;
  }
  static calculateSoldTickets(
    total_tickets: number,
    amount_tickets: number
  ): number {
    const total = total_tickets - (total_tickets - amount_tickets);
    return total;
  }
}

export interface TicketInputDTO {
  name: string;
  price: number;
  tickets_total: number;
  show_id: string;
}
