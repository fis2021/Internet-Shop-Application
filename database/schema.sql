--Create new schema for Internet Shop Application
CREATE SCHEMA IF NOT EXISTS "internet-shop-application";

--Table for registration customers related data
CREATE  TABLE "internet-shop-application".sellers (
	seller_idx           BIGSERIAL PRIMARY KEY,
	seller_unique_register_id uuid  NOT NULL ,
	seller_company_name  varchar(100)  NOT NULL ,
	seller_company_address varchar(100)  NOT NULL ,
	seller_company_email varchar(100)  NOT NULL ,
	seller_password char(60)  NOT NULL ,
	seller_contact_phone varchar(12)  NOT NULL ,
	seller_register_date timestamptz  NOT NULL
 );

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
