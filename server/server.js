const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');



const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');

const { Users } = require('./utils/users');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');


let app = express();
let server = http.createServer(app);

let io = socketIO(server);
let users = new Users();

io.on('connection', (socket)=>{
    console.log('New user connect');

    socket.on('join', (params, callback)=>{
        if (!isRealString( params.name) || !isRealString( params.room )){
            return callback('Name and Rome Name are required.')
        }

        socket.join( params.room );
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room)) ;


        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));



        callback();
    });




    socket.on('createMessage', (message, callback)=> {

        let user = users.getUser(socket.id);

        if(user && isRealString(message.text)){

            io.to(user.room).emit('newMessage', generateMessage( user.name, message.text));

        }

        callback();
    });

    socket.on('createLocationMessage',(coords)=>{


        let user = users.getUser(socket.id);

        if(user){

            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))



        }
    });


    socket.on('disconnect', ()=> {
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left room.`));
        }
    });
});

app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log(`Started on port ${port}`)
});




console.log(__dirname+'../public');
console.log(publicPath);