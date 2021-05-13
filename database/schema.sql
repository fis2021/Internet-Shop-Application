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

ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_authentication_token uuid;
ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_token_creation_date timestamptz;
ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_token_expiration_date timestamptz;
ALTER TABLE "internet-shop-application".sellers ADD COLUMN seller_token_in_use boolean DEFAULT false;


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


--Table for products
CREATE  TABLE "internet-shop-application".products (
	product_idx          BIGSERIAL PRIMARY KEY,
	product_unique_register_id uuid  NOT NULL ,
	product_name         varchar(100)  NOT NULL ,
	product_price        double precision  NOT NULL ,
	product_quantity     integer  NOT NULL default 0,
	product_company_owner_uuid uuid  NOT NULL ,
	product_description  text  NOT NULL ,
	product_image_location path ,
	product_register_date date DEFAULT current_date NOT NULL ,
	product_status       char(1)  NOT NULL
 );

ALTER TABLE "internet-shop-application".products ADD COLUMN product_category varchar(50) NOT NULL DEFAULT '*';
