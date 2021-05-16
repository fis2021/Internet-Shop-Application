const express = require('express')
const router = express.Router()

const database = require('../../database')
const uuid = require('uuid')

const normalDelivery = 60 * 60 * 72 // Seconds in 3 days
const fastDelivery = 60 * 60 * 24 // Seconds in 1 Day
const initialOrderStatus = 0 // Pending

router.post('/', async function(req, res, next) {
    const token = req.query.token
    const deliveryType = Number(req.query.type)
    if(!uuid.validate(token) || isNaN(deliveryType)){
        console.log('here', deliveryType, typeof deliveryType)
        res.status(400).end()
        return
    }

    const identifyCustomer = await database.query(`SELECT customer_unique_register_id, customer_funds
                                                        FROM ${database.Tables.customers} 
                                                        WHERE customer_authentication_token = $1;`, [token])
    if(identifyCustomer.rows.length === 0){
        res.status(400).json({"error_message" : "Log in error."})
        return
    }
    const customerUUID = identifyCustomer.rows[0]['customer_unique_register_id']

    const customerCart = await database.query(`SELECT cart_content, cart_total_cost FROM ${database.Tables.carts} WHERE cart_owner_uuid = $1`, [customerUUID])
    const parsedCart = JSON.parse(customerCart.rows[0]['cart_content'])
    const finalFunds = Number(identifyCustomer.rows[0]['customer_funds']) - Number(customerCart.rows[0]['cart_total_cost'])

    if(finalFunds < 0){
        res.status(400).json({"error_message" : "Insufficient funds."})
        return
    }
    if(Object.keys(parsedCart).length === 0 || parsedCart === undefined){
        res.status(400).json({"error_message" : "Cart is empty."})
        return
    }

    const updateFunds = await database.query(`UPDATE ${database.Tables.customers} SET customer_funds = $1
                                                   WHERE customer_unique_register_id = $2 RETURNING true;`, [finalFunds, customerUUID])
    if(updateFunds.rows.length === 0){
        res.status(500).end()
        return
    }
    const delivery = deliveryType === 0 ? 0 : 1
    const createOrderStmt = `INSERT INTO ${database.Tables.orders} (
                             order_uuid,
                             order_content,
                             order_customer_id,
                             order_total_cost,
                             order_status,
                             order_delivery_type,
                             order_initiate_date,
                             order_completion_time) VALUES ($1, ARRAY ['${JSON.stringify(parsedCart)}'], $2, $3, $4, $5, NOW(), (current_timestamp + INTERVAL '${delivery === 1 ? fastDelivery : normalDelivery} seconds')) 
                             RETURNING true;`
    const queryParams = [
        uuid.v4(),
        customerUUID,
        Number(customerCart.rows[0]['cart_total_cost']),
        initialOrderStatus,
        delivery
    ]
    const placeOrder = await database.query(createOrderStmt, queryParams)
    if(placeOrder.rows.length === 0){
        res.status(500).end()
        return
    }

    const resetCustomerCart = await database.query(`UPDATE ${database.Tables.carts} SET
                                                         cart_content = ARRAY ['{}'],
                                                         cart_total_cost = $1
                                                         WHERE cart_owner_uuid = $2 RETURNING true;`, [.0, customerUUID])
    if(resetCustomerCart.rows.length === 0){
        res.status(500).end()
        return
    }

    const itemsUUIDs = Object.keys(parsedCart).map(e => "product_unique_register_id=".concat(`'${e}'`)).join(" OR ")
    const getSellersID = await database.query(`SELECT product_company_owner_uuid,
                                                      product_price,
                                                      product_quantity,
                                                      product_unique_register_id
                                                      FROM ${database.Tables.products} WHERE ${itemsUUIDs};`)
    const sellersItems = getSellersID.rows
    const limit = Object.keys(parsedCart).length

    const result = Object.entries(parsedCart).map(e => {
        const priceObj = sellersItems.filter(k => k['product_unique_register_id'] === e[0])
        const price = Number(priceObj[0]['product_price'])
        let arr = []
        arr[e[0]] = Number(e[1]) * Number(price)
        return arr
    })

    for(let i = 0; i < result.length; i++){
        await database.query(`UPDATE ${database.Tables.sellers} SET seller_account_balance = $1 WHERE seller_unique_register_id = $2;`, [Object.values(result[i])[0], Object.keys(result[i])[0]])
    }

    res.status(201).end()
})

module.exports = router
