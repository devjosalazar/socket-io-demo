const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Escuchar eventos del cliente
    socket.on('clientMessage', (data) => {
        console.log('Mensaje del cliente:', data);

        // Enviar un mensaje de vuelta al cliente
        io.emit('message', 'Hola desde el servidor!');
    });

    // Manejar la desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = 8081;
server.listen(PORT, () => {
    console.log(`Servidor Socket.IO en funcionamiento en http://localhost:${PORT}`);
});
