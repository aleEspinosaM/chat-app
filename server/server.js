const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')
// to not use server/../public
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
// to get back socket web server
var io = socketIO(server);
var users = new Users()


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user is connected');




  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required')
    }

    socket.join(params.room)
    // socket.leave()
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)

    io.to(params.room).emit('updateUserList', users.getUserList(params.room))
    socket.emit('newMessage', generateMessage('chatBot', 'Welcome to the chatApp'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('chatBot', `Welcom ${params.name} to ${params.room} chatRoom have fun ;).`))

    callback()
  })
  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id)
    // io.emit() emits an event to every single connection
    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback()

    // is gonna send a message to everybody instead of this socket
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id)
    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id)
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('chatBot', `${user.name} left the Room`));
    }
  })
})

server.listen(port, () => {
  console.log(`Chat app is running on PORT ${port}`);
});
