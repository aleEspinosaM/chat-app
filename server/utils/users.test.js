const expect = require('expect')

const {Users} = require('./users')


describe('Users', () => {

  var users;
  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node'
    },
    {
      id: '2',
      name: 'Ted',
      room: 'React'
    },
    {
      id: '3',
      name: 'Potato',
      room: 'Node'
    }]
  })

  it('should add new users', () => {
    var users = new Users();

    var user = {
      id: 123,
      name: 'Alex',
      room: 'The office'
    }
    var responseUsers = users.addUser(user.id,user.name,user.room)

    expect(users.users).toEqual([user]);

  })

  it('should return names for node',() => {
    var userList = users.getUserList('Node')

    expect(userList).toEqual(['Mike', 'Potato'])
  })
  it('should return names for react',() => {
    var userList = users.getUserList('React')

    expect(userList).toEqual(['Ted'])
  })
  it('should remove a user',() => {
    var userId = '1'

    var user = users.removeUser(userId)
    expect(user.id).toBe(userId)
    expect(users.users.length).toBe(2)
  })
  it('should not remove user',() => {
    var userId = '1343434'

    var user = users.removeUser(userId)
    expect(user).toNotExist()
    expect(users.users.length).toBe(3)
  })
  it('should find a user',() => {
    var userId = '2'
    var user = users.getUser(userId)
    expect(user.id).toBe(userId)
  })
  it('should not find user',() => {
    var userId = '2323'
    var user = users.getUser(userId)
    expect(user).toNotExist()
  })
})
