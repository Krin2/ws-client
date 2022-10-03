// Para poder conectarme a la url (http://localhost:3000/socket.io/socket.io.js) es necesario instalar
import { Manager } from "socket.io-client"


// el socket.io-client (verificar que la version de la url coincida con la instalada)
export const connectToServer = () => {
  // 
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js') // uri donde se puede encontrar un socket server (correspondiente a teslo-shop)

  // conexion con el namespace "root(/)" de la aplicacion
  // La conexion mediante un socket es cliente-servidor. no se puede hablar directamente con otro cliente
  const socket = manager.socket('/')
  console.log(socket);
}
