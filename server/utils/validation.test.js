var expect = require('expect')

var {isRealString} = require('./validation')



describe('is a Real string?',() => {
  it('should reject non string values', () => {
    var response = isRealString(3452)
    expect(response).toBe(false)
  })
  it('should reject strings with only spaces', () => {
    var response = isRealString('    ')
    expect(response).toBe(false)
  })
  it('should allow string with spaces', () => {
    var response = isRealString('  alex  perro')
    expect(response).toBe(true)
  })
})
