const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');



const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');


let app = express();
let server = http.createServer(app);

let io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('New user connect');

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));


    socket.broadcast.emit('newMessage', generateMessage('Admin','New User joined'));


    socket.on('createMessage', (message, callback)=> {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage( message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });
    socket.on('disconnect', ()=> {
        console.log('User was disconnect')
    });
});

app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log(`Started on port ${port}`)
});




console.log(__dirname+'../public');
console.log(publicPath);