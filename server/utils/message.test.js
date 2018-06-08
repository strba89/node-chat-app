let expect = require('expect');
let {generateMessage} = require('./message');

describe('generateMessage',()=>{

    it('should generate correct message object', ()=>{
        let from = 'Admin';
        let text = 'New Message';
        let message = generateMessage(from, text);

        expect(message).toMatchObject({from, text})

    })

});