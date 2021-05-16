const database = require('../../database/index')

const request = require('supertest')
const app = require('../../app')

test('Test API root page', async () => {
    const res = await request(app)
        .get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toBe("You reached the root page of API")
})