const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// to not use server/../public
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
// to get back socket web server
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user is connected');


// socket.emit emits an event to a single connection
  // socket.emit('newMessage', {
  //   from: 'Maria',
  //   text: 'DUUUUUUDE',
  //   creaAt: 123
  // });

  socket.on('createMessage', (message) => {
    console.log('create message:', message);
    // io.emit() emits an event to every single connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', () => {
    console.log("User Disconnected");
  })
})

server.listen(port, () => {
  console.log(`Chat app is running on PORT ${port}`);
});
