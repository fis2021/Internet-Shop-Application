const express = require('express');
const router = express.Router();

const database = require('../../database')
const templates = require('../../templates').register
const utils = require('../../utils')
const uuid = require('uuid')

router.put('/', async function(req, res, next) {
    // Validate request body format
    try{
        const requestBody = JSON.parse(JSON.stringify(req.body))
        const isValid = function(body) {
            if(body === undefined) throw new Error('Empty request body')
            if(!(utils.json.compareByTypes(templates.customerTemplate, body) ||
                 utils.json.compareByTypes(templates.sellerTemplate, body)))
                    throw new Error("Request body doesn't match any template")
        }
        isValid(requestBody)
    } catch(e) {
        res.status(400).json({"error_message" : "Wrong request format."})
    }

    const requestBody = JSON.parse(JSON.stringify(req.body))
    let queryParams = Array()

    const user = requestBody.user
    switch(requestBody['user-type']) {
        case "customer" :
            queryParams['name'] = utils.security.validator.validateName(user.name) ? user.name : undefined
            queryParams['surname'] = utils.security.validator.validateName(user.surname) ? user.surname : undefined
            break

        case "seller" :
            queryParams['company-name'] = utils.security.validator.validateOtherName(user['company-name'], 100) ? user['company-name'] : undefined
            queryParams['address'] = utils.security.validator.validateOtherName(user.address, 100) ? user.address : undefined
            queryParams['phone'] = utils.security.validator.validatePhone(user.phone) ? user.phone : undefined
            break

        default :
            res.status(400).json({"error_message" : "Unavailable user type."})
            break
    }

    queryParams['email'] = utils.security.validator.validateEmail(user.email) ? user.email : undefined
    queryParams['password'] = utils.security.base64.decodeBase64(user.password)
    queryParams['password'] = utils.security.validator.validatePassword(queryParams['password']) ? queryParams['password'] : undefined

    //If any of provided fields are invalid return error response, otherwise register new user
    if(!queryParams.every(e => e)){
        res.json({"error_message" : "Provided fields values are invalid or doesn\'t meet security rules."}).status(400)
    } else {
        queryParams['uuid'] = uuid.v4()
        queryParams['password'] = await utils.security.hash.hashPassword(queryParams['password'])

        const isCustomer = await database.query(`SELECT 1 FROM ${database.Tables.customers} WHERE customer_email = $1;`, [queryParams['email']])
        const isSeller = await database.query(`SELECT 1 FROM ${database.Tables.sellers} WHERE seller_company_email = $1;`, [queryParams['email']])

        //Check if email isn't registered in database yet
        if(isCustomer.rowCount === 0 && isSeller.rowCount === 0){
            switch (requestBody['user-type']){
                case "customer":
                    const customerStmt = `INSERT INTO ${database.Tables.customers} (
                        customer_unique_register_id,
                        customer_name,
                        customer_surname,
                        customer_email,
                        customer_password,
                        customer_register_date)
                        VALUES ($1, $2, $3, $4, $5, $6) RETURNING true;`;
                    const customerValues = [
                        queryParams['uuid'],
                        queryParams['name'],
                        queryParams['surname'],
                        queryParams['email'],
                        queryParams['password'],
                        'NOW()']
                    const dbResponseCustomer = await database.query(customerStmt, customerValues)

                    if(dbResponseCustomer.rows === Array.empty){
                        res.json({"error_message" : "Internal server error"}).status(500)
                    } else {
                        res.status(201).end()
                    }
                    break

                case "seller":
                    const sellerStmt = `INSERT INTO ${database.Tables.sellers} (
                        seller_unique_register_id, 
                        seller_company_name, 
                        seller_company_address, 
                        seller_company_email, 
                        seller_password, 
                        seller_contact_phone, 
                        seller_register_date) 
                        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING true;`
                    const sellerValues = [
                        queryParams['uuid'],
                        queryParams['company-name'],
                        queryParams['address'],
                        queryParams['email'],
                        queryParams['password'],
                        queryParams['phone'],
                        'NOW()']
                    const dbResponseSeller = await database.query(sellerStmt, sellerValues)

                    if(dbResponseSeller.rows === Array.empty){
                        res.json({"error_message" : "Internal server error"}).status(500)
                    } else {
                        res.status(201).end()
                    }
                    break
            }
        } else {
            res.json({"error_message" : "User already exists."}).status(409)
        }
    }
});

module.exports = router;
