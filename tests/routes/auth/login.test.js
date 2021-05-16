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


    await database.query(`ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_authentication_token uuid;
ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_token_creation_date timestamptz;
ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_token_expiration_date timestamptz;
ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_token_in_use boolean DEFAULT false;
ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_account_balance double  precision  NOT NULL DEFAULT .0;`)

    await database.query(`ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_authentication_token uuid;
ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_token_creation_date timestamptz;
ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_token_expiration_date timestamptz;
ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_token_in_use boolean DEFAULT false;
ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_funds real DEFAULT .0 NOT NULL;
ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_address varchar(50);
ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_contact_phone varchar(12);`)
})

const request = require('supertest')
const app = require('../../../app')


test('Login new customer', async () => {
    await request(app).put('/api/auth/register').send({
        "user-type" : "customer",
        "user" : {
            "name" : "name",
            "surname" : "surname",
            "email" : "new.customer5@gmail.com",
            "password" : "X0ExYWRuc2Jhk"
        }
    })

    const resLogin = await request(app).post('/api/auth/login').send({
        "user" : {
            "email" : "new.customer5@gmail.com",
            "password" : "X0ExYWRuc2Jhk"
        }
    })


    expect(resLogin.statusCode).toEqual(201)
    expect(resLogin.body).not.toBe(undefined)
})


test('Login new seller', async () => {
    await request(app).put('/api/auth/register').send({
        "user-type" : "seller",
        "user" : {
        "company-name" : "company name",
            "address" : "address",
            "phone" : "1235151",
            "email" : "new.seller6@gmail.com",
            "password" : "XzFBYUJhc2Rhc2Rhc2Q="
    }
    })

    const resLogin = await request(app).post('/api/auth/login').send({
        "user" : {
            "email" : "new.seller6@gmail.com",
            "password" : "XzFBYUJhc2Rhc2Rhc2Q="
        }
    })
    expect(resLogin.statusCode).toEqual(201)
    expect(resLogin.body).not.toBe(undefined)
})


test('Login twice new seller', async () => {
    await request(app).put('/api/auth/register').send({
        "user-type" : "seller",
        "user" : {
            "company-name" : "company name",
            "address" : "address",
            "phone" : "1235151",
            "email" : "new.seller6@gmail.com",
            "password" : "XzFBYUJhc2Rhc2Rhc2Q="
        }
    })
    await request(app).post('/api/auth/login').send({
        "user" : {
            "email" : "new.seller6@gmail.com",
            "password" : "XzFBYUJhc2Rhc2Rhc2Q="
        }
    })
    const resLogin = await request(app).post('/api/auth/login').send({
        "user" : {
            "email" : "new.seller6@gmail.com",
            "password" : "XzFBYUJhc2Rhc2Rhc2Q="
        }
    })
    expect(resLogin.statusCode).toEqual(400)
    expect(resLogin.body).not.toBe(undefined)
})

test('Login twice new customer', async () => {
    await request(app).put('/api/auth/register').send({
        "user-type" : "customer",
        "user" : {
            "name" : "name",
            "surname" : "surname",
            "email" : "new.customer5@gmail.com",
            "password" : "X0ExYWRuc2Jhk"
        }}
    )
    await request(app).post('/api/auth/login').send({
        "user" : {
            "email" : "new.seller6@gmail.com",
            "password" : "XzFBYUJhc2Rhc2Rhc2Q="
        }
    })
    const resLogin = await request(app).post('/api/auth/login').send({
        "user" : {
            "email" : "new.seller6@gmail.com",
            "password" : "XzFBYUJhc2Rhc2Rhc2Q="
        }
    })
    expect(resLogin.statusCode).toEqual(400)
    expect(resLogin.body).not.toBe(undefined)
})



afterAll(async () => {
    await database.query(`drop schema "internet-shop-application" cascade;`)
})