const express = require('express')
const router = express.Router()

const database = require('./../../database')
const uuid = require('uuid')

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

module.exports = router
