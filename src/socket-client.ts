// Para poder conectarme a la url (http://localhost:3000/socket.io/socket.io.js) es necesario instalar
import { Manager, Socket } from "socket.io-client"

let socket: Socket;
// el socket.io-client (verificar que la version de la url coincida con la instalada)
export const connectToServer = (token: string) => {
  // 
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
    extraHeaders: {
      hola: 'mundo',
      authentication: token,
    },
  }) // uri donde se puede encontrar un socket server (correspondiente a teslo-shop)

  socket?.removeListener(); // limpia los listeners cada vez que se conecta si existe el socket.
  // conexion con el namespace "root(/)" de la aplicacion
  // La conexion mediante un socket es cliente-servidor. no se puede hablar directamente con otro cliente
  socket = manager.socket('/')
  

  addListeners();
}

// Elimino el socket como argumento porque al reconectarse, hace referencia al socket viejo, y ahora el socket esta de forma global
const addListeners = () => {
  // constantes relacionadas al html.
  const serverStatusLabel = document.querySelector<HTMLLabelElement>('#server-status')!;
  const clientUl = document.querySelector<HTMLUListElement>('#client-ul')!;
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
  const messageUl = document.querySelector<HTMLUListElement>('#message-ul')!;

  // TODO: #client-ul
  // socket.on se usa para escuchar el servidor y socket.emit se usa para hablar con el mismo
  socket.on('connect',() => {
    serverStatusLabel.innerHTML = 'connected'
  })
  socket.on('disconnect',() => {
    serverStatusLabel.innerHTML = 'disconnected'
  })

  // este evento ('clients-updated') se genera en la aplicacion del servidor y es escuchada por esta aplicacion.
  socket.on('clients-updated', (clients: string[]) => {
    let clientsHtml = '';
    clients.forEach((clientId: string) => clientsHtml += `<li>${ clientId }</li>`);
    clientUl.innerHTML = clientsHtml;
  })

  // Escucha del HTML
  messageForm.addEventListener('submit', (event: any) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return; // Si no hay nada escrito retorna

    // genera un mensaje por parte de este cliente que se emite como un evento 'message-from-client'
    socket.emit('message-from-client', { id: 'YO:', message: messageInput.value })

    // limpio el campo input para un nuevo mensaje
    messageInput.value = '';
  })

  // Escucha los mnsajes del servidor por medio del evento message-from-server
  socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
    // Agrego un nuevo item aon el fullname y el mensaje a la lista de mensajes
    const newMessage = `
    <li>
      <strong>${payload.fullName}</strong
      <span>${payload.message}</span>
    </li>`;

    const li = document.createElement('li');
    li.innerHTML = newMessage;
    messageUl.append(li);
  })
}

