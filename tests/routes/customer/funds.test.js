const database = require('../../../database/index')
beforeAll(async () => {
    await database.query(`--Create new schema for Internet Shop Application
    CREATE SCHEMA IF NOT EXISTS "internet-shop-application";


    --Table for registration customers related data
    CREATE  TABLE "internet-shop-application".customers (
        customer_idx         BIGSERIAL PRIMARY KEY,
        customer_unique_register_id uuid  NOT NULL ,
        customer_name        varchar(50)  NOT NULL ,
        customer_surname     varchar(50)  NOT NULL ,
        customer_email       varchar(100)  NOT NULL ,
        customer_password    char(60)  NOT NULL ,
        customer_register_date timestamptz NOT NULL
);

    ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_authentication_token uuid;
    ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_token_creation_date timestamptz;
    ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_token_expiration_date timestamptz;
    ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_token_in_use boolean DEFAULT false;
    ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_funds real DEFAULT .0 NOT NULL;
    ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_address varchar(50);
    ALTER TABLE "internet-shop-application".customers ADD COLUMN customer_contact_phone varchar(12);
    
    CREATE  TABLE "internet-shop-application".sellers (
\tseller_idx           BIGSERIAL PRIMARY KEY,
\tseller_unique_register_id uuid  NOT NULL ,
\tseller_company_name  varchar(100)  NOT NULL ,
\tseller_company_address varchar(100)  NOT NULL ,
\tseller_company_email varchar(100)  NOT NULL ,
\tseller_password char(60)  NOT NULL ,
\tseller_contact_phone varchar(12)  NOT NULL ,
\tseller_register_date timestamptz  NOT NULL
 );

ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_authentication_token uuid;
ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_token_creation_date timestamptz;
ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_token_expiration_date timestamptz;
ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_token_in_use boolean DEFAULT false;
ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_account_balance double  precision  NOT NULL DEFAULT .0;
    
`)
})

afterAll(async () => {
    await database.query(`drop schema "internet-shop-application" cascade;`)
})


const request = require('supertest')
const app = require('../../../app')

test('Add funds to customer account', async () => {
    const res = await request(app).put('/api/auth/register').send({
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

    const token = resLogin.body['access_token']

    const resAddFunds = await request(app).post('/api/customer/funds').send({
        "session_token" : token,
        "action" : {
            "type" : "add",
            "amount" : 1
        }
    })
    expect(resAddFunds.statusCode).toEqual(200)
    expect(resAddFunds.body).toStrictEqual({
        "account_funds": 1
    })
})

test('Add funds to customer account', async () => {
    const res = await request(app).put('/api/auth/register').send({
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

    const token = resLogin.body['access_token']
    await request(app).post('/api/customer/funds').send({
        "session_token" : token,
        "action" : {
            "type" : "add",
            "amount" : 2
        }
    })

    const resAddFunds = await request(app).post('/api/customer/funds').send({
        "session_token" : token,
        "action" : {
            "type" : "retrieve",
            "amount" : 1
        }
    })

    expect(resAddFunds.statusCode).toEqual(400)
})