const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
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



  socket.emit('newMessage', generateMessage('Admin', 'Welcom to the chatApp'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined '))

  socket.on('createMessage', (message, callback) => {
    console.log('create message:', message);
    // io.emit() emits an event to every single connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback()

    // is gonna send a message to everybody instead of this socket
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log("User Disconnected");
  })
})

server.listen(port, () => {
  console.log(`Chat app is running on PORT ${port}`);
});
