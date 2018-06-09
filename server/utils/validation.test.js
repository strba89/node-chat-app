let expect = require('expect');
let {isRealString} = require('./validation');

describe('isRealString',()=>{

    it('should reject non-string values', ()=>{
        let res = isRealString(98);
        expect(res).toBe(false)
    });

    it('should reject string whit only spaces', ()=>{
        let res = isRealString('      ');
        expect(res).toBe(false)
    });

    it('should allow string whit non-spaces chapters', ()=>{
        let res = isRealString(' Admin  ');
        expect(res).toBe(true)
    });

});