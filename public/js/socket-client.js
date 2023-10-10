
//referencias
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const textMensaje = document.querySelector("#text-mensaje");
const btnEnviar = document.querySelector("#btn-enviar");


const socket = io(); 

socket.on("connect", () => {

    lblOffline.style.display = 'none';
    lblOnline.style.display  = '';
    
})

socket.on("disconnect", () => {

    lblOffline.style.display  = '';
    lblOnline.style.display   = 'none';
})

socket.on("enviar-mensaje", (payload) => {
    console.log(payload);
})



btnEnviar.addEventListener("click", () => {
    const mensaje = textMensaje.value;

    const payload = {
        mensaje,
        id:'123456',
        //fecha: new Date().getTime()   
    }
    
    //se le puede pasar un segundo argumento por ejemplo - id
    socket.emit( 'enviar-mensaje', payload, (id) =>{
        console.log("Desde el server", id);
    })
})