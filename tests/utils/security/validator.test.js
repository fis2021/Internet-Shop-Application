const validator = require('../../../utils/security/validator')

test('Test password validator on valid password => true', () => {
    const test = "Aaa124566fsdfsdf"
    expect(validator.validatePassword(test)).toBe(true)
})

test('Test password validator password less that 8 chars => false', () => {
    const test = "abcdef"
    expect(validator.validatePassword(test)).toBe(false)
})

test('Test password validator password on valid password => true', () => {
    const test = "SAZXCASDFWEergbretbnrt65h5667"
    expect(validator.validatePassword(test)).toBe(true)
})

test('Test password validator on empty strings => false', () => {
    const test = ""
    expect(validator.validatePassword(test)).toBe(false)
})

test('Test password validator on numbers => false', () => {
    const test = 123346456.2345
    expect(validator.validatePassword(test)).toBe(false)
})

test('Test password validator on other data types => false', () => {
    const test = {"paaswrod" : ""}
    expect(validator.validatePassword(test)).toBe(false)
})

test('Test email validator on valid email => true', () => {
    const test = "mymail@domain.com"
    expect(validator.validateEmail(test)).toBe(true)
})

test('Test email validator on invalid email => false', () => {
    const test = "mymail_domain.com"
    expect(validator.validateEmail(test)).toBe(false)
})

test('Test email validator on invalid email => false', () => {
    const test = "mymail_domain.com"
    expect(validator.validateEmail(test)).toBe(false)
})

test('Test email validator on invalid email => false', () => {
    const test = "mymail@withoutdot"
    expect(validator.validateEmail(test)).toBe(false)
})

test('Test email validator on invalid email => false', () => {
    const test = "mymail@withoutdot"
    expect(validator.validateEmail(test)).toBe(false)
})

test('Test email validator on number email => true', () => {
    const test = "123152534@3545345345.com"
    expect(validator.validateEmail(test)).toBe(true)
})

test('Test email validator on other Data Types => false', () => {
    const test = {"myobjesc" : "password"}
    expect(validator.validateEmail(test)).toBe(false)
})

test('Test name validator on valid names => true', () => {
    const test = "Validnametest"
    expect(validator.validateName(test)).toBe(true)
})

test('Test name validator on valid names => true', () => {
    const test = "nAMeASdasdasjhkdlasdas"
    expect(validator.validateName(test)).toBe(true)
})

test('Test name validator on invalid names => false', () => {
    const test = "Valid123123 name test"
    expect(validator.validateName(test)).toBe(false)
})

test('Test name validator on invalid names => false', () => {
    const test = "Valid123123_"
    expect(validator.validateName(test)).toBe(false)
})

test('Test name validator on invalid names => false', () => {
    const test = "Valid123123_"
    expect(validator.validateName(test)).toBe(false)
})

test('Test other name validator on valid names => true', () => {
    const test = "Valid123123/"
    expect(validator.validateOtherName(test)).toBe(true)
})

test('Test other name validator on valid names => true', () => {
    const test = "VliatOther123123    /"
    expect(validator.validateOtherName(test)).toBe(true)
})

test('Test other name validator on invalid names => false', () => {
    const test = "VliatOther12312/____"
    expect(validator.validateOtherName(test)).toBe(false)
})

test('Test other name validator on invalid names => false', () => {
    const test = "{P{{}}}}{{{Not Validas-902345235"
    expect(validator.validateOtherName(test)).toBe(false)
})

test('Test other name validator on other datatypes => false', () => {
    const test = {}
    expect(validator.validateOtherName(test)).toBe(false)
})

test('Test other name validator on other datatypes => false', () => {
    const test = [{}, {}, {}]
    expect(validator.validateOtherName(test)).toBe(false)
})

test('Test other name validator on other datatypes => false', () => {
    const test = 1.43534556457
    expect(validator.validateOtherName(test)).toBe(false)
})

test('Test phone validator on valid phone => true', () => {
    const test = "1230023563"
    expect(validator.validatePhone(test)).toBe(true)
})

test('Test phone validator on valid phone => true', () => {
    const test = "123002"
    expect(validator.validatePhone(test)).toBe(true)
})

test('Test phone validator on invalid phone => false', () => {
    const test = "MyPhoneNumber"
    expect(validator.validatePhone(test)).toBe(false)
})

test('Test phone validator on invalid phone => false', () => {
    const test = "/000042/2"
    expect(validator.validatePhone(test)).toBe(false)
})

test('Test phone validator on invalid phone => false', () => {
    const test = "00000000000000000"
    expect(validator.validatePhone(test)).toBe(false)
})

test('Test phone validator on other data types => false', () => {
    const test = {}
    expect(validator.validatePhone(test)).toBe(false)
})

test('Test phone validator on other data types => false', () => {
    const test = ["string with phone"]
    expect(validator.validatePhone(test)).toBe(false)
})