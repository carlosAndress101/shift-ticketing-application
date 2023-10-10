//referencias HTML

const lblEscritorio = document.querySelector("#lblEscritorio")
const btnAtender = document.querySelector("button")
const lblTicket = document.querySelector("small")
const Alert = document.querySelector(".pantallaTikect")
const lblPendientes = document.querySelector("#lblPendientes")


const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location.href = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

Alert.style.display = 'none';


const socket = io(); 

socket.on("connect", () => {
    btnAtender.disabled = false;
})

socket.on("disconnect", () => {
    btnAtender.disabled = true;
})

socket.on('tickets-pendientes', ( pendientes ) => {
    if( pendientes === 0){
        lblPendientes.style.display = 'none'
    }else{
        lblPendientes.style.display = ''
        lblPendientes.innerText = pendientes
    }
})


btnAtender.addEventListener("click", () => {
    socket.emit("atender-ticket", {escritorio}, ( {ok, ticket} ) => {
        if(!ok){
            lblTicket.innerText = 'Nadie'
            return Alert.style.display = '';
        }

        lblTicket.innerText = ` el Ticket ${ticket.numero}`
    })
})