//referencias HTML

const lblNuevoTicket = document.querySelector("#lblNuevoTicket")
const btncreate = document.querySelector("button")

const socket = io(); 

socket.on("connect", () => {
    btncreate.disabled = false;
})

socket.on("disconnect", () => {
    btncreate.disabled = true;
})

socket.on("ultimo-ticket", (ultimo) => {
    lblNuevoTicket.innerText = `Ticket ${ultimo}`;
})


btncreate.addEventListener("click", () => {
    socket.emit('siguiente-ticket', null, ( ticket ) =>{
        lblNuevoTicket.innerText = ticket;
    })
})