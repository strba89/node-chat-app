let expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',()=>{

    it('should generate correct message object', ()=>{
        let from = 'Admin';
        let text = 'New Message';
        let message = generateMessage(from, text);

        expect(message).toMatchObject({from, text})

    });

});

describe('generateLocationMessage',()=>{

    it('should generate correct location object', ()=>{
        let from = 'Admin';
        let latitude = 11;
        let longitude = -22;
        let url = 'https://www.google.com/maps?q=11,-22';
        let message = generateLocationMessage(from, latitude, longitude);

        expect(message).toMatchObject({from, url})

    });

});
