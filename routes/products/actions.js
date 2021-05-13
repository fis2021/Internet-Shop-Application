const express = require('express')
const router = express.Router()

const database = require('./../../database')
const uuid = require('uuid')
const templates = require('./../../templates')
const utils = require('../../utils')

/**
 * Display all seller products route, based on uuid (session token)
 */
router.get('/view-all/:uuidSessionTag', async function(req, res, next) {
    const sellerTag = req.params['uuidSessionTag']
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

    const currentDate = new Date()
    if(sellerExits.rows[0]['seller_token_expiration_date'] < currentDate){
        const clearTokenStmt = `UPDATE ${database.Tables.sellers} SET
                                    seller_authentication_token = null,
                                    seller_token_in_use = false,
                                    seller_token_creation_date = null,
                                    seller_token_expiration_date = null
                                WHERE seller_authentication_token = $1;`
        await database.query(clearTokenStmt, [sellerTag])
        res.status(400).json({"error_message " : "Session token expired. Please log in again."})
        return
    }

    const sellerRegistrationUUID = sellerExits.rows[0]['seller_unique_register_id']
    const getSellerProductsStmt = `SELECT product_name,
                                       product_price,
                                       product_quantity,
                                       product_description,
                                       product_image_data,
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
            "image" : e.product_image_data.toString('base64'),
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



router.post('/changes', async function(req, res, next) {
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

    if(isValidSession.rows[0]['seller_token_expiration_date'] < currentDate){
        const deleteExpiredToken = `UPDATE ${database.Tables.sellers} SET
                                        seller_authentication_token = null,
                                        seller_token_in_use = false,
                                        seller_token_creation_date = null,
                                        seller_token_expiration_date = null
                                    WHERE seller_authentication_token = $1;`
        await database.query(deleteExpiredToken, requestBody['session_token'])
        res.status(400).json({"error_message" : "Session expired please login again."})
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
                                 product_image_data,
                                 product_register_date,
                                 product_status)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING true;`
            const addParams = [
                uuid.v4(),
                requestBody.product.name,
                requestBody.product.price,
                requestBody.product.quantity,
                sellerUUID,
                requestBody.product.description,
                requestBody.product.image,
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
                                  product_description = $4,
                                  product_image_data = $5
                              WHERE (product_unique_register_id = $6 
                              AND product_company_owner_uuid = $7) RETURNING true;`
            const editParams = [
                requestBody.product.name,
                requestBody.product.price,
                requestBody.product.quantity,
                requestBody.product.description,
                requestBody.product.image,
                productUUID,
                sellerUUID
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
                                WHERE product_unique_register_id = $1 
                                AND product_company_owner_uuid = $2
                                RETURNING true;`
            const removeResponse = await database.query(removeStmt, [productUUID, sellerUUID])
            if(removeResponse.rows.length > 0){
                res.status(201).end()
            } else {
                res.status(400).end()
            }
            break

        default:
            res.status(400).json({"error_message" : "Invalid action provided"})
            break
    }
})

module.exports = router

