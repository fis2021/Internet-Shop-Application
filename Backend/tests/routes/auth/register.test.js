const database = require('../../../database/index')
beforeAll(async () => {
    await database.query(`CREATE SCHEMA IF NOT EXISTS "internet-shop-application";`)
    await database.query(`CREATE  TABLE "internet-shop-application".sellers (
        seller_idx           BIGSERIAL PRIMARY KEY,
        seller_unique_register_id uuid  NOT NULL ,
        seller_company_name  varchar(100)  NOT NULL ,
        seller_company_address varchar(100)  NOT NULL ,
        seller_company_email varchar(100)  NOT NULL ,
        seller_password char(60)  NOT NULL ,
        seller_contact_phone varchar(12)  NOT NULL ,
        seller_register_date timestamptz  NOT NULL);`)

    await database.query(`CREATE  TABLE "internet-shop-application".customers (
        customer_idx         BIGSERIAL PRIMARY KEY,
        customer_unique_register_id uuid  NOT NULL ,
        customer_name        varchar(50)  NOT NULL ,
        customer_surname     varchar(50)  NOT NULL ,
        customer_email       varchar(100)  NOT NULL ,
        customer_password    char(60)  NOT NULL ,
        customer_register_date timestamptz NOT NULL
);`)
})

const request = require('supertest')
const app = require('../../../app')


test('Register new customer', async () => {
    const res = await request(app).put('/api/auth/register').send({
        "user-type" : "customer",
        "user" : {
            "name" : "name",
            "surname" : "surname",
            "email" : "new.customer5@gmail.com",
            "password" : "X0ExYWRuc2Jhk"
        }
    })
    expect(res.statusCode).toEqual(201)
})

test('Register new customer', async () => {
    const res = await request(app).put('/api/auth/register').send({
        "user-type" : "seller",
        "user" : {
            "company-name" : "company name",
            "address" : "address",
            "phone" : "1235151",
            "email" : "new.seller6@gmail.com",
            "password" : "XzFBYUJhc2Rhc2Rhc2Q="
        }
    })
    expect(res.statusCode).toEqual(201)
})

test('Register new seller', async () => {
    const res = await request(app).put('/api/auth/register').send({
        "user-type" : "seller",
        "user" : {}
    })
    expect(res.statusCode).toEqual(400)
})

test('Register new seller', async () => {
    const res = await request(app).put('/api/auth/register').send({
        "user-type" : "customer",
        "user" : {}
    })
    expect(res.statusCode).toEqual(400)
})

afterAll(async () => {
    await database.query(`drop schema "internet-shop-application" cascade;`)
})