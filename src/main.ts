import { connectToServer } from "./socket-client";
import "./style.css";

// El jwt se va a usar para verificar el usuario
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2>Websocket - Client </h2>
    <input id="jwt-token" placeholder="Json web token" />
    <button id="btn-connect">Conect</button>
    <br/>
    <span id="server-status">offline</span>

    <ul id="client-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input"/>
    </form>

    <h3>Messages</h3>
    <ul id="message-ul"></ul>
  </div>
`;

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// con esta conexion, se puede ver en el servidor, los mensajes de conexion y desconexion en la consola
// connectToServer(); // Aca se conecta directamente al abrir el sitio.

const btnConnect = document.querySelector<HTMLButtonElement>("#btn-connect");
const jwtToken = document.querySelector<HTMLInputElement>("#jwt-token");

btnConnect?.addEventListener("click", () => {
  if (!jwtToken || jwtToken.value.trim().length <= 0) return alert("Enter a valid JWT"); // valida que haya un token

  connectToServer(jwtToken.value.trim()); // envia el token al servidor
});
