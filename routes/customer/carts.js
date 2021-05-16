const express = require('express');
const router = express.Router();

const database = require('../../database')
const uuid = require('uuid')

async function resetSession(sessionToken) {
    if(uuid.validate(sessionToken)){
        const resetStmt = `UPDATE ${database.Tables.customers} SET
            customer_authentication_token = null,
            customer_token_in_use = false,
            customer_token_creation_date = null,
            customer_token_expiration_date = null 
            WHERE customer_authentication_token = $1;`
        await database.query(resetStmt, [sessionToken])
    }
}

router.post('/changes', async function(req, res, next) {
    const options = req.query

    const action = options.action === "add" || options.action === "remove" ? options.action : undefined
    const sessionToken = options.token
    const itemUUID = options.item
    const quantity = options.quantity

    if(quantity <= 0 || !uuid.validate(itemUUID) || !uuid.validate(sessionToken) || action === undefined){
        res.status(400).end()
        return
    }

    const userRegistrationUUID = await database.query(`SELECT customer_unique_register_id, customer_token_expiration_date FROM ${database.Tables.customers} 
                             WHERE customer_authentication_token = $1 AND customer_token_in_use = TRUE ;`, [sessionToken])
    if(userRegistrationUUID.rows.length <= 0){
        res.status(400).end()
        return
    }

    const currentDate = new Date()
    const isValidSessionToken = userRegistrationUUID.rows[0]['customer_token_expiration_date']
    if(isValidSessionToken < currentDate){
        await resetSession(sessionToken)
        res.status(400).end()
        return
    }
    const customerUUID = userRegistrationUUID.rows[0]['customer_unique_register_id']
    const productQuery = await database.query(`SELECT product_price FROM ${database.Tables.products}
                                                   WHERE product_unique_register_id = $1;`, [itemUUID])

    const userCartQuery = await database.query(`SELECT cart_content, cart_total_cost FROM ${database.Tables.carts} 
                                                WHERE cart_owner_uuid = $1;`, [customerUUID])

    const productInfo = productQuery.rows
    if(productInfo.length <= 0){
        res.status(400).end()
        return
    }
    if(userCartQuery.rows.length <= 0){
        let obj = []
        if(!isNaN(Math.abs(Number(quantity)))){
            obj[itemUUID] = quantity
        } else {
            res.status(400).end()
            return
        }
        const createCart = `INSERT INTO ${database.Tables.carts} (
                                cart_owner_uuid,
                                cart_content,
                                cart_total_cost) 
                            VALUES ($1, ARRAY ['${JSON.stringify(obj)}'], $2) RETURNING true;`
        const newCartCost = obj[itemUUID] === undefined ? 0 : Number(obj[itemUUID]) * Number(quantity)
        const dbReponse = await database.query(createCart, [customerUUID, newCartCost] )
        if(dbReponse.rows.length > 0){
            res.json({"message" : "Request processed successfully."})
        } else {
            res.status(500).end()
        }
        return
    }

    let updatedCart = JSON.parse(userCartQuery.rows[0].cart_content)
    let updatedCartTotalCost = Number(userCartQuery.rows[0]['cart_total_cost'])

    switch (action) {
        case "add" :
            if(!isNaN(Math.abs(Number(quantity)))){
                updatedCart[itemUUID] = Number(updatedCart[itemUUID] === undefined ? 0 : updatedCart[itemUUID]) + Number(quantity)
                updatedCartTotalCost += Number(quantity) * productInfo[0].product_price
            } else {
                res.status(400).end()
                return
            }
            break
        case "remove" :
            if(quantity.toLowerCase() === "all"){
                updatedCart = {}
                updatedCartTotalCost = 0
            } else if(!isNaN(Math.abs(Number(quantity)))){
                let upd = Number(updatedCart[itemUUID] === undefined ? 0 : updatedCart[itemUUID]) - Number(quantity)
                if(upd <= 0){
                    updatedCartTotalCost -= Number(updatedCart[itemUUID]) * productInfo[0].product_price
                    delete updatedCart[itemUUID]
                } else if(!isNaN(Number(updatedCart[itemUUID]))){
                    updatedCart[itemUUID] = Number(updatedCart[itemUUID]) - Number(isNaN(Math.abs(Number(quantity))) ? 0 : Number(quantity))
                    updatedCartTotalCost  -= Number(quantity) * productInfo[0].product_price
                } else {
                    updatedCart = {}
                    updatedCartTotalCost = 0
                }
            } else {
                res.status(400).end()
                return
            }
            break
        default:
            res.status(400).json({"error_message" : "Action not supported."})
            break
    }

    const updateCartStmt = `UPDATE ${database.Tables.carts} SET 
                                cart_content = ARRAY ['${JSON.stringify({...updatedCart})}'], 
                                cart_total_cost = $1 
                            WHERE cart_owner_uuid = $2 RETURNING TRUE;`

    const totalCartCost = quantity === "All" || Object.keys(updatedCart).length === 0 ? 0 : updatedCartTotalCost
    const dbResponse = await database.query(updateCartStmt, [totalCartCost, customerUUID])
    if(dbResponse.rows.length > 0){
        res.json({"message" : "Request processed successfully."})
    } else {
        res.status(500).end()
    }
})


router.get('/view', async function(req, res, next) {
    const sessionToken = req.query.token
    if(!uuid.v4(sessionToken)){
        res.status(400).end()
        return
    }
    const getCustomerUUID = await database.query(`SELECT customer_unique_register_id, 
                                                              customer_token_expiration_date 
                                                              FROM ${database.Tables.customers} 
                                                       WHERE customer_authentication_token = $1 
                                                       AND customer_token_in_use = TRUE ;`, [sessionToken])
    if(getCustomerUUID.rows.length === 0){
        res.status(400).end()
        return
    }

    const currentDate = new Date()
    const isValidSessionToken = getCustomerUUID.rows[0]['customer_token_expiration_date']
    if(isValidSessionToken < currentDate){
        await resetSession(sessionToken)
        res.status(400).end()
        return
    }

    const getUserCartItems = await database.query(`SELECT cart_owner_uuid, cart_content, cart_total_cost FROM ${database.Tables.carts} 
                                                        WHERE cart_owner_uuid = $1;`, [getCustomerUUID.rows[0]['customer_unique_register_id']])
    const cartItems = JSON.parse(getUserCartItems.rows === 0 ? {} : getUserCartItems.rows[0]['cart_content'])
    if(cartItems.length === 0){
        res.json({ "cart" : {}})
    }

    const params = Object.keys(cartItems).map(e => 'product_unique_register_id = '.concat(`'${e}'`)).join(' OR ')
    const validParams = params.length === 0 ? " TRUE " : params

    const getProducts = await database.query(`SELECT product_unique_register_id,
                               seller_company_name,
                               product_price,
                               product_quantity,
                               product_category,
                               product_description,
                               product_image_data
                               FROM ${database.Tables.products}
                               INNER JOIN ${database.Tables.sellers} ON (product_company_owner_uuid = seller_unique_register_id)
                               {WHERE ${validParams} ;`)

    const cart = {
        "totalCartCost" : Number(getUserCartItems.rows[0]['cart_total_cost'].toFixed(3)),
        "cart" : getProducts.rows.map(e => {
            return {
                "id" : e.product_unique_register_id,
                "company_name" : e.seller_company_name,
                "name" : e.product_name,
                "price" : e.product_price,
                "quantity" : cartItems[e.product_unique_register_id],
                "category" : e.product_category,
                "description" : e.product_description,
                "image" : e.product_image_data.toString('base64'),
            }
        })
    }

    res.json(cart)
})

module.exports = router
