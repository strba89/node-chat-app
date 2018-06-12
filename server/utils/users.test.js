const expect = require('expect');
const { Users } = require('./users');


describe('Users',()=>{

    let users;

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Milos',
            room: 'Node Room'
        },{
            id: '2',
            name: 'Jan',
            room: 'React Room'
        },{
            id: '3',
            name: 'Julia',
            room: 'Node Room'
        }]
    });

    it('should add new users', ()=> {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Milos',
            room: 'node test'
        };

        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user])
    });

    it('should remove user', ()=> {
        let userId = '2';
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2)
    });

    it('should not remove user', ()=> {
        let userId = '99';
        let user = users.removeUser(userId);

        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3)
    });

    it('should find user', ()=> {
        let userId = '1';
        let user = users.getUser(userId);

        expect(user.id).toBe(userId)
    });

    it('should not find user', ()=> {
        let userId = '99';
        let user = users.getUser(userId);

        expect(user).toBeUndefined()
    });

    it('should return names of Node Room', ()=> {
        let userList =  users.getUserList('Node Room');

        expect(userList).toEqual(['Milos','Julia'])
    });

    it('should return names of React Room', ()=> {
        let userList =  users.getUserList('React Room');

        expect(userList).toEqual(['Jan'])
    });

});