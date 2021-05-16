const hash = require('./../../../utils/security/hash')

test('Test password hash functions', async () => {
    const test = "MyPassword"
    const result = await hash.hashPassword(test)
    expect(result.length).toBe(60)
})


test('Test password hash functions not to return empty string', async () => {
    const test = "MyNewPassword"
    const result = await hash.hashPassword(test)
    expect(result).not.toBe("")
})

test('Test password hash functions not to return undefined', async () => {
    const test = "MyNewPassword"
    const result = await hash.hashPassword(test)
    expect(result).not.toBe(undefined)
})

test('Test password hash functions on empty string', async () => {
    const test = ""
    const result = await hash.hashPassword(test)
    expect(result).not.toBe(undefined)
})

test('Compare hashes => true', async () => {
    const testPassword = "_A1adnsba"
    const testHash = "$2b$10$qUkQ0ek4wVI6tLm9S.Xx9uiup1gEK8HiSzDGeclyCxAJGK7YSW0nu"
    expect(await hash.compareHashes(testPassword, testHash)).toBe(true)
})

test('Compare hashes => false', async () => {
    const testPassword = "_A1adnsba"
    const testHash = "$2b$10$qUkQ0ek4wVI6tLm9S.Xx2uiup1gEK8HiSzDGeclyCxAJGK7YSW0nu"
    expect(await hash.compareHashes(testPassword, testHash)).toBe(false)
})