import { validate, splitStringByComma } from '../utils'

describe('Utils', () => {
  it('Validate email', () => {
    const validEmail = 'email@domain.com'
    const invalidEmail = 'email'

    const validResult = validate(validEmail)
    const invalidResult = validate(invalidEmail)

    expect(validResult.valid).toBe(true)
    expect(validResult.value).toBe(validEmail)

    expect(invalidResult.valid).toBe(false)
    expect(invalidResult.value).toBe(invalidEmail)
  })

  it('Split str by comma', () => {
    const str = 'email1, email2,email3,,,, email4'
    const list = splitStringByComma(str)

    expect(list.length).toEqual(4)
  })
})
