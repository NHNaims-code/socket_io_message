const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
  });



http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});