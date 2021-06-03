const express = require('express');
const moment = require('moment');
const app = express();
const http = require('http');
const server = http.Server(app);
var io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

users = [];
io.on('connection', socket => {
  console.log('New user connected')
  let socketName;

  socket.on('setUsername', username => {
    if (users.includes(username)) {
      return socket.emit('userExists', `Username ${username} is already taken!`);
    }

    socketName = username;
    users.push(username);
    socket.emit('userSet', username);
    io.emit('message', { text: `Welcome, ${socketName}!`, author: 'Server', createdAt: moment() });
    console.log('Username set:', socketName);
  })

  socket.on('disconnect', () => {
    users = users.filter(user => user !== socketName);
    console.log(`User ${socketName} disconnected`)
  })

  socket.on('message', ({ text, author }) => {
    io.emit('message', { text, author, createdAt: moment() });
  })
})

server.listen(3012, () => {
  console.log('listening on *:3012');
});