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
            WHERE customer_authentication_token = $1`
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

    const productInfo = productQuery.rows[0]
    if(userCartQuery.rows.length <= 0){
        let obj = []
        if(!isNaN(Math.abs(Number(quantity)))){
            obj[itemUUID] = quantity
        }
        const createCart = `INSERT INTO ${database.Tables.carts} (
                                cart_owner_uuid,
                                cart_content,
                                cart_total_cost) 
                            VALUES ($1, ARRAY ['${JSON.stringify(obj)}'], $2) RETURNING true;`
        const dbReponse = await database.query(createCart, [customerUUID, obj[itemUUID] === undefined ? 0 : obj[itemUUID]])
        if(dbReponse.rows.length > 0){
            res.json({"message" : "Item added."})
        } else {
            res.status(500).end()
        }
        return
    }
    if(productInfo.length <= 0){
        res.status(400).end()
        return
    }

    let updatedCart = JSON.parse(userCartQuery.rows[0].cart_content)

    switch (action) {
        case "add" :
            if(!isNaN(Math.abs(Number(quantity)))){
                updatedCart[itemUUID] = Number(updatedCart[itemUUID] === undefined ? 0 : updatedCart[itemUUID]) + Number(quantity)
            } else {
                res.status(400).end()
                return
            }
            break
        case "remove" :
            if(quantity.toLowerCase() === "all"){
                updatedCart = {}
            } else if(!isNaN(Math.abs(Number(quantity)))){
                let upd = Number(updatedCart[itemUUID] === undefined ? 0 : updatedCart[itemUUID]) - Number(quantity)
                if(upd <= 0){
                    delete updatedCart[itemUUID]
                } else if(!isNaN(Number(updatedCart[itemUUID]))){
                    updatedCart[itemUUID] = Number(updatedCart[itemUUID]) - Number(isNaN(Math.abs(Number(quantity))) ? 0 : Number(quantity))
                } else {
                    updatedCart = {}
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
                                cart_content = ARRAY ['${JSON.stringify(updatedCart)}'], 
                                cart_total_cost = $1 
                            WHERE cart_owner_uuid = $2 RETURNING TRUE;`

    const totalCartCost = quantity === "All" || Object.keys(updatedCart).length === 0 ? 0 : Object.values(updatedCart).reduce((a, b) => a + b)
    const dbResponse = await database.query(updateCartStmt, [totalCartCost, customerUUID])
    if(dbResponse.rows.length > 0){
        console.log(updatedCart)
        res.json({
            "totalCost" : totalCartCost,
            "cart" : updatedCart
        })
    } else {
        res.status(500).end()
    }
})


router.get('/view', async function(req, res, next) {
    res.json("You reached the root page of API")
})


module.exports = router
