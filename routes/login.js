const express = require('express')
const router = express.Router()

const template = require('../templates').login
const utils = require('../utils')
const database = require('../database')
const uuid = require('uuid')

const tokenExpirationTime = 60 * 60 * 24; //One day equivalent in seconds

router.post('/', async function(req, res, next) {
    try {
        const requestBody = JSON.parse(JSON.stringify(req.body))
        const isValid = function (body) {
            if(body === undefined) throw new Error("Empty body request")
            if(!utils.json.compareByTypes(template, body)) throw new Error("Unexpected body format")
        }
        isValid(requestBody)
    } catch (e) {
        res.status(400).json({"error_message" : "Wrong body format"})
        return
    }

    const requestBody = req.body.user
    const isCustomer = await database.query(`SELECT customer_password, 
                                                         customer_authentication_token, 
                                                         customer_token_expiration_date,
                                                         customer_token_in_use  FROM ${database.Tables.customers} WHERE customer_email = $1;`, [requestBody.email])
    const isSeller = await database.query(`SELECT seller_password, 
                                                       seller_authentication_token,
                                                       seller_token_expiration_date,
                                                       seller_token_in_use FROM ${database.Tables.sellers} WHERE seller_company_email = $1;`, [requestBody.email])

    if(isCustomer.rowCount === 0 && isSeller.rowCount === 0){
        res.status(400).json({"error_message" : "User doesn\'t exists. Registered credentials are required."})
    } else {
        function customerCredentials() {
            return {
                userType : "customer",
                email : requestBody.email,
                requestPassword : utils.security.base64.decodeBase64(requestBody.password),
                registerPassword : isCustomer.rows[0].customer_password,
                token_expiration_date : isCustomer.rows[0].customer_token_expiration_date,
                token_in_use : isCustomer.rows[0].customer_token_in_use,
                token: isCustomer.rows[0].customer_authentication_token
            }
        }

        function sellerCredentials() {
            return {
                userType : "seller",
                email : requestBody.email,
                requestPassword : utils.security.base64.decodeBase64(requestBody.password),
                registerPassword : isSeller.rows[0].seller_password,
                token_expiration_date : isSeller.rows[0].seller_token_expiration_date,
                token_in_use : isSeller.rows[0].seller_token_in_use,
                token: isSeller.rows[0].seller_authentication_token
            }
        }

        const userCredentials = isCustomer.rowCount > 0 ? customerCredentials() : sellerCredentials()

        if(await utils.security.hash.compareHashes(userCredentials.requestPassword, userCredentials.registerPassword)){
            if(userCredentials.token_in_use === false) {
                function tokenObj(userType, token, expirationDate) {
                    return {
                        "user_type" : userType,
                        "access_token" : token,
                        "expiration_date" : expirationDate
                    }
                }

                if(new Date(userCredentials.token_expiration_date) > Date.now()){
                    //token is valid
                    const updateStatus = userCredentials.userType === "customer" ?
                        `UPDATE ${database.Tables.customers} SET customer_token_in_use = true WHERE customer_email = $1;` :
                        `UPDATE ${database.Tables.sellers}   SET seller_token_in_use = true WHERE seller_company_email = $1;`
                    await database.query(updateStatus, [userCredentials.email])

                    res.status(200).json(tokenObj(userCredentials.userType, userCredentials.token, userCredentials.token_expiration_date))
                } else {
                    const accessToken = uuid.v4()
                    const updateStatus = userCredentials.userType === "customer" ?
                        `UPDATE ${database.Tables.customers} SET 
                            customer_authentication_token = $1,
                            customer_token_in_use = true, 
                            customer_token_creation_date = NOW(),
                            customer_token_expiration_date = (SELECT CURRENT_TIMESTAMP + INTERVAL '${tokenExpirationTime} seconds')
                            WHERE customer_email = $2 RETURNING customer_token_expiration_date;` :

                        `UPDATE ${database.Tables.sellers} SET 
                            seller_authentication_token = $1,
                            seller_token_in_use = true, 
                            seller_token_creation_date = NOW(),
                            seller_token_expiration_date = (SELECT CURRENT_TIMESTAMP + INTERVAL '${tokenExpirationTime} seconds')
                            WHERE seller_company_email = $2 RETURNING seller_token_expiration_date;`

                    const expirationTimeFromDB = await database.query(updateStatus, [accessToken, userCredentials.email])
                    res.status(201).json(tokenObj(userCredentials.userType, accessToken, expirationTimeFromDB.rows[0]['customer_token_expiration_date']))
                }
            } else {
                res.status(400).json({"error_message" : "User is already logged in."})
            }
        } else {
            res.status(400).json({"error_message" : "Email or password is incorrect."})
        }
    }
})

module.exports = router
