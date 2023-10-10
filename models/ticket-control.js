const path = require('path');
const fs = require('fs');

class Ticket {
    constructor( numero, escritorio ){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {
  
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate(); //11
    this.tickets = []; //tickets pendientes
    this.ultimos4 = []; //ultimos 4 tickets

    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4
    };
  }


  init(){
    const {ultimo, hoy, ultimos4, tickets} = require("../db/data.json");

    if(hoy === this.hoy){

        this.tickets = tickets;
        this.ultimo = ultimo;
        this.ultimos4 = ultimos4;

    }else{
        this.guardarDB();
    }
  }

  guardarDB(){
    const dbpath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbpath, JSON.stringify( this.toJson ))
  }

  siguiente() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.guardarDB();
    return `Ticket ${ticket.numero}`;
  }

  atenderTicket(escritorio){

    //no tenemos tickets
    if(this.tickets.length === 0){
        return null;
    }

    const ticket = this.tickets.shift();  //this.tickets[0];
    ticket.escritorio = escritorio;

    this.ultimos4.unshift( ticket );  //agrega ticket al inicio

    if(this.ultimos4.length > 4){
        this.ultimos4.splice(-1, 1); //ultima pocision y corta 1
    }

    this.guardarDB();

    return ticket;
  }
}

module.exports = TicketControl;