const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');




const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');


let app = express();
let server = http.createServer(app);

let io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('New user connect');
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