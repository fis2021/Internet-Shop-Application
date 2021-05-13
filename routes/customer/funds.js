const express = require('express')
const router = express.Router()

const database = require('../../database')
const utils = require('../../utils')
const template = require('../../templates')

router.post('/', async function(req, res, next) {
    try {
        function isValid(body){
            if(!utils.json.compareByTypes(body, template.customer.addFunds)) throw new Error("Unexpected body format.")
            if(body.action.amount <= 0) throw new Error("Amount less than zero provided.")
        }
        isValid(req.body)
    } catch (e) {
        res.status(400).json({"error_message" : "Unexpected body format"})
        return
    }

    const requestBody = req.body
    const validSessionStmt = `SELECT customer_funds,
                                customer_token_expiration_date,
                                customer_token_in_use
                              FROM ${database.Tables.customers} 
                              WHERE customer_authentication_token = $1;`

    const isValidSession = await database.query(validSessionStmt, [requestBody['session_token']])
    if(isValidSession.rows.length <= 0){
        res.status(400).json({"error_message" : "Invalid credentials provided."})
        return
    }

    const currentDate = new Date()
    if(isValidSession.rows[0]['customer_token_expiration_date'] < currentDate || isValidSession.rows[0]['customer_token_in_use'] === false){
        const resetExpiredToken = `UPDATE ${database.Tables.customers} SET
                                        customer_authentication_token = null,
                                        customer_token_in_use = false,
                                        customer_token_creation_date = null,
                                        customer_token_expiration_date = null
                                    WHERE customer_authentication_token = $1;`
        await database.query(resetExpiredToken, [requestBody['session_token']])
        res.status(400).json({"error_message" : "Session in not valid. Please log in again."})
    }

    let finalFundsBalance = Number(isValidSession.rows[0]['customer_funds'])
    switch (requestBody.action.type) {
        case "add":      finalFundsBalance += Number(requestBody.action.amount)
            break

        case "retrieve": finalFundsBalance -= Number(requestBody.action.amount)
            break

        default:
            res.status(400).json({"error_message" : "Requested operation unknown."})
            break
    }

    if(finalFundsBalance < 0){
        res.status(400).json({"error_message" : "Insufficient funds. Transaction aborted"})
        return
    }

    const updateFundsStmt = `UPDATE ${database.Tables.customers} SET
                                customer_funds = $1
                            WHERE customers.customer_authentication_token = $2 RETURNING true;`

    const dbResponse = await database.query(updateFundsStmt, [finalFundsBalance, requestBody['session_token']])
    if(dbResponse.rows.length < 0){
        res.status(501).end()
    } else {
        res.status(200).json({"account_funds" : finalFundsBalance})
    }
})

module.exports = router
