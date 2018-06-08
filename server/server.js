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

    socket.on('massageFromAdmin',()=>{

        io.emit('massageFromAdmin',{
            from:'Admin',
            text:'Welcome To Chat'
        })

    });

    socket.on('NewUser',()=>{

        socket.broadcast.emit('NewUser',{
                user: 'NewUser',
                createAt: new Date().getTime()
        })

    });





    socket.on('createMessage', (message)=> {
        console.log('createMessage', message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        })
        // socket.broadcast.emit('newMessage',{
        //         from: message.from,
        //         text: message.text,
        //         createAt: new Date().getTime()
        //     })

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