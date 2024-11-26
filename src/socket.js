


import { io } from "socket.io-client";


const socket = io('http://localhost:3009')

export const initSocket = () => {
    socket.on('connect', () => {
        console.log('Connected to server with id: ' + socket.id);
    });

}



export default socket