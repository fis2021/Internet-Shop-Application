const express = require('express');
const router = express.Router();

const templates = require('../../templates').logout
const utils = require('../../utils')
const uuid = require('uuid')
const database = require('../../database')

router.put('/', async function(req, res, next) {
    try {
        const requestBody = JSON.parse(JSON.stringify(req.body))
        function isValid(body) {
            if(body === undefined) throw new Error("Empty body request")
            if(!utils.json.compareByTypes(templates, body)) throw new Error("Unexpected request format")
            if(requestBody.access_token === undefined) throw new Error("Invalid token value")
        }
        isValid(requestBody)
    } catch (err) {
        res.status(400).json({"error_message" : "Wrong body format"})
        return
    }

    const accessToken = req.body.access_token
    if(uuid.validate(accessToken)){
        const isCustomerToken = await database.query(`SELECT 1 FROM ${database.Tables.customers} WHERE customer_authentication_token = $1;`, [accessToken])
        const isSellerToken = await database.query(`SELECT 1 FROM ${database.Tables.sellers} WHERE seller_authentication_token = $1;`, [accessToken])

        const userType = isCustomerToken.rowCount > 0 ? "customer" :
                            isSellerToken.rowCount > 0 ? "seller" : undefined

        switch (userType) {
            case "customer":
                const resetCustomerToken = `UPDATE ${database.Tables.customers} SET 
                                            customer_authentication_token = $1,
                                            customer_token_in_use = $2,
                                            customer_token_creation_date = $3,
                                            customer_token_expiration_date = $4
                                            WHERE customer_authentication_token = $5;`
                await database.query(resetCustomerToken, [null, false, null, null, accessToken])
                res.status(201).end()
                break

            case "seller":
                const resetSellerToken = `UPDATE ${database.Tables.sellers} SET
                                          seller_authentication_token = $1,
                                          seller_token_in_use = $2,
                                          seller_token_creation_date = $3,
                                          seller_token_expiration_date = $4
                                          WHERE seller_authentication_token = $5;`
                await database.query(resetSellerToken, [null, false, null, null, accessToken])
                res.status(201).end()
                break

            default:
                res.status(400).json({"error_message" : "Session doesn\'t exists."})
                break;
        }
    } else {
        res.status(400).json({"error_message" : "Token isn\'t valid."})
    }
})

module.exports = router
