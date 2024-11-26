


import { io } from "socket.io-client";


const socket = io("https://taskmanager-server-production.up.railway.app")

export const initSocket = () => {
    socket.on('connect', () => {
        console.log('Connected to server with id: ' + socket.id);
    });

}



export default socket