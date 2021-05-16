const express = require('express')
const router = express.Router()

const database = require('../../database')
const uuid = require('uuid')

router.get('/', async function(req, res, next) {
    const token = req.query.token
    if(!uuid.validate(token)){
        res.status(400).end()
        return
    }

    const isCustomerStmt = `SELECT customer_unique_register_id FROM ${database.Tables.customers} WHERE customer_authentication_token = $1;`
    const isSellerStmt   = `SELECT seller_unique_register_id FROM   ${database.Tables.sellers} WHERE seller_authentication_token = $1;`

    const isCustomer = await database.query(isCustomerStmt, [token])
    const isSeller = await database.query(isSellerStmt, [token])

    const flag = isCustomer.rows.length === 0 ? "seller" : (isSeller.rows.length === 0 ? "customer" : undefined)

    const allOrders = await database.query(`SELECT  order_content, order_completion_time, order_customer_id FROM ${database.Tables.orders};`)
    const ordersToParse = allOrders.rows

    const ordersItems = ordersToParse.map(e => e['order_content'][0]).filter(e => e)
    const parsedOrdersItems = ordersItems.map(e => Object.keys(JSON.parse(e))).flat()
    const uniqueItems = [...new Set(parsedOrdersItems)].map(e => "product_unique_register_id=".concat(`'${e}'`)).join(" OR ")

    if(parsedOrdersItems.length === 0){
        res.json({})
        return
    }

    const selectProducts = await database.query(`SELECT product_unique_register_id,
                                                             product_company_owner_uuid,
                                                             seller_company_name,
                                                             product_price,
                                                             product_quantity,
                                                             product_category
                                                       FROM ${database.Tables.products} INNER JOIN ${database.Tables.sellers} ON (product_company_owner_uuid = seller_unique_register_id)
                                                       WHERE ${uniqueItems};`)
    const allProducts = selectProducts.rows
    switch (flag){
        case "seller":
            const sellerUUID = isSeller.rows[0]['seller_unique_register_id']
            const sellersItems = allProducts.filter(e => e['product_company_owner_uuid'] === sellerUUID)
            let ordersSeller = []

            for(let i = 0; i < ordersToParse.length; i++){
                let order = ordersToParse[i].order_content[0]
                if(order === undefined) continue
                order = JSON.parse(order)

                let keys = Object.keys(order)
                let values = Object.values(order)

                for(let j = 0; j < keys.length; j++){
                    for(let k = 0; k < sellersItems.length; k++){
                        if(sellersItems[k].product_unique_register_id === keys[j]){
                            ordersSeller.push({
                                "product" : {
                                    "id" : keys[j],
                                    "quantity" : values[j]
                                }
                            })
                            break
                        }
                    }
                }
            }
            res.json({"ordersToSend" : ordersSeller})
            break

        case "customer":
            const customerUUID = isCustomer.rows[0]['customer_unique_register_id']
            let customerOrders = []
            for(let i = 0; i < ordersToParse.length; i++){
                if(ordersToParse[i]['order_customer_id'] === customerUUID){
                    customerOrders.push(ordersToParse[i])
                }
            }
            let orders = []
            for(let i = 0; i < customerOrders.length; i++){
                let order = JSON.parse(customerOrders[i]['order_content'])
                let items = Object.keys(order)
                let quantities = Object.values(order)
                let products = []
                for(let j = 0; j < items.length; j++){
                    let product = allProducts.filter(e => e['product_unique_register_id'] === items[j])
                    for(let k = 0; k < product.length; k++){
                        products.push({
                            "id" : product[k].product_unique_register_id,
                            "company_name" : product[k].seller_company_name,
                            "price" : product[k].product_price,
                            "quantity" : quantities[j],
                            "category" : product[k].product_category
                        })
                    }
                    orders.push({
                        "order_completion_time" : customerOrders[i]['order_completion_time'],
                        "products" : products
                    })
                }
            }
            res.json({orders : orders})
            break

        default:
            res.status(400).end()
            break
    }
})

module.exports = router
