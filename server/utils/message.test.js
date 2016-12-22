var expect = require('expect')


var {generateMessage, generateLocationMessage} = require('./message')


describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Frank turner'
    var text = 'see you soon mexico'
    var message = generateMessage(from, text)
    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({from,text})
  })
})


describe('generateLocationMessage', () => {
  it('should genarate correct locaton object', () => {
    var from = 'Alex'
    var latitude = 232
    var longitude = 344
    var url = 'https://www.google.com/maps?q=232,344'
    var message = generateLocationMessage(from, latitude, longitude)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({from,url})
  })
})
