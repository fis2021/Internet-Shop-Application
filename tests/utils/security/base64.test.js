const decoder = require('../../../utils/security/base64')

test('Test decoder from base64 on undefined => true', () => {
    const test = undefined

    expect(decoder.decodeBase64(test)).toBe(undefined)
})


test('Test decoder from base64 on numbers => true', () => {
    const test = 453531.12354235

    expect(decoder.decodeBase64(test)).toBe(undefined)
})

test('Test decoder from base64 on strings => true', () => {
    const test = "c3RyaW5n"

    expect(decoder.decodeBase64(test)).toBe("string")
})

test('Test decoder from base64 on strings => true', () => {
    const test = "c3RyaW5nTXlTdHJpbmc="

    expect(decoder.decodeBase64(test)).not.toBe("string")
})


test('Test decoder from base64 on strings => true', () => {
    const test = "c3VwZXJTdHJpbmc7a2wnIGplcmdmbTg3MzQgbXRneWVocnBnYm92bnJsZ2I0NTdpcGdw"

    expect(decoder.decodeBase64(test)).toBe("superString;kl' jergfm8734 mtgyehrpgbovnrlgb457ipgp")
})


test('Test decoder from base64 on strings => true', () => {
    const test = "MS8vIUAkQCEjJCUjJCVeMzQ2"

    expect(decoder.decodeBase64(test)).toBe("1//!@$@!#$%#$%^346")
})

