const express = require('express');
const http = require('http'); 
const socketIo = require('socket.io');
const mongoose = require('./dbConnection');
const cardRoutes = require('./Routes/cardRoutes');

const app = express();
const server = http.createServer(app); 
const io = socketIo(server);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', cardRoutes);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit a random number to connected clients every second
  setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100);
    socket.emit('number', { number: randomNumber });
  }, 1000);

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
