import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client </h1>
    // <span id="server-status">offline</span>

    <ul id="client-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input"/>
    </form>

    <h3>Messages</h3>
    <ul id="message-ul"></ul>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// con esta conexion, se puede ver en el servidor, los mensajes de conexion y desconexion en la consola
connectToServer();
