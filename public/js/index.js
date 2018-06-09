let socket = io();


socket.on('connect', function() {
    console.log('Connect to server');

});

socket.on('disconnect', function() {
    console.log('Disconnect from server')
});

socket.on('newMessage', function(message) {
    let formattedTime = moment(message.createAt).format('h:mm a');

    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createAt: formattedTime
    });
    jQuery('#messages').append(html)
});


socket.on('newLocationMessage', function (message) {

    let formattedTime = moment(message.createAt).format('h:mm a');

    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        createAt: formattedTime,
        url: message.url
    });
    jQuery('#messages').append(html)
});

jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();

    let messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage',{
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    })
});

let locationButton = jQuery('#sent-location');

locationButton.on('click',function () {
   if(!navigator.geolocation){
       return alert('Geolocation not supported by your browser.')
   }
    locationButton.removeProp('disabled', true).text('Sending location...');
   navigator.geolocation.getCurrentPosition(function (position) {
       locationButton.prop("disable", false).text('Send Location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
   }, function () {
       locationButton.removeProp("disable", false).text('Send Location');
       alert('Unable to fetch location.')
   })
});