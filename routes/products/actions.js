const express = require('express')
const router = express.Router()

const database = require('./../../database')
const uuid = require('uuid')
const templates = require('./../../templates')
const utils = require('../../utils')

/**
 * Display all seller products route, based on uuid (session token)
 */
router.get('/view-all/:uuidTag', async function(req, res, next) {
    const sellerTag = req.params['uuidTag']
    if(uuid.validate(sellerTag) === false) {
        res.status(400).json({"error_message " : "Invalid parameter"})
        return
    }

    const getSellerInfoStmt = `SELECT seller_token_expiration_date,
                                      seller_company_name,
                                      seller_unique_register_id
                               FROM ${database.Tables.sellers}
                               WHERE seller_authentication_token = $1;`
    const sellerExits = await database.query(getSellerInfoStmt, [sellerTag])
    if(sellerExits.rows.length === 0){
        res.status(400).json({"error_message " : "Token doesn't exist"})
        return
    }

    const sellerRegistrationUUID = sellerExits.rows[0]['seller_unique_register_id']
    const getSellerProductsStmt = `SELECT product_name,
                                       product_price,
                                       product_quantity,
                                       product_description,
                                       product_image_location,
                                       product_unique_register_id
                                    FROM ${database.Tables.products}
                                    WHERE product_company_owner_uuid = $1;`

    const productsOfSeller = await database.query(getSellerProductsStmt, [sellerRegistrationUUID])

    const productsList = productsOfSeller.rows.map((e) => {
        return {
            "name" : e.product_name,
            "price" : e.product_price,
            "quantity" : e.product_quantity,
            "description" : e.product_description,
            "imageURL" : e.product_image_location,
            "id" : e.product_unique_register_id
        }
    })

    const sellerProductResponse = {
        "numberOfProducts" : productsList.length,
        "sellerID" : sellerRegistrationUUID,
        "list" : productsList
    }

    res.status(200).json(sellerProductResponse)
})



router.post('/interact', async function(req, res, next) {
    try {
        function isValid(body) {
            if(body === undefined) throw new Error("Unexpected empty body")
            if(!(utils.json.compareByTypes(body, templates.action.add) ||
                utils.json.compareByTypes(body, templates.action.remove) ||
                utils.json.compareByTypes(body, templates.action.edit))) throw new Error("Unexpected request body")
            if(!uuid.v4(req.body.session_token)) throw new Error("Invalid uuid")
        }
        isValid(req.body)
    } catch(e) {
        console.log(req.body)
        res.status(400).json({"error_message" : "Unexpected request body"})
        return
    }
    const requestBody = req.body
    const isValidSession = await database.query(`SELECT seller_token_expiration_date,
                                                             seller_unique_register_id
                                                       FROM ${database.Tables.sellers}
                                                       WHERE seller_authentication_token = $1;`, [requestBody['session_token']])
    const currentDate = new Date()
    if(isValidSession.rows.length === 0 ) {
        res.status(400).json({"error_message" : "Invalid data provided"})
        return
    }

    const productUUID = requestBody['product_uuid']

    const sellerUUID = isValidSession.rows[0]['seller_unique_register_id']
    switch(requestBody.action) {
        case "add" :
            const addStmt = `INSERT INTO ${database.Tables.products} (
                                 product_unique_register_id,
                                 product_name,
                                 product_price,
                                 product_quantity,
                                 product_company_owner_uuid,
                                 product_description,
                                 product_register_date,
                                 product_status)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING true;`
            const addParams = [
                uuid.v4(),
                requestBody.product.name,
                requestBody.product.price,
                requestBody.product.quantity,
                sellerUUID,
                requestBody.product.description,
                'NOW()',
                requestBody.product.quantity <= 0 ? 0 : 1
            ]
            const addResponse = await database.query(addStmt, addParams)
            if(addResponse.rows.length > 0){
                res.status(201).end()
            } else {
                res.status(501).end()
            }

            break

        case "edit" :
            const editStmt = `UPDATE ${database.Tables.products} SET
                                product_name = $1,
                                product_price = $2,
                                product_quantity = $3,
                                product_description = $4
                               WHERE product_unique_register_id = $5 RETURNING true;`
            const editParams = [
                requestBody.product.name,
                requestBody.product.price,
                requestBody.product.quantity,
                requestBody.product.description,
                productUUID
            ]
            const editResponse = await database.query(editStmt, editParams)
            if(editResponse.rows.length > 0){
                res.status(201).end()
            } else {
                res.status(501).end()
            }
            break

        case "remove" :
            const removeStmt = `DELETE FROM ${database.Tables.products}
                                WHERE product_unique_register_id = $1 RETURNING true;`
            const removeResponse = await database.query(removeStmt, [productUUID])
            if(removeResponse.rows.length > 0){
                res.status(201).end()
            } else {
                res.status(400).end()
            }
            break

        default:
            res.status(400).json({"error_message" : "Invalid interaction provided"})
            break
    }
})

module.exports = router

