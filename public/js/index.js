let socket = io();

socket.on('connect', function() {
    console.log('Connect to server');


});

socket.on('disconnect', function() {
    console.log('Disconnect from server')
});

socket.on('newMessage', function(message) {
    console.log('message: ', message)
});

socket.on('NewUser', function(message) {
    console.log('message: ', message)
});


socket.on('massageFromAdmin', function(message) {
    console.log('##########');
    console.log('From: ', message.from);
    console.log('##########');
    console.log('Message', message.text);
});
