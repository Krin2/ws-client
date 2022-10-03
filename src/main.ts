import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client </h1>
    // <span>Offline</span>
  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// con esta conexion, se puede ver en el servidor, los mensajes de conexion y desconexion en la consola
connectToServer();