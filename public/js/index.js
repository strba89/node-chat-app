let socket = io();

socket.on('connect', function() {
    console.log('Connect to server');

});

socket.on('disconnect', function() {
    console.log('Disconnect from server')
});

socket.on('newMessage', function(message) {
    console.log('newMessage: ', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.emit('createMessage', {
    from: 'Milos',
    text: 'Hi'
},function(data){
  console.log(data)
});

jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    })
});